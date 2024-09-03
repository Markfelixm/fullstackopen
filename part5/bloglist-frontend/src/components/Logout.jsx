const Logout = ({ username, handleLogout }) => {
	return (
		<p>
			{username} is logged in
			<button onClick={handleLogout}>logout</button>
		</p>
	);
};

export default Logout;
