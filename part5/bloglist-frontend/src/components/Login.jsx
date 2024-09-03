const Login = ({
	handleLogin,
	username,
	onUsernameChange,
	password,
	onPasswordChange,
}) => (
	<form onSubmit={handleLogin}>
		<div>
			username
			<input
				type="text"
				value={username}
				name="Username"
				onChange={onUsernameChange}
			/>
		</div>
		<div>
			password
			<input
				type="password"
				value={password}
				name="Password"
				onChange={onPasswordChange}
			/>
		</div>
		<button type="submit">login</button>
	</form>
);

export default Login;
