const Form = ({
	addContact,
	newName,
	newNumber,
	onNameChange,
	onNumberChange,
}) => {
	return (
		<form onSubmit={addContact}>
			<div>
				name: <input value={newName} onChange={onNameChange} />
				<br />
				number: <input value={newNumber} onChange={onNumberChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default Form;
