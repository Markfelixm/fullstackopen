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
		setNotification({ message, color });
		setTimeout(() => {
			setNotification({ message: null });
		}, 5000);
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

	const handleCreateBlog = (createdBlog) => {
		setBlogs([...blogs].concat(createdBlog));
		toggableRef.current.toggleVisibility();
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
			console.log("like error", updatedBlog);
			notify("like error: could not update blog", "red");
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
				<BlogForm handleCreateBlog={handleCreateBlog} notify={notify} />
			</Togglable>
			<hr />
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog key={blog.id} blog={blog} handleLike={incrementLike} />
				))}
		</div>
	);
};

export default App;
