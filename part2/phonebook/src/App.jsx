import { useState } from "react";

const PersonLine = ({ person }) => (
	<p>
		{person.name} {person.number}
	</p>
);

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-1234567" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const onNameChange = (event) => {
		setNewName(event.target.value);
	};

	const onNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const isNameTaken = () => {
		return persons.map((person) => person.name).includes(newName);
	};

	const addContact = (event) => {
		event.preventDefault();
		if (isNameTaken()) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		setPersons([...persons].concat({ name: newName, number: newNumber }));
		setNewName("");
		setNewNumber("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
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
			<h2>Numbers</h2>
			{persons.map((person) => (
				<PersonLine key={person.name} person={person} />
			))}
		</div>
	);
};

export default App;
