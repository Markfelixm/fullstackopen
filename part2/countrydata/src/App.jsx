import { useEffect, useState } from "react";
import countryDataServices from "./services/countrydata";
import weatherServices from "./services/weather";
import Filter from "./components/Filter";
import CountryDetails from "./components/CountryDetails";
import Countries from "./components/Countries";

const App = () => {
	const [filterTerm, setFilterTerm] = useState("");
	const [allCountries, setAllCountries] = useState([]);
	const [visibleCountries, setVisibleCountries] = useState([]);
	const [weather, setWeather] = useState({});

	const initHook = () => {
		countryDataServices
			.getAll()
			.then((countries) => {
				setAllCountries(countries);
				setVisibleCountries(countries);
			})
			.catch(() => console.log("could not get all countries"));
	};
	useEffect(initHook, []);

	const filterHook = () => {
		const newVisibleCountries = allCountries.filter((country) =>
			country.name.common.toLowerCase().includes(filterTerm.toLowerCase())
		);
		setVisibleCountries(newVisibleCountries);
	};
	useEffect(filterHook, [filterTerm]);

	const visibleHook = () => {
		if (visibleCountries.length === 1) {
			getWeatherAt(
				visibleCountries[0].capitalInfo.latlng[0],
				visibleCountries[0].capitalInfo.latlng[1]
			);
		}
	};
	useEffect(visibleHook, [visibleCountries]);

	const onFilterChange = (event) => {
		setFilterTerm(event.target.value);
	};

	const onShow = (country) => {
		setVisibleCountries([country]);
	};

	const getWeatherAt = (latitude, longitude) => {
		weatherServices
			.getAt(latitude, longitude)
			.then((data) => {
				const newWeather = {
					temperature: data.current.temperature_2m,
					temperatureUnit: data.current_units.temperature_2m,
					relativeHumidity: data.current.relative_humidity_2m,
					relativeHumidityUnit: data.current_units.relative_humidity_2m,
					windSpeed: data.current.wind_speed_10m,
					windSpeedUnit: data.current_units.wind_speed_10m,
					precipitation: data.current.precipitation,
					precipitationUnit: data.current_units.precipitation,
					cloudCover: data.current.cloud_cover,
					cloudCoverUnit: data.current_units.cloud_cover,
				};
				setWeather(newWeather);
			})
			.catch(() => console.log("could not set weather"));
	};

	return (
		<div>
			<h1>Country Data</h1>
			<Filter filterTerm={filterTerm} onFilterChange={onFilterChange} />
			{visibleCountries.length === 1 ? (
				<CountryDetails country={visibleCountries[0]} weather={weather} />
			) : (
				<Countries countries={visibleCountries} onShow={onShow} />
			)}
		</div>
	);
};

export default App;
