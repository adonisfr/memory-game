import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import device from '../utils/device';

const ContainerPlayer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: ${(props) => (props.active ? '#FDA214' : '#dfe7ec')};
	border-radius: 5px;
	height: 70px;
	width: 64px;

	@media (${device.tablet}) {
		width: 164px;
		height: 80px;
	}
`;

const Triangle = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;
	div {
		position: absolute;
		display: ${(props) => (props.active ? 'inline' : 'none')};
		top: -30px;
		width: 0px;
		height: 0px;
		border-right: 10px solid transparent;
		border-top: 10px solid transparent;
		border-left: 10px solid transparent;
		border-bottom: 10px solid #f0ad4e;
	}

	@media (${device.tablet}) {
		div {
			top: -45px;
			width: 0px;
			height: 0px;
			border-right: 15px solid transparent;
			border-top: 15px solid transparent;
			border-left: 15px solid transparent;
			border-bottom: 15px solid #f0ad4e;
		}
	}

	@media (${device.tablet}) {
		div {
			top: -50px;
		}
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (${device.tablet}) {
		align-items: flex-start;
	}

	@media (${device.tablet}) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
`;

const H3 = styled.h3`
	font-weight: bold;
	font-size: 15px;
	line-height: 19px;
	color: ${(props) => (props.active ? '#FCFCFC' : '#7191a5')};
	margin: 1px;

	@media (${device.mobileM}) {
		display: ${(props) => props?.sm?.display || 'auto'};
	}

	@media (${device.tablet}) {
		display: ${(props) => props?.md?.display || props?.sm?.display || 'auto'};
		margin-left: 10px;
	}

	@media (${device.laptop}) {
		font-size: 18px;
		line-height: 22px;
	}
`;

const Span = styled.span`
	font-weight: bold;
	font-size: 24px;
	line-height: 30px;
	color: ${(props) => (props.active ? '#FCFCFC' : '#304859')};

	@media (${device.tablet}) {
		margin-left: 10px;
		margin-right: 10px;
	}

	@media (${device.laptop}) {
		font-size: 32px;
		line-height: 40px;
	}
`;

const ItemPlayer = ({ player, points }) => {
	const activePlayer = useSelector((state) => state.players.activePlayer);
	const active = activePlayer === player;

	return (
		<ContainerPlayer active={active}>
			<Triangle active={active}>
				<div></div>
			</Triangle>
			<Content>
				<H3
					active={active}
					sm={{ display: 'none' }}
					md={{ display: 'inline' }}
				>{`Player ${player}`}</H3>
				<H3 active={active} sm={{ display: 'auto' }} md={{ display: 'none' }}>{`P${player}`}</H3>
				<Span active={active}>{points}</Span>
			</Content>
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
