import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => axios.get(baseURL).then((response) => response.data);

const create = (newContact) =>
	axios.post(baseURL, newContact).then((response) => response.data);

const remove = (id) =>
	axios.delete(baseURL.concat(`/${id}`)).then((response) => response.data);

export default {
	getAll,
	create,
	remove,
};
