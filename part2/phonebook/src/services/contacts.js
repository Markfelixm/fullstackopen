import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () =>
	axios
		.get(baseURL)
		.then((response) => response.data)
		.catch(() => console.log("could not get all"));

const create = (newContact) =>
	axios
		.post(baseURL, newContact)
		.then((response) => response.data)
		.catch(() => console.log("could not create contact"));

const remove = (id) =>
	axios
		.delete(`${baseURL}/${id}`)
		.then((response) => response.data)
		.catch(() => console.log("could not delete contact"));

const update = (updatedContact) =>
	axios
		.put(`${baseURL}/${updatedContact.id}`, updatedContact)
		.then((response) => response.data)
		.catch(() => console.log("could not update contact"));

export default {
	getAll,
	create,
	remove,
	update,
};
