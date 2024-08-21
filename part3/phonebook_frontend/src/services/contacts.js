import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const getAll = () => axios.get(baseURL).then((response) => response.data);

const create = (newContact) =>
	axios.post(baseURL, newContact).then((response) => response.data);

const remove = (id) =>
	axios.delete(`${baseURL}/${id}`).then((response) => response.data);

const update = (updatedContact) =>
	axios
		.put(`${baseURL}/${updatedContact.id}`, updatedContact)
		.then((response) => response.data);

export default {
	getAll,
	create,
	remove,
	update,
};
