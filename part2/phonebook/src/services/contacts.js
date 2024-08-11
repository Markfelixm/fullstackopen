import axios from "axios";

const getAll = () =>
	axios.get("http://localhost:3001/persons").then((response) => response.data);

const create = (newContact) =>
	axios
		.post("http://localhost:3001/persons", newContact)
		.then((response) => response.data);

export default {
	getAll,
	create,
};
