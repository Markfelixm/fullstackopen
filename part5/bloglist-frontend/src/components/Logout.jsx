const Logout = ({ name, handleLogout }) => {
	return (
		<p>
			{name} is logged in
			<button onClick={handleLogout}>logout</button>
		</p>
	);
};

export default Logout;
