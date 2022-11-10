import styled from 'styled-components';
import Board from './board/board';
import Menu from './menu/menu';
import Players from './players/players';
import device from './utils/device';

const GameContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0px 20px;

	@media ${device.mobileM} {
		height: 667px;
	}
	@media ${device.tablet} {
		height: 768px;
	}
	@media ${device.laptop} {
	}
`;

const Container = () => {
	return (
		<GameContainer>
			<Menu />
			<Board />
			<Players />
		</GameContainer>
	);
};

export default Container;
