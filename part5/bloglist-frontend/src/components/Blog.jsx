import { useState } from "react";

const Blog = ({ blog }) => {
	const [showDetails, setShowDetails] = useState(false);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	const ToggleButton = () => {
		if (showDetails) {
			return <button onClick={() => setShowDetails(false)}>hide</button>;
		} else {
			return <button onClick={() => setShowDetails(true)}>view</button>;
		}
	};

	const base = () => (
		<span>
			{blog.title}
			{blog.author ? `, ${blog.author}` : ""} <ToggleButton />
		</span>
	);

	const details = () => (
		<div>
			<span>{blog.url}</span>
			<br />
			<span>
				likes: {blog.likes} <button>like</button>
			</span>
			<br />
			<span>{blog.user.name}</span>
		</div>
	);

	return (
		<div style={blogStyle}>
			{base()}
			{showDetails ? details() : ""}
		</div>
	);
};

export default Blog;
