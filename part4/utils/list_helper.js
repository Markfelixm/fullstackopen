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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
};
