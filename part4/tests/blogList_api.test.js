const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const _ = require("lodash");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper.js");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe("check that at endpoint /api/blogs", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
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

	test("that ids are correcly named", async () => {
		const response = await api.get("/api/blogs");

		response.body.forEach((blog) => {
			assert.ok(blog.id);
			assert.strictEqual(typeof blog.id, "string");
			assert.strictEqual(blog._id, undefined);
		});
	});

	test("posting a blog saves it", async () => {
		const newBlog = {
			title: "Test Title",
			author: "Test Author",
			url: "test.url",
			likes: 42,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const allBlogs = await helper.getAllBlogs();

		assert.strictEqual(
			helper.initialBlogs.length + 1,
			allBlogs.length,
			"expected blog length to increase by one"
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

		const response = await api.post("/api/blogs").send(noTitle).expect(400);

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

		const response = await api.post("/api/blogs").send(noURL).expect(400);

		assert.strictEqual(
			response.statusCode,
			400,
			"expected statusCode to be 400"
		);
		assert.strictEqual(response.status, 400, "expected status to be 400");
	});

	test("deleting a blog correctly removes it", async () => {
		const allBlogsBefore = await helper.getAllBlogs();

		const idToDelete = allBlogsBefore[0].id;
		await api.delete(`/api/blogs/${idToDelete}`).expect(204);

		const allBlogsAfter = await helper.getAllBlogs();
		assert.strictEqual(
			allBlogsAfter.length,
			allBlogsBefore.length - 1,
			"expected to have one less blog after delete"
		);

		const found = _.find(
			allBlogsAfter.map((blog) => blog.id),
			idToDelete
		);
		assert(!found, "expected not to find deleted id");
	});
});

after(async () => {
	await mongoose.connection.close();
});
