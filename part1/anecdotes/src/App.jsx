import { useState } from "react";

const getRandomIndex = (length) => Math.floor(Math.random() * length);

const incrementVote = (votes, index) => {
	const newVotes = [...votes];
	newVotes[index] += 1;
	return newVotes;
};

const getMostVotedIndex = (votes) => {
	let mostVotedIndex = 0;
	let mostVotes = 0;
	for (let i = 0; i < votes.length; i++) {
		if (votes[i] > mostVotes) {
			mostVotes = votes[i];
			mostVotedIndex = i;
		}
	}
	return mostVotedIndex;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const VotesLine = ({ votes, selected }) => {
	return <p>has {votes[selected]} votes</p>;
};

const AnecdoteLine = ({ anecdotes, selected }) => <p>{anecdotes[selected]}</p>;

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

	return (
		<div>
			<h1>Anecdotes</h1>
			<h2>Anecdote of the Day</h2>
			<AnecdoteLine anecdotes={anecdotes} selected={selected} />
			<VotesLine votes={votes} selected={selected} />
			<Button
				onClick={() => {
					setVotes(incrementVote(votes, selected));
				}}
				text="vote"
			/>
			<Button
				onClick={() => {
					setSelected(getRandomIndex(anecdotes.length));
				}}
				text="next anecdote"
			/>
			<h2>Most Voted</h2>
			<AnecdoteLine anecdotes={anecdotes} selected={getMostVotedIndex(votes)} />
			<VotesLine votes={votes} selected={getMostVotedIndex(votes)} />
		</div>
	);
};

export default App;
