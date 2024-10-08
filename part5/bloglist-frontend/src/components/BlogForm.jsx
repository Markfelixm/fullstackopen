import { useState } from "react";

const BlogForm = ({ createBlogHandler }) => {
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
			await createBlogHandler(newBlog);

			setTitle("");
			setAuthor("");
			setUrl("");
		} catch {}
	};

	return (
		<form onSubmit={createHandler} className="blogForm">
			<div>
				title
				<input
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
					id="title-input"
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={author}
					name="author"
					onChange={({ target }) => setAuthor(target.value)}
					id="author-input"
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={url}
					name="url"
					onChange={({ target }) => setUrl(target.value)}
					id="url-input"
				/>
			</div>
			<button type="submit">create</button>
		</form>
	);
};

export default BlogForm;
