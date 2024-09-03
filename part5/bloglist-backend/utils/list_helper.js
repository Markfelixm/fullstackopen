const _ = require("lodash");

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes;
	};

	return blogs === undefined
		? 0
		: blogs.length === 0
		? 0
		: blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	const reducer = (most, blog) => {
		return blog.likes > most.likes ? blog : most;
	};

	return blogs === undefined
		? null
		: blogs.length === 0
		? null
		: blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
	if (blogs === undefined || blogs.length === 0) return null;

	const blogsCountByAuthor = _.countBy(blogs, "author");

	const authorsWithBlogCounts = _.map(blogsCountByAuthor, (count, name) => ({
		author: name,
		blogs: count,
	}));

	return _.maxBy(authorsWithBlogCounts, "blogs");
};

const mostLikes = (blogs) => {
	if (blogs === undefined || blogs.length === 0) return null;

	const blogsByAuthor = _.groupBy(blogs, "author");

	const totalLikesByAuthor = _.map(blogsByAuthor, (authorBlogs, author) => {
		return {
			author,
			likes: _.sumBy(authorBlogs, "likes"),
		};
	});

	return _.maxBy(totalLikesByAuthor, "likes");
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
