import { useState } from "react";

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const getTotal = (data) => data.good + data.neutral + data.bad;

const getAverage = (data) => (data.good - data.bad) / getTotal(data);

const getPositive = (data) => (100 * data.good) / getTotal(data);

const StatisticsTableRow = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({ data }) => {
	if (getTotal(data) === 0) {
		return <p>No feedback given</p>;
	}
	return (
		<table>
			<tbody>
				<StatisticsTableRow text="good" value={data.good} />
				<StatisticsTableRow text="neutral" value={data.neutral} />
				<StatisticsTableRow text="bad" value={data.bad} />
				<StatisticsTableRow text="all" value={getTotal(data)} />
				<StatisticsTableRow text="average" value={getAverage(data)} />
				<StatisticsTableRow text="positive" value={getPositive(data)} />
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const data = {
		good: good,
		neutral: neutral,
		bad: bad,
	};
	return (
		<div>
			<h1>Unicafe</h1>
			<h2>Give Feedback</h2>
			<Button onClick={() => setGood(good + 1)} text="good" />
			<Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button onClick={() => setBad(bad + 1)} text="bad" />
			<h2>Statistics</h2>
			<Statistics data={data} />
		</div>
	);
};

export default App;
