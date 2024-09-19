import { useState, useEffect, useRef } from "react";

import Togglable from "./components/Togglable";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState({
		message: null,
		color: "green",
		timeoutID: null,
	});

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const notify = (message, color) => {
		if (notification.timeoutID) {
			clearTimeout(notification.timeoutID);
		}

		const timeoutID = setTimeout(() => {
			setNotification({ message: null });
		}, 5000);
		setNotification({ message, color, timeoutID });
	};

	const onUsernameChange = ({ target }) => setUsername(target.value);
	const onPasswordChange = ({ target }) => setPassword(target.value);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedInUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
			console.log("login success", user);
			notify("login successful", "green");
		} catch (exception) {
			console.log("login error:", exception);
			notify("login error: invalid credentials", "red");
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedInUser");
		setUser(null);
		notify("logged out", "green");
	};

	const toggableRef = useRef();

	const createBlogHandler = async (newBlog) => {
		try {
			const createdBlog = await blogService.create(newBlog);
			console.log("created blog", createdBlog);
			notify(
				`created blog "${createdBlog.title}" by "${createdBlog.author}"`,
				"green"
			);
			setBlogs([...blogs].concat(createdBlog));
			toggableRef.current.toggleVisibility();
		} catch (error) {
			console.log("creation error:", error);
			notify(`failed to create blog: "${error.response.data.error}"`, "red");
			throw error;
		}
	};

	const incrementLike = async (blog) => {
		try {
			const updatedBlog = await blogService.update({
				...blog,
				likes: blog.likes + 1,
			});
			console.log("liked blog", updatedBlog);
			notify("liked blog", "green");

			const updatedBlogs = blogs.map((blog) =>
				blog.id === updatedBlog.id ? updatedBlog : blog
			);
			setBlogs(updatedBlogs);
		} catch (e) {
			console.log("like error", e.response.data.error);
			notify("like error: could not update blog", "red");
		}
	};

	const removeBlog = async (id) => {
		if (
			!window.confirm(
				`Remove blog "${blogs.find((blog) => blog.id === id).title}"?`
			)
		)
			return;
		try {
			await blogService.remove(id);
			const updatedBlogs = blogs.filter((blog) => blog.id !== id);
			setBlogs(updatedBlogs);
			console.log(`removed blog at id: ${id}`);
			notify("removed blog", "green");
		} catch (e) {
			console.log("remove error", e.response.data.error);
			notify(`remove error: ${e.response.data.error}`, "red");
		}
	};

	return user === null ? (
		<div>
			<h2>Log in to application</h2>
			<Notification notification={notification} />
			<Login
				handleLogin={handleLogin}
				username={username}
				onUsernameChange={onUsernameChange}
				password={password}
				onPasswordChange={onPasswordChange}
			/>
		</div>
	) : (
		<div>
			<h2>blogs</h2>
			<Notification notification={notification} />
			<Logout name={user.name} handleLogout={handleLogout} />
			<hr />
			<Togglable buttonLabel={"create a blog"} ref={toggableRef}>
				<h3>create a new blog</h3>
				<BlogForm createBlogHandler={createBlogHandler} />
			</Togglable>
			<hr />
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						handleLike={incrementLike}
						handleRemove={removeBlog}
						user={user}
					/>
				))}
		</div>
	);
};

export default App;
