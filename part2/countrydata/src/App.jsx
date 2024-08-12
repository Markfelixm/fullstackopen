import { useEffect, useState } from "react";
import countryDataServices from "./services/countrydata";

const CountryDetails = ({ country }) => {
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
		</div>
	);
};

const Countries = ({ countries }) => {
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}
	return (
		<div>
			{countries.map((country) => (
				<p key={country.name.official}>{country.name.common}</p>
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

	const onFilterChange = (event) => {
		setFilterTerm(event.target.value);
	};

	return (
		<div>
			<h1>Country Data</h1>
			<Filter filterTerm={filterTerm} onFilterChange={onFilterChange} />
			{visibleCountries.length === 1 ? (
				<CountryDetails country={visibleCountries[0]} />
			) : (
				<Countries countries={visibleCountries} />
			)}
		</div>
	);
};

export default App;
