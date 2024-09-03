import { useState, useEffect } from "react";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON);
			setUser(user);
		}
	}, []);

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
			setUser(user);
			setUsername("");
			setPassword("");
			console.log("login success", user);
		} catch (exception) {
			console.log("error:", exception);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem("loggedInUser");
		setUser(null);
	};

	return user === null ? (
		<div>
			<h2>Log in to application</h2>
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
			<Logout username={user.username} handleLogout={handleLogout} />
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
