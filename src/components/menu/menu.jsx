import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getItems, resetBoard } from '../board/slice/boardSlice';
import Button from '../button/button';
import { resetTimer, setActivePlayer, setClearTimer } from '../players/slice/playersSlice';
import { resetGame } from '../startGame/slice/startGameSlice';
import device from '../utils/device';

const GameMenu = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

const H3 = styled.h3`
	font-size: 24px;
	font-weight: bold;
	line-height: 30px;
	color: #152938;
`;

const BtnMenu = styled.div`
	@media ${device.mobileM} {
		display: flex;
	}
	@media ${device.tablet} {
		display: none;
	}
`;

const ContentMenu = styled.div`
	gap: 10px;
	@media ${device.mobileM} {
		display: none;
	}
	@media ${device.tablet} {
		display: flex;
	}
`;

const Menu = () => {
	const gridSize = useSelector((state) => state.game.gridSize);

	const dispatch = useDispatch();

	const restarGame = useCallback(() => {
		dispatch(setClearTimer(true));
		dispatch(resetBoard());
		dispatch(getItems(gridSize));
		setTimeout(() => {
			dispatch(setActivePlayer(1));
			dispatch(resetTimer());
		}, 300);
	}, [dispatch, gridSize]);

	const newGame = useCallback(() => {
		dispatch(setClearTimer(true));
		// dispatch(resetBoard());
		setTimeout(() => {
			dispatch(resetGame());
			dispatch(resetTimer());
		}, 300);
	}, [dispatch]);

	return (
		<GameMenu>
			<H3>memory</H3>
			<BtnMenu>
				<Button>Menu</Button>
			</BtnMenu>
			<ContentMenu>
				<Button md={{ height: '52px', width: '127px', fontSize: '20px' }} onClick={restarGame}>
					Restart
				</Button>
				<Button
					md={{ height: '52px', width: '149px', fontSize: '20px' }}
					onClick={newGame}
					type="selection"
				>
					New Game
				</Button>
			</ContentMenu>
		</GameMenu>
	);
};

export default Menu;
