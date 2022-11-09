import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter } from './players/slice/playersSlice';

const CountDown = ({ times, callBack }) => {
	const counter = useSelector((state) => state.players.counter);
	const dispatch = useDispatch();

	useEffect(() => {
		if (counter) {
			setTimeout(() => {
				dispatch(setCounter(counter - 1));
			}, 1000);
		} else {
			if (callBack) {
				callBack();
			}
		}
	}, [counter, dispatch, callBack]);
	return <div>{counter}</div>;
};

CountDown.propTypes = {
	times: propTypes.number,
	callBack: propTypes.func
};

CountDown.defaultProps = {
	times: 3,
	callBack: null
};

export default CountDown;
