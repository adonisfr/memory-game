import { useSelector } from 'react-redux';
import { Stats } from './stats';

const MovemetsStats = () => {
	const movements = useSelector((state) => state.board.movements);
	return (
		<Stats>
			<span>Moves</span>
			<h1>{movements}</h1>
		</Stats>
	);
};

export default MovemetsStats;
