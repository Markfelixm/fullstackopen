import { useState } from "react";

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
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterTerm, setFilterTerm] = useState("");

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
		setPersons([...persons].concat({ name: newName, number: newNumber }));
		setNewName("");
		setNewNumber("");
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
