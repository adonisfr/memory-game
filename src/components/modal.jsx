import propTypes from 'prop-types';
import styled from 'styled-components';
import device from './utils/device';

const ModalContainer = styled.div`
	position: absolute;
	top: 0px;
	display: ${(props) => (props.show ? 'flex' : 'none')};
	justify-content: center;
	height: 100vh;
	width: 100vw;
	background: rgba(116, 115, 115, 0.6);
`;

const ModalContent = styled.div`
	position: absolute;
	top: ${(props) => (props.top ? props.top : '-300px')};
	border: 1px solid gray;
	background: white;
	padding: 0.5em;
	border-radius: 10px;
	border: 0px solid;

	// @media (${device.mobileM}) {
	// 	max-width: 300px;
	// }

	// @media ${device.tablet} {
	// 	max-width: 654px};
	// }

	// @media ${device.laptop} {
	// 	&:hover {
	// 		cursor: pointer;
	// 	}
	// }
`;

const ContentWraper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Modal = ({ children, show, top, title }) => {
	return (
		<ModalContainer show={show}>
			<ModalContent top={top}>
				<ContentWraper>
					<div>{title}</div>
					<div>{children}</div>
				</ContentWraper>
			</ModalContent>
		</ModalContainer>
	);
};

Modal.propTypes = {
	children: propTypes.oneOfType([propTypes.string, propTypes.node]),
	show: propTypes.bool,
	top: propTypes.string,
	title: propTypes.oneOfType([propTypes.string, propTypes.node])
};

Modal.defaultProps = {
	children: '',
	top: '40%',
	title: ''
};

export default Modal;
