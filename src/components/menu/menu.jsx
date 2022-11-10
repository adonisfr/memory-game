import styled from 'styled-components';
import Button from '../button/button';
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
	return (
		<GameMenu>
			<H3>memory</H3>
			<BtnMenu>
				<Button>Menu</Button>
			</BtnMenu>
			<ContentMenu>
				<Button md={{ height: '52px', width: '127px', fontSize: '20px' }}>Restart</Button>
				<Button md={{ height: '52px', width: '149px', fontSize: '20px' }} type="selection">
					New Game
				</Button>
			</ContentMenu>
		</GameMenu>
	);
};

export default Menu;
