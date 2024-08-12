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

export default Countries;
