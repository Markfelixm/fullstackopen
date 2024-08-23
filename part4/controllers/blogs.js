const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", (request, response) => {
	Blog.find({}).then((blogs) => {
		response.json(blogs);
	});
});

router.post("/", (request, response, next) => {
	const blog = new Blog(request.body);

	blog
		.save()
		.then((result) => {
			response.status(201).json(result);
		})
		.catch((error) => {
			next(error);
		});
});

module.exports = router;
