const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	assert.strictEqual(result, 1);
});

const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0,
	},
];

const listWithOneBlog = [
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
		likes: 5,
		__v: 0,
	},
];

const blogsWithZeroLikes = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 0,
		__v: 0,
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0,
	},
];

const blogsWithNegativeLikes = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: -30,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: -20,
		__v: 0,
	},
];

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		assert.strictEqual(result, 5);
	});

	test("when list is undefined", () => {
		assert.strictEqual(listHelper.totalLikes(undefined), 0);
	});

	test("when list is empty", () => {
		assert.strictEqual(listHelper.totalLikes([]), 0);
	});

	test("when list contains several blogs, each containing various amount of likes", () => {
		assert.strictEqual(listHelper.totalLikes(blogs), 36);
	});

	test("when list contains several blogs, each containing zero likes", () => {
		assert.strictEqual(listHelper.totalLikes(blogsWithZeroLikes), 0);
	});

	test("when list contains two blogs, each containing negative likes", () => {
		assert.strictEqual(listHelper.totalLikes(blogsWithNegativeLikes), -50);
	});
});

describe("favorite blog", () => {
	test("when list is undefined", () => {
		assert.deepStrictEqual(listHelper.favoriteBlog(undefined), null);
	});

	test("when list is empty", () => {
		assert.deepStrictEqual(listHelper.favoriteBlog([]), null);
	});

	test("when list has only one blog, equals that blog", () => {
		const result = listHelper.favoriteBlog(listWithOneBlog);
		assert.deepStrictEqual(result, listWithOneBlog[0]);
	});

	test("when list contains several blogs, each containing various amount of likes", () => {
		assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2]);
	});

	test("when list contains several blogs, each containing zero likes, returns first blog in list", () => {
		assert.deepStrictEqual(
			listHelper.favoriteBlog(blogsWithZeroLikes),
			blogsWithZeroLikes[0]
		);
	});

	test("when list contains two blogs, each containing negative likes, returns the least negative", () => {
		assert.deepStrictEqual(
			listHelper.favoriteBlog(blogsWithNegativeLikes),
			blogsWithNegativeLikes[1]
		);
	});
});

describe("most blogs", () => {
	test("when list is undefined", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(undefined), null);
	});

	test("when list is empty", () => {
		assert.deepStrictEqual(listHelper.mostBlogs([]), null);
	});

	test("when list has only one blog, returns that author", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
			author: "Edsger W. Dijkstra",
			blogs: 1,
		});
	});

	test("when list contains several blogs, with repeating authors", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
			author: "Robert C. Martin",
			blogs: 3,
		});
	});

	test("when list contains two blogs, returns first author", () => {
		assert.deepStrictEqual(listHelper.mostBlogs(blogsWithNegativeLikes), {
			author: "Michael Chan",
			blogs: 1,
		});
	});
});
