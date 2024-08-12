const WeatherReport = ({ capital, weather }) => {
	return (
		<div>
			<h3>Weather at {capital}</h3>
			<p>
				(Weather information provided by{" "}
				<a href="https://open-meteo.com/" target="_blank">
					Open-Meteo
				</a>
				)
			</p>
			<span>
				temperature: {weather.temperature} {weather.temperatureUnit}
			</span>
			<br />
			<span>
				relative humidity: {weather.relativeHumidity}{" "}
				{weather.relativeHumidityUnit}
			</span>
			<br />
			<span>
				precipitation: {weather.precipitation} {weather.precipitationUnit}
			</span>
			<br />
			<span>
				cloud cover: {weather.cloudCover} {weather.cloudCoverUnit}
			</span>
			<br />
			<span>
				wind speed: {weather.windSpeed} {weather.windSpeedUnit}
			</span>
			<br />
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

export default CountryDetails;
