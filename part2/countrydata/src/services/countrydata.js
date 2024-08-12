import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAll = () =>
	axios
		.get(`${baseURL}all`)
		.then((response) => response.data)
		.catch(() => console.log("failed to get all"));

export default {
	getAll,
};
