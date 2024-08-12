import { useEffect, useState } from "react";
import countryDataServices from "./services/countrydata";
import weatherServices from "./services/weather";

const WeatherReport = ({ capital, weather }) => {
	return (
		<div>
			<h3>Weather at {capital}</h3>
			<span>temperature: {weather.temperature} Celsius</span>
			<br />
			<span>wind speed: {weather.windSpeed} m/s</span>
		</div>
	);
};

const CountryDetails = ({ country, weather }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<br />
			<span>capital: {country.capital.join(", ")}</span>
			<br />
			<span>area: {country.area}</span>
			<h3>languages:</h3>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt} />
			<WeatherReport capital={country.capital[0]} weather={weather} />
		</div>
	);
};

const Country = ({ country, onShow }) => {
	return (
		<p>
			{country.name.common}
			<button onClick={() => onShow(country)}>show</button>
		</p>
	);
};

const Countries = ({ countries, onShow }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}
	return (
		<div>
			{countries.map((country) => (
				<Country
					key={country.name.official}
					country={country}
					onShow={onShow}
				/>
			))}
		</div>
	);
};

const Filter = ({ filterTerm, onFilterChange }) => {
	return (
		<div>
			<span>find countries </span>
			<input type={filterTerm} onChange={onFilterChange} />
		</div>
	);
};

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
			.then((data) => data.current)
			.then((current) => {
				const newWeather = {
					temperature: current.temperature_2m,
					windSpeed: current.wind_speed_10m,
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
