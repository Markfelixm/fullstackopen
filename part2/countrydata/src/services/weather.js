import axios from "axios";

// "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&forecast_days=1"
const baseURL = "https://api.open-meteo.com/v1/forecast";
const query = "current=temperature_2m,wind_speed_10m&forecast_days=1";

const getAt = (latitude, longitude) =>
	axios
		.get(`${baseURL}?latitude=${latitude}&longitude=${longitude}&${query}`)
		.then((response) => response.data)
		.catch(() => console.log("could not get weather"));

export default {
	getAt,
};