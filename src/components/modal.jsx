import propTypes from 'prop-types';
import styled from 'styled-components';

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
	top: ${(props) => (props.top ? '40%' : '-300px')};
	border: 1px solid gray;
	background: white;
	padding: 0.5em;
`;

const Modal = ({ children, show, top }) => {
	return (
		<ModalContainer show={show}>
			<ModalContent top={top}>{children}</ModalContent>
		</ModalContainer>
	);
};

Modal.propTypes = {
	children: propTypes.oneOfType([propTypes.string, propTypes.node]),
	show: propTypes.bool,
	top: propTypes.string
};

Modal.defaultProps = {
	children: '',
	top: '40%'
};

export default Modal;
