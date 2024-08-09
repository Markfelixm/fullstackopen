import { useState } from "react";

const Button = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ data }) => {
	return (
		<div>
			<p>good {data.good}</p>
			<p>neutral {data.neutral}</p>
			<p>bad {data.bad}</p>
		</div>
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
