import styled from 'styled-components';
import Button from '../button/button';

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

const Menu = () => {
	return (
		<GameMenu>
			<H3>memory</H3>
			<Button>Menu</Button>
		</GameMenu>
	);
};

export default Menu;
