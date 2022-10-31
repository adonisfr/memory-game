import propTypes from 'prop-types';
import styled, { css } from 'styled-components';
import device from '../utils/device';

const Btn = styled.button`
	border: 0px;
	border-radius: 26px;
	color: #fcfcfc;
	font-family: 'Atkinson Hyperlegible';
	font-weight: bold;
	line-height: 22px;
	text-align: center;
	min-width: 62px;
	height: 40px;

	${(props) => {
		switch (props.type) {
			case 'primary':
				return css`
					background-color: #fda214;

					&:hover {
						background-color: red;
					}
				`;
			case 'secundary':
				return css`
					background-color: #dfe7ec;
					color: #304859; ;
				`;
			case 'selection':
				return css`
					background-color: ${(props) => (props.active ? '#304859' : '#bcced9')};

					&:hover {
						background-color: #6395b8;
					}
				`;
			case 'big':
				return css`
					background-color: #fda214;
					padding: 12px 91px 14px 91px;

					&:hover {
						background-color: #ffb84a;
					}
				`;
			default:
				return css`
					color: black;
				`;
		}
	}}
	@media ${device.mobileM} {
		font-size: 18px;
		height: ${(props) => props?.sm?.height || '40px'};
		width: ${(props) => props?.sm?.width || 'auto'};
	}
	@media ${device.tablet} {
		font-size: ${(props) => (props.type === 'big' ? '32px' : '26px')};
		line-height: ${(props) => (props.type === 'big' ? '40px' : '32px')};
		height: ${(props) => props?.md?.height || props?.sm?.height || '40px'};
		width: ${(props) => props?.md?.width || props?.sm?.width || 'auto'};
	}
	@media ${device.laptop} {
		font-size: 18px;
		height: ${(props) => props?.lg?.height || props?.md?.height || props?.sm?.height || '40px'};
		width: ${(props) => props?.lg?.width || props?.md?.width || props?.sm?.width || 'auto'};

		&:hover {
			cursor: pointer;
		}
	}
`;

const Button = ({ type, children, sm, md, lg, active }) => {
	return (
		<Btn type={type} sm={sm} md={md} lg={lg} active={active}>
			{children}
		</Btn>
	);
};

Button.propTypes = {
	children: propTypes.oneOfType([propTypes.string, propTypes.node]),
	type: propTypes.oneOf(['primary', 'secundary', 'selection', 'big']),
	sm: propTypes.shape({
		height: propTypes.string,
		width: propTypes.string
	}),
	md: propTypes.shape({
		height: propTypes.string,
		width: propTypes.string
	}),
	lg: propTypes.shape({
		height: propTypes.string,
		width: propTypes.string
	}),
	active: propTypes.bool
};

Button.defaultProps = {
	children: '',
	type: 'primary',
	sm: {},
	md: {},
	lg: {},
	active: false
};

export default Button;
