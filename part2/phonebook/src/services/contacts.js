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
		.delete(baseURL.concat(`/${id}`))
		.then((response) => response.data)
		.catch(() => console.log("could not delete contact"));

export default {
	getAll,
	create,
	remove,
};
