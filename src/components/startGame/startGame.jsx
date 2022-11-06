import Button from '../button/button';
import styled from 'styled-components';
import device from '../utils/device';
import { useDispatch, useSelector } from 'react-redux';
import { setGridSize, setPlayers, setStarted, setTheme } from './slice/startGameSlice';

const Title = styled.h2`
	line-height: 40px;
	color: #fcfcfc;
	margin-bottom: 40px;
	font-style: normal;

	@media (${device.tablet}) {
		font-size: 40px;
		line-height: 50px;
		margin-bottom: 78px;
	}
`;

const Wraper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #152938;
	width: 100%;
`;

const InitialConfig = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fcfcfc;
	height: 386px;
	gap: 30px;
	padding: 24px;
	border-radius: 10px;

	@media (${device.tablet}) {
		width: auto;
		padding: 56px;
		height: 559px;
		gap: 55px;
	}
`;

const SectionsConfig = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	@media (${device.tablet}) {
		gap: 20px;
	}
`;

const TitleSectionConfig = styled.span`
	font-style: normal;
	font-weight: bold;
	font-size: 15px;
	line-height: 19px;
	color: #7191a5;

	@media (${device.tablet}) {
		font-size: 20px;
		line-height: 25px;
	}
`;

const BtnContainer = styled.div`
	display: flex;
	gap: 12px;

	@media (${device.tablet}) {
		gap: 20px;
	}
`;

const StartGame = () => {
	const theme = useSelector((state) => state.game.theme);
	const players = useSelector((state) => state.game.players);
	const gridSize = useSelector((state) => state.game.gridSize);
	const dispatch = useDispatch();

	const changeTheme = (newTheme) => {
		dispatch(setTheme(newTheme));
	};

	const changePlayers = (numPlayers) => {
		dispatch(setPlayers(numPlayers));
	};

	const changeGridSize = (newGridSize) => {
		dispatch(setGridSize(newGridSize));
	};

	const handleStart = () => {
		dispatch(setStarted(true));
	};

	return (
		<Wraper>
			<Title>memory</Title>
			<InitialConfig>
				<SectionsConfig>
					<TitleSectionConfig>Select Theme</TitleSectionConfig>
					<BtnContainer>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
							active={theme === 'number'}
							onClick={() => changeTheme('number')}
						>
							Numbers
						</Button>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
							active={theme === 'icons'}
							onClick={() => changeTheme('icons')}
						>
							Icons
						</Button>
					</BtnContainer>
				</SectionsConfig>
				<SectionsConfig>
					<TitleSectionConfig>Numbers of Players</TitleSectionConfig>
					<BtnContainer>
						<Button
							type="selection"
							md={{ width: '119px', height: '52px' }}
							active={players === 1}
							onClick={() => changePlayers(1)}
						>
							1
						</Button>
						<Button
							type="selection"
							md={{ width: '119px', height: '52px' }}
							active={players === 2}
							onClick={() => changePlayers(2)}
						>
							2
						</Button>
						<Button
							type="selection"
							md={{ width: '119px', height: '52px' }}
							active={players === 3}
							onClick={() => changePlayers(3)}
						>
							3
						</Button>
						<Button
							type="selection"
							md={{ width: '119px', height: '52px' }}
							active={players === 4}
							onClick={() => changePlayers(4)}
						>
							4
						</Button>
					</BtnContainer>
				</SectionsConfig>
				<SectionsConfig>
					<TitleSectionConfig>Grid Size</TitleSectionConfig>
					<BtnContainer>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
							active={gridSize === 4}
							onClick={() => changeGridSize(4)}
						>
							4x4
						</Button>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
							active={gridSize === 6}
							onClick={() => changeGridSize(6)}
						>
							6x6
						</Button>
					</BtnContainer>
				</SectionsConfig>
				<div style={{ marginTop: 20, textAlign: 'center' }}>
					<Button
						type="big"
						sm={{ height: '48px' }}
						md={{ width: '541px', height: '70px' }}
						onClick={handleStart}
					>
						Start Game
					</Button>
				</div>
			</InitialConfig>
		</Wraper>
	);
};

export default StartGame;
