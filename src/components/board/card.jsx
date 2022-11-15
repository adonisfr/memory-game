import styled from 'styled-components';
import propTypes from 'prop-types';
import device from '../utils/device';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setActivatedItems,
	setResetRotated,
	setTemporalActive,
	setTemporalRotated,
	updateStats
} from './slice/boardSlice';
import { updatePlayersScore } from '../players/slice/playersSlice';

const StyledCard = styled.div`
	position: relative;
	perspective: 1000px;
	transform-style: preserve-3d;
	transition: all 0.5s linear;
	transform: ${(props) => (props.rotated ? 'rotateY(180deg)' : 'rotateY(0deg)')};

	@media ${device.mobileM} {
		height: ${(props) => props?.sm?.height || '40px'};
		width: ${(props) => props?.sm?.width || 'auto'};
	}
	@media ${device.tablet} {
		height: ${(props) => props?.md?.height || props?.sm?.height || '40px'};
		width: ${(props) => props?.md?.width || props?.sm?.width || 'auto'};
	}
	@media ${device.laptop} {
		height: ${(props) => props?.lg?.height || props?.md?.height || props?.sm?.height || '40px'};
		width: ${(props) => props?.lg?.width || props?.md?.width || props?.sm?.width || 'auto'};

		&:hover {
			cursor: pointer;
		}
	}
`;

const Front = styled.div`
	position: absolute;
	backface-visibility: hidden;
	height: 100%;
	width: 100%;
	background: #304859;
	border-radius: ${(props) => props.borderRadius};

	@media (${device.laptop}) {
		&:hover {
			background: #6395b8;
		}
	}
`;

const Back = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	backface-visibility: hidden;
	height: 100%;
	width: 100%;
	transform: rotateY(180deg);
	background: ${(props) => (props.active ? '#FDA214' : '#979797')};
	border-radius: ${(props) => props.borderRadius};
`;

const Item = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	color: #fcfcfc;
	font-weight: 700;

	@media ${device.mobileM} {
		height: ${(props) => props?.sm?.height || '40px'};
		width: ${(props) => props?.sm?.width || 'auto'};
		font-size: ${(props) => props?.sm?.fontSize || ''};
	}
	@media ${device.tablet} {
		height: ${(props) => props?.md?.height || props?.sm?.height || '40px'};
		width: ${(props) => props?.md?.width || props?.sm?.width || 'auto'};
		font-size: ${(props) => props?.md?.fontSize || props?.sm?.fontSize || ''};
	}
	@media ${device.laptop} {
		height: ${(props) => props?.lg?.height || props?.md?.height || props?.sm?.height || '40px'};
		width: ${(props) => props?.lg?.width || props?.md?.width || props?.sm?.width || 'auto'};
		font-size: ${(props) => props?.lg?.fontSize || props?.md?.fontSize || ''};
	}
`;

const Card = ({ value, index, sm, md, lg, font, size, children }) => {
	const [rotated, setRotated] = useState(false);
	const temporalActive = useSelector((state) => state.board.temporalActive);
	const activatedItems = useSelector((state) => state.board.activatedItems);
	const temporalRotated = useSelector((state) => state.board.temporalRotated);
	const resetRotated = useSelector((state) => state.board.resetRotated);
	const dispatch = useDispatch();
	const borderRadius = '59px';

	const active = activatedItems.some((i) => {
		return i === value;
	});

	useEffect(() => {
		if (temporalRotated.length > 1 && !active) {
			setTimeout(() => {
				dispatch(setTemporalRotated());
				dispatch(setTemporalActive(''));
				setRotated(false);
			}, 350);
		}
	}, [temporalRotated, dispatch, active]);

	useEffect(() => {
		if (resetRotated) {
			dispatch(setResetRotated(false));
			setRotated(false);
		}
	}, [resetRotated, dispatch]);

	const handleRotate = useCallback(() => {
		if (!active) {
			if (!rotated) {
				setRotated(true);
				dispatch(setTemporalRotated(value));
				if (!temporalActive.value) {
					dispatch(setTemporalActive({ value, index }));
				} else if (value === temporalActive.value && value !== temporalActive.index && !rotated) {
					dispatch(setTemporalRotated());
					dispatch(setTemporalActive(''));
					dispatch(updateStats({ good: true, moved: true }));
					dispatch(updatePlayersScore(1));
					setTimeout(() => {
						dispatch(setActivatedItems(value));
					}, 500);
				} else {
					dispatch(setTemporalActive(''));
				}
			} else {
				setRotated(false);
				dispatch(setTemporalRotated());
				dispatch(setTemporalActive(''));
			}
		}
	}, [dispatch, rotated, temporalActive, value, index, active]);

	return (
		<StyledCard
			rotated={rotated}
			sm={sm}
			md={md}
			lg={lg}
			temporalActive={temporalActive}
			onClick={handleRotate}
		>
			<Front borderRadius={borderRadius}></Front>
			<Back borderRadius={borderRadius} active={active}>
				<Item sm={{ fontSize: font?.sm?.fontSize }} md={{ fontSize: font?.sm?.fontSize }}>
					{children}
				</Item>
			</Back>
		</StyledCard>
	);
};

Card.propTypes = {
	children: propTypes.oneOfType([propTypes.string, propTypes.node]),
	value: propTypes.oneOfType([propTypes.string, propTypes.number]),
	index: propTypes.number,
	size: propTypes.string,
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
	font: propTypes.objectOf(propTypes.any),
	onClick: propTypes.func
};

Card.defaultProps = {
	children: '',
	value: '',
	sm: {},
	md: {},
	lg: {},
	index: 0,
	font: {}
};

export default Card;
