import propTypes from 'prop-types';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getItems, resetBoard, updateStats } from '../board/slice/boardSlice';
import Button from '../button/button';
import Modal from '../modal';
import { resetGame } from '../startGame/slice/startGameSlice';
import device from '../utils/device';
import { setShowPlayerWinner, setTime } from './slice/playersSlice';

const Winners = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;

	@media (${device.mobileM}) {
		width: 327px;
	}

	@media (${device.tablet}) {
		width: 654px;
		gap: 40px;
		padding: 20px 0px;
	}
`;

const PlayersList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	@media (${device.tablet}) {
		gap: 12px;
	}
`;

const PlayerItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${(props) => props.background};
	border-radius: 5px;
	padding: 0px 16px;

	span {
		color: ${(props) => props.color};
	}

	b {
		color: ${(props) => props.color};
		font-size: 20px;
		line-height: 25px;
	}

	@media (${device.mobileM}) {
		height: 48px;
		width: 279px;
	}

	@media (${device.tablet}) {
		height: 72px;
		width: 542px;
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
		margin: 1px;
	}

	p {
		font-weight: bold;
		font-size: 14px;
		line-height: 17px;
		color: #7191a5;
	}

	@media (${device.tablet}) {
		h1 {
			font-size: 48px;
			line-height: 60px;
		}

		p {
			font-size: 18px;
			line-height: 22px;
		}
	}
`;

const ContentButton = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;

	@media (${device.tablet}) {
		flex-direction: row;
	}
`;

const PlayerWinner = ({ items }) => {
	const showPlayerWinner = useSelector((state) => state.players.showPlayerWinner);
	const playersList = useSelector((state) => state.players.playersList);
	const activatedItems = useSelector((state) => state.board.activatedItems);
	const movements = useSelector((state) => state.board.movements);
	const gridSize = useSelector((state) => state.game.gridSize);
	const temporalRotated = useSelector((state) => state.board.temporalRotated);
	const times = useSelector((state) => state.players.times);
	const dispatch = useDispatch();

	useEffect(() => {
		if (temporalRotated.length > 1) {
			dispatch(updateStats({ moved: true }));
		}
	}, [temporalRotated, dispatch]);

	useEffect(() => {
		if (items.length > 0 && activatedItems.length === items.length / 2) {
			dispatch(setShowPlayerWinner(true));
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
		dispatch(setShowPlayerWinner(false));
		dispatch(setTime('00:00'));
	}, [dispatch, gridSize]);

	const newGame = useCallback(() => {
		dispatch(resetBoard());
		dispatch(resetGame());
		dispatch(setShowPlayerWinner(false));
		dispatch(setTime('00:00'));
	}, [dispatch]);

	if (!showPlayerWinner) {
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
								<b>{`${p.points} Pairs`}</b>
							</PlayerItem>
						))}
					</PlayersList>
				) : (
					<PlayersList>
						<PlayerItem background="#DFE7EC" color="#304859">
							<span>{`Time Elapsed `}</span>
							<b>{times}</b>
						</PlayerItem>
						<PlayerItem background="#DFE7EC" color="#304859">
							<span>{`Moves Taken `}</span>
							<b>{`${movements} Moves`}</b>
						</PlayerItem>
					</PlayersList>
				)}
				<ContentButton>
					<Button
						onClick={restarGame}
						sm={{ height: '48px', width: '279px' }}
						md={{ height: '52px', width: '264px' }}
					>
						Restart
					</Button>
					<Button
						type="selection"
						onClick={newGame}
						sm={{ height: '48px', width: '279px' }}
						md={{ height: '52px', width: '264px' }}
					>
						Setup New Game
					</Button>
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
