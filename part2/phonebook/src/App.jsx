import { useState } from "react";

const PersonLine = ({ person }) => <p>{person.name}</p>;

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const onNameChange = (event) => {
		setNewName(event.target.value);
	};

	const isNameTaken = () => {
		return persons.map((person) => person.name).includes(newName);
	};

	const addName = (event) => {
		event.preventDefault();
		if (isNameTaken()) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons([...persons].concat({ name: newName }));
		setNewName("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={onNameChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<PersonLine key={person.name} person={person} />
			))}
		</div>
	);
};

export default App;
