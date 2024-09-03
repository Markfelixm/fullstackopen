const Blog = ({ blog }) => (
	<div>
		{blog.title}
		{blog.author ? `, ${blog.author}` : ""}
	</div>
);

export default Blog;
