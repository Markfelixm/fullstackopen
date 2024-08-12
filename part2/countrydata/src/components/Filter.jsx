const Filter = ({ filterTerm, onFilterChange }) => {
	return (
		<div>
			<span>find countries </span>
			<input type={filterTerm} onChange={onFilterChange} />
		</div>
	);
};

export default Filter;
