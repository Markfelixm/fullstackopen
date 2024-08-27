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
});

after(async () => {
	await mongoose.connection.close();
});
