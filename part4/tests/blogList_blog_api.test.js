const { test, after, before, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const _ = require("lodash");
const app = require("../app.js");
const Blog = require("../models/blog.js");
const User = require("../models/user.js");
const helper = require("./blog_api_test_helper.js");

const api = supertest(app);

let validToken;

before(async () => {
	await User.deleteMany({});

	const authenticatedUser = {
		username: "tester",
		password: "test",
		name: "authenticated user",
	};

	await api.post("/api/users").send(authenticatedUser).expect(201);
	const response = await api
		.post("/api/login")
		.send(authenticatedUser)
		.expect(200)
		.expect("Content-Type", /application\/json/);

	validToken = response.body.token;
});

beforeEach(async () => {
	await Blog.deleteMany({});
	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe("test that at endpoint /api/blogs", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("id property is correcly named", async () => {
		const response = await api.get("/api/blogs");

		response.body.forEach((blog) => {
			assert.ok(blog.id);
			assert.strictEqual(typeof blog.id, "string");
			assert.strictEqual(blog._id, undefined);
		});
	});

	test("can get all blogs", async () => {
		const response = await api.get("/api/blogs");

		assert.strictEqual(response.body.length, helper.initialBlogs.length);
	});

	test("can get a specific id", async () => {
		const allBlogs = await helper.getAllBlogs();

		const idToGet = allBlogs[2].id;
		const response = await api
			.get(`/api/blogs/${idToGet}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		assert.deepStrictEqual(response.body, allBlogs[2], "expected same blog");
	});

	describe("posting with", () => {
		test("a blog saves it", async () => {
			const newBlog = {
				title: "Test Title",
				author: "Test Author",
				url: "test.url",
				likes: 42,
			};

			await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${validToken}`)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			const allBlogs = await helper.getAllBlogs();

			assert.strictEqual(
				helper.initialBlogs.length + 1,
				allBlogs.length,
				"expected blogs length to increase by one"
			);

			const found = _.find(
				allBlogs.map(({ id, ...rest }) => {
					return rest;
				}),
				newBlog
			);

			assert(found, "expected to find posted blog");
		});

		test("missing like property defaults to 0", async () => {
			const newBlog = {
				title: "Likeless",
				author: "Missing like",
				url: "no.like",
			};

			const response = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${validToken}`)
				.send(newBlog)
				.expect(201)
				.expect("Content-Type", /application\/json/);

			assert.strictEqual(
				response._body.likes,
				0,
				"expected likes to default to 0"
			);
		});

		test("title property is required", async () => {
			const noTitle = {
				author: "Missing Title",
				url: "no.title",
				likes: 10,
			};

			const response = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${validToken}`)
				.send(noTitle)
				.expect(400);

			assert.strictEqual(
				response.statusCode,
				400,
				"expected statusCode to be 400"
			);
			assert.strictEqual(response.status, 400, "expected status to be 400");
		});

		test("url property is required", async () => {
			const noURL = {
				title: "Missing Url",
				author: "No URL",
				likes: 10,
			};

			const response = await api
				.post("/api/blogs")
				.set("Authorization", `Bearer ${validToken}`)
				.send(noURL)
				.expect(400);

			assert.strictEqual(
				response.statusCode,
				400,
				"expected statusCode to be 400"
			);
			assert.strictEqual(response.status, 400, "expected status to be 400");
		});
	});

	// 	test("updating at a specific id saves it", async () => {
	// 		const allBlogsBefore = await helper.getAllBlogs();

	// 		const blogToUpdate = allBlogsBefore[1];

	// 		const updatedBlogData = {
	// 			title: "Updated Title",
	// 			author: "Updated Author",
	// 			url: "updated.url",
	// 			likes: 23,
	// 		};

	// 		const response = await api
	// 			.put(`/api/blogs/${blogToUpdate.id}`)
	// 			.send(updatedBlogData)
	// 			.expect(200)
	// 			.expect("Content-Type", /application\/json/);
	// 		assert.deepStrictEqual(
	// 			response.body,
	// 			{ ...updatedBlogData, id: blogToUpdate.id },
	// 			"expected response to equal sent"
	// 		);

	// 		const blogAtId = await api
	// 			.get(`/api/blogs/${blogToUpdate.id}`)
	// 			.expect(200)
	// 			.expect("Content-Type", /application\/json/);
	// 		assert.deepStrictEqual(
	// 			blogAtId.body,
	// 			{ ...updatedBlogData, id: blogToUpdate.id },
	// 			"expected blog at id to be updated"
	// 		);
	// 	});

	// test("deleting a blog correctly removes it", async () => {
	// 	const allBlogsBefore = await helper.getAllBlogs();

	// 	const idToDelete = allBlogsBefore[0].id;
	// 	await api
	// 		.delete(`/api/blogs/${idToDelete}`)
	// 		.set("Authorization", `Bearer ${validToken}`)
	// 		.expect(204);

	// 	const allBlogsAfter = await helper.getAllBlogs();
	// 	assert.strictEqual(
	// 		allBlogsAfter.length,
	// 		allBlogsBefore.length - 1,
	// 		"expected to have one less blog after delete"
	// 	);

	// 	const found = _.find(
	// 		allBlogsAfter.map((blog) => blog.id),
	// 		idToDelete
	// 	);
	// 	assert(!found, "expected not to find deleted id");
	// });
});

after(async () => {
	await mongoose.connection.close();
});
