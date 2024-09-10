const Notification = ({ notification }) => {
	if (notification.message === null) {
		return null;
	}

	const style = {
		color: notification.color,
		background: "lightgrey",
		fontSize: "20px",
		borderStyle: "solid",
		borderRadius: "5px",
		padding: "10px",
		marginBottom: "10px",
	};

	return (
		<div className="error" style={style}>
			{notification.message}
		</div>
	);
};

export default Notification;
