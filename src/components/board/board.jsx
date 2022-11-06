import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from './card';
import { getItems } from './slice/boardSlice';

const BoardContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(${(prop) => prop.size}, 1fr);
	grit-template-rows: repeat(${(prop) => prop.size}, 1fr);
	gap: 10px;
`;

const Board = () => {
	const gridSize = useSelector((state) => state.game.gridSize);
	const items = useSelector((state) => state.board.items);
	const height = gridSize === 4 ? '72.53px' : '46.88px';

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getItems(gridSize));
	}, [dispatch, gridSize]);

	return (
		<BoardContainer size={gridSize}>
			{items.map((i, index) => (
				<Card
					key={index}
					sm={{
						height,
						width: height,
						size: gridSize
					}}
					value={i}
					index={index}
				>
					{i}
				</Card>
			))}
		</BoardContainer>
	);
};

export default Board;
