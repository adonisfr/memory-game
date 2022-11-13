import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerWinner from '../players/playerWinner';
import device from '../utils/device';
import Card from './card';
import { getItems } from './slice/boardSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCar,
	faBug,
	faGlasses,
	faMusic,
	faHeart,
	faGift,
	faHome,
	faPlane,
	faTrophy,
	faBriefcase,
	faTruck,
	faUmbrella,
	faCoffee,
	faMotorcycle,
	faHeartbeat,
	faTry,
	faBath,
	faBell
} from '@fortawesome/free-solid-svg-icons';

const icons = {
	1: faCar,
	2: faBug,
	3: faGlasses,
	4: faMusic,
	5: faHeart,
	6: faGift,
	7: faHome,
	8: faPlane,
	9: faTrophy,
	10: faBriefcase,
	11: faTruck,
	12: faUmbrella,
	13: faCoffee,
	14: faMotorcycle,
	15: faHeartbeat,
	16: faTry,
	17: faBath,
	18: faBell
};

const BoardContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(${(prop) => prop.size}, 1fr);
	justify-items: center;
	gap: 8px;

	@media ${device.mobileM} {
		width: ${(props) => props?.sm?.width || 'auto'};
	}
	@media ${device.tablet} {
		width: ${(props) => props?.md?.width || props?.sm?.width || 'auto'};
	}
	@media ${device.laptop} {
		width: ${(props) => props?.lg?.width || props?.md?.width || props?.sm?.width || 'auto'};
	}
`;

const Board = () => {
	const gridSize = useSelector((state) => state.game.gridSize);
	const items = useSelector((state) => state.board.items);
	const theme = useSelector((state) => state.game.theme);
	const smHeight = gridSize === 4 ? '72.53px' : '46.88px';
	const mdHeight = gridSize === 4 ? '118px' : '82px';
	const smFontSize = gridSize === 4 ? '40px' : '24px';
	const mdFontSize = gridSize === 4 ? '56px' : '44px';

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getItems(gridSize, theme));
	}, [dispatch, gridSize, theme]);

	return (
		<BoardContainer size={gridSize} sm={{ width: '327px' }} md={{ width: '532px' }}>
			{items.map((i, index) => (
				<Card
					key={index}
					sm={{
						height: smHeight,
						width: smHeight,
						size: gridSize
					}}
					md={{
						height: mdHeight,
						width: mdHeight,
						size: gridSize
					}}
					font={{
						sm: { fontSize: smFontSize },
						md: { fontSize: mdFontSize }
					}}
					value={i}
					index={index}
				>
					{theme === 'number' ? i : <FontAwesomeIcon icon={icons[i]} />}
				</Card>
			))}
			<PlayerWinner items={items} />
		</BoardContainer>
	);
};

export default Board;
