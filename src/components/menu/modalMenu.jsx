import propTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../button/button';
import Modal from '../modal';

const ContainerMenu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 327px;
	height: 224px;
	gap: 20px;
`;

const ModalMenu = ({ restarGame, newGame }) => {
	const [show, setShow] = useState(false);

	const handleRestartGame = () => {
		restarGame();
		setShow(false);
	};

	const handleNewGame = () => {
		newGame();
		setShow(false);
	};

	return (
		<div>
			<Button sm={{ height: '40px', width: '78px' }} onClick={() => setShow(true)}>
				Menu
			</Button>
			<Modal top="25%" show={show}>
				<ContainerMenu>
					<Button sm={{ height: '48px', width: '279px' }} onClick={handleRestartGame}>
						Restart
					</Button>
					<Button sm={{ height: '48px', width: '279px' }} type="secundary" onClick={handleNewGame}>
						New Game
					</Button>
					<Button
						sm={{ height: '48px', width: '279px' }}
						type="secundary"
						onClick={() => setShow(false)}
					>
						Resume Game
					</Button>
				</ContainerMenu>
			</Modal>
		</div>
	);
};

ModalMenu.propTypes = {
	restarGame: propTypes.func,
	newGame: propTypes.func
};

ModalMenu.defaultProps = {
	restarGame: null,
	newGame: null
};

export default ModalMenu;
