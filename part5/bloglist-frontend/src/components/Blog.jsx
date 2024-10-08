import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleRemove, user }) => {
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

	const RemoveButton = () => {
		if (user.username === blog.user.username) {
			return (
				<div>
					<button onClick={() => handleRemove(blog.id)}>remove</button>
				</div>
			);
		} else {
			return "";
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
				likes: {blog.likes}{" "}
				<button onClick={() => handleLike(blog)}>like</button>
			</span>
			<br />
			<span>{blog.user.name}</span>
			<RemoveButton />
		</div>
	);

	return (
		<div style={blogStyle} className="blog">
			{base()}
			{showDetails ? details() : ""}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	handleLike: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

export default Blog;
