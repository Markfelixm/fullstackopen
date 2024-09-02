const router = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});

router.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate("user", {
		username: 1,
		name: 1,
	});
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

router.post(
	"/",
	middleware.tokenExtractor,
	middleware.userExtractor,
	async (request, response) => {
		const blog = new Blog(request.body);
		const user = request.user;
		blog.user = user.id;

		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		response.status(201).json(savedBlog);
	}
);

router.put("/:id", async (request, response) => {
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
		{ new: true, runValidators: true, context: "query" }
	);
	if (updatedBlog) {
		response.json(updatedBlog);
	} else {
		response.status(404).end();
	}
});

router.delete(
	"/:id",
	middleware.tokenExtractor,
	middleware.userExtractor,
	async (request, response) => {
		const user = request.user;
		const blogToDelete = await Blog.findById(request.params.id);
		if (
			blogToDelete &&
			user &&
			blogToDelete.user.toString() === user.id.toString()
		) {
			await Blog.findByIdAndDelete(request.params.id);
		} else {
			return response.status(401).json({ error: "unauthorized user" });
		}

		response.status(204).end();
	}
);

module.exports = router;
