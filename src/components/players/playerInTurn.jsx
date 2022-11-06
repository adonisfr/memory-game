import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateStats } from '../board/slice/boardSlice';
import CountDown from '../countDown';
import Modal from '../modal';
import { setShowPlayerInTurn, updatePlayersScore } from './slice/playersSlice';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PlayerInTurn = () => {
	const activePlayer = useSelector((state) => state.players.activePlayer);

	const showPlayerInTurn = useSelector((state) => state.players.showPlayerInTurn);
	const temporalRotated = useSelector((state) => state.board.temporalRotated);
	const dispatch = useDispatch();

	useEffect(() => {
		if (temporalRotated.length > 1) {
			dispatch(updateStats({ moved: true }));
			dispatch(updatePlayersScore(0));
		}
	}, [temporalRotated, dispatch]);

	const show = useCallback(() => {
		return dispatch(setShowPlayerInTurn(false));
	}, [dispatch]);

	return (
		<Modal show={showPlayerInTurn}>
			<Content>
				<h3>{`Player ${activePlayer} in turn`}</h3>
				<CountDown callBack={show} />
			</Content>
		</Modal>
	);
};

export default PlayerInTurn;
