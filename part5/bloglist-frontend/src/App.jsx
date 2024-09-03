import { useState, useEffect } from "react";

import Login from "./components/Login";
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

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			setUser(user);
			setUsername("");
			setPassword("");
			console.log("login success", user);
		} catch (exception) {
			console.log("error:", exception);
		}
	};

	const onUsernameChange = ({ target }) => setUsername(target.value);
	const onPasswordChange = ({ target }) => setPassword(target.value);

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
			<p>{user.username} logged in</p>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
