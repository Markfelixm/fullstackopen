import { useState, useEffect } from "react";
import axios from "axios";

const PersonLine = ({ person }) => (
	<p>
		{person.name} {person.number}
	</p>
);

const Filter = ({ filterTerm, onFilterChange }) => {
	return (
		<div>
			filter shown with <input type={filterTerm} onChange={onFilterChange} />
		</div>
	);
};

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

const Persons = ({ persons }) => {
	return persons.map((person) => (
		<PersonLine key={person.name} person={person} />
	));
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterTerm, setFilterTerm] = useState("");

	const hook = () => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	};

	useEffect(hook, []);

	const visiblePersons = persons.filter((person) =>
		person.name.toLowerCase().includes(filterTerm.toLocaleLowerCase())
	);

	const onNameChange = (event) => {
		setNewName(event.target.value);
	};

	const onNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const onFilterChange = (event) => {
		setFilterTerm(event.target.value);
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
		const newContact = { name: newName, number: newNumber };
		axios.post("http://localhost:3001/persons", newContact).then((response) => {
			setPersons([...persons].concat(response.data));
			setNewName("");
			setNewNumber("");
		});
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter filterTerm={filterTerm} onFilterChange={onFilterChange} />
			<h2>Add a New Contact</h2>
			<Form
				addContact={addContact}
				newName={newName}
				newNumber={newNumber}
				onNameChange={onNameChange}
				onNumberChange={onNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={visiblePersons} />
		</div>
	);
};

export default App;
