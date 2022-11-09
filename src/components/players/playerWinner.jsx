import propTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getItems, resetBoard, updateStats } from '../board/slice/boardSlice';
import Button from '../button/button';
import Modal from '../modal';
import { setShowPlayerWinner } from './slice/playersSlice';

const Winners = styled.div`
	display: flex;
	width: 279px;
	flex-direction: column;
	gap: 24px;
`;

const PlayersList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const PlayerItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 48px;
	background: ${(props) => props.background};
	border-radius: 5px;
	padding: 0px 16px;

	span {
		color: ${(props) => props.color};
	}
`;

const ContentTitle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-weight: bold;
		font-size: 24px;
		line-height: 30px;
		text-align: center;
		color: #152938;
	}

	p {
		font-weight: bold;
		font-size: 14px;
		line-height: 17px;
		color: #7191a5;
	}
`;

const ContentButton = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const PlayerWinner = ({ items }) => {
	const [show, setShow] = useState(false);
	const showPlayerWinner = useSelector((state) => state.players.showPlayerWinner);
	// const players = useSelector(state=>state.game.players)
	const playersList = useSelector((state) => state.players.playersList);
	const activatedItems = useSelector((state) => state.board.activatedItems);
	const movements = useSelector((state) => state.board.movements);
	const gridSize = useSelector((state) => state.game.gridSize);
	const temporalRotated = useSelector((state) => state.board.temporalRotated);
	const dispatch = useDispatch();

	useEffect(() => {
		if (temporalRotated.length > 1) {
			dispatch(updateStats({ moved: true }));
		}
	}, [temporalRotated, dispatch]);

	useEffect(() => {
		if (items.length > 0 && activatedItems.length === items.length / 2) {
			dispatch(setShowPlayerWinner(true));
			setShow(true);
		}
	}, [activatedItems, dispatch, items]);

	const result = useMemo(() => {
		if (playersList.length > 1) {
			const tmpList = [...playersList];
			const list = tmpList.sort((a, b) => Number(b.points) - Number(a.points));
			const maxPoints = list[0]?.points;
			const repeatedPoints = list.filter((i) => i.points === maxPoints);
			const title = repeatedPoints.length > 1 ? 'It’s a tie!' : `Player ${list[0]?.player} Wins!`;
			return {
				list,
				maxPoints,
				title,
				subtitle: 'Game over! Here are the results…'
			};
		}
		return {
			title: 'You did it!',
			subtitle: 'Game over! Here’s how you got on…'
		};
	}, [playersList]);

	const restarGame = useCallback(() => {
		dispatch(resetBoard());
		dispatch(getItems(gridSize));
		setShow(false);
	}, [dispatch, gridSize]);

	if (!show) {
		return null;
	}
	return (
		<Modal
			show={showPlayerWinner}
			title={
				<ContentTitle>
					<h1>{result.title}</h1>
					<p>{result.subtitle}</p>
				</ContentTitle>
			}
			top="80px"
		>
			<Winners>
				{playersList.length > 1 ? (
					<PlayersList>
						{result?.list.map((p) => (
							<PlayerItem
								key={p.player}
								background={result.maxPoints === p.points ? '#152938' : '#DFE7EC'}
								color={result.maxPoints === p.points ? '#FCFCFC' : '#304859'}
							>
								<span>{`Player ${p.player} `}</span>
								<span>{`${p.points} Pairs`}</span>
							</PlayerItem>
						))}
					</PlayersList>
				) : (
					<PlayersList>
						<PlayerItem background="#DFE7EC" color="#304859">
							<span>{`Time Elapsed `}</span>
							<span>{`Moves Taken`}</span>
						</PlayerItem>
						<PlayerItem background="#DFE7EC" color="#304859">
							<span>{`Time Elapsed `}</span>
							<span>{`${movements} Moves`}</span>
						</PlayerItem>
					</PlayersList>
				)}
				<ContentButton>
					<Button onClick={restarGame}>Restart</Button>
					<Button type="selection">Setup New Game</Button>
				</ContentButton>
				{console.log('me pinto')}
			</Winners>
		</Modal>
	);
};

PlayerWinner.propTypes = {
	items: propTypes.arrayOf(propTypes.number)
};

PlayerWinner.defaultProps = {
	items: []
};

export default PlayerWinner;
