const Header = ({ name }) => {
	return <h1>{name}</h1>;
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const TotalParts = ({ parts }) => {
	const total = parts.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<p>
			<b>total of {total} exercises</b>
		</p>
	);
};

const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
			<TotalParts parts={parts} />
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header name={course.name} />
			<Content key={course.id} parts={course.parts} />
		</div>
	);
};

export default Course;
