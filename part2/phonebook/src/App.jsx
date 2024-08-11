import { useState, useEffect } from "react";
import contactServices from "./services/contacts";

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

const DeleteButton = ({ id, onDelete }) => (
	<button onClick={() => onDelete(id)}>delete</button>
);

const PersonLine = ({ person, onDelete }) => (
	<p>
		{person.name} {person.number}{" "}
		<DeleteButton key={person.id} onDelete={onDelete} id={person.id} />
	</p>
);

const Persons = ({ persons, onDelete }) => {
	return persons.map((person) => (
		<PersonLine key={person.id} person={person} onDelete={onDelete} />
	));
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterTerm, setFilterTerm] = useState("");

	const hook = () => {
		contactServices
			.getAll()
			.then((initialPersons) => setPersons(initialPersons));
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

	const updateContact = (newContact) => {
		contactServices.update(newContact).then((updatedContact) => {
			const newPersons = persons.map((person) =>
				person.id !== updatedContact.id ? person : updatedContact
			);
			setPersons(newPersons);
			setNewName("");
			setNewNumber("");
		});
	};

	const addContact = (event) => {
		event.preventDefault();

		const newContact = { name: newName, number: newNumber };

		const existingContact = persons.find((person) => person.name === newName);
		if (existingContact) {
			if (
				confirm(
					`${newName} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				newContact.id = existingContact.id;
				updateContact(newContact);
			}
		} else {
			contactServices.create(newContact).then((createdPerson) => {
				setPersons([...persons].concat(createdPerson));
				setNewName("");
				setNewNumber("");
			});
		}
	};

	const onDelete = (id) => {
		if (
			confirm(`delete ${persons.find((person) => person.id === id).name} ?`)
		) {
			contactServices.remove(id).then((deletedPerson) => {
				const newPersons = persons.filter(
					(person) => person.id !== deletedPerson.id
				);
				setPersons(newPersons);
			});
		}
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
			<Persons persons={visiblePersons} onDelete={onDelete} />
		</div>
	);
};

export default App;
