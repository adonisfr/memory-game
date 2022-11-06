import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ContainerPlayer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.background};
	border-radius: 5px;
	height: 70px;
	width: 64px;
`;

const H3 = styled.h3`
	font-weight: bold;
	font-size: 15px;
	line-height: 19px;
	color: #7191a5;
	margin: 1px;
`;

const Span = styled.span`
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	color: #304859;
`;

const ItemPlayer = ({ player, points }) => {
	const activePlayer = useSelector((state) => state.players.activePlayer);
	const background = activePlayer === player ? '#FDA214' : '#dfe7ec';

	// const movements = useSelector((state) => state.board.movements);

	return (
		<ContainerPlayer background={background}>
			<H3>{`P${player}`}</H3>
			<Span>{points}</Span>
		</ContainerPlayer>
	);
};

ItemPlayer.propTypes = {
	player: propTypes.number,
	points: propTypes.number
};

ItemPlayer.defaultProps = {
	player: 0,
	points: 0
};

export default ItemPlayer;
