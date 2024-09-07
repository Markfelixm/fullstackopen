import { useState } from "react";

import blogService from "../services/blogs";

const BlogForm = ({ handleCreateBlog, notify }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const createHandler = async (event) => {
		event.preventDefault();

		const newBlog = {
			title: title,
			author: author,
			url: url,
		};
		try {
			const createdBlog = await blogService.create(newBlog);
			console.log("created blog", createdBlog);
			notify(
				`created blog "${createdBlog.title}" by "${createdBlog.author}"`,
				"green"
			);
			setTitle("");
			setAuthor("");
			setUrl("");
			handleCreateBlog(createdBlog);
		} catch (error) {
			console.log("creation error:", error);
			notify(`failed to create blog: "${error.response.data.error}"`, "red");
		}
	};

	return (
		<form onSubmit={createHandler}>
			<div>
				title
				<input
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={author}
					name="author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={url}
					name="url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	);
};

export default BlogForm;
