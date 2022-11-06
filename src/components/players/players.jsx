import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerInTurn from './playerInTurn';
import ItemPlayer from './itemPlayer';
import { createPlayersList } from './slice/playersSlice';

const Container = styled.div`
	display: flex;
	justify-content: center;
	gap: 20px;
`;

const Players = () => {
	const players = useSelector((state) => state.game.players);
	const playersList = useSelector((state) => state.players.playersList);
	const dispatch = useDispatch();
	// const activePlayer = useSelector((state) => state.players.activePlayer);

	useEffect(() => {
		dispatch(createPlayersList(players));
	}, [players, dispatch]);

	if (playersList.length <= 1) {
		return <div>timer</div>;
	}

	return (
		<Container>
			{playersList.map((i) => (
				<ItemPlayer key={i.player} player={i.player} points={i.points} />
			))}
			<PlayerInTurn />
		</Container>
	);
};

export default Players;
