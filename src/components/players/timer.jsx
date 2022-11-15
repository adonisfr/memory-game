import * as dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTime } from './slice/playersSlice';
import { Stats } from './stats';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const timeConverter = (seconds) => {
	let time = '';
	const s = dayjs.duration(seconds).format('HH:mm:ss');
	const tmp = s.split(':');
	if (tmp[0] !== '00') {
		time = s;
	} else {
		time = `${tmp[1]}:${tmp[2]}`;
	}
	return time;
};

let intervalId = '';
let flag = true;

const Timer = () => {
	const times = useSelector((state) => state.players.times);
	const clearTimer = useSelector((state) => state.players.clearTimer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (flag) {
			let seconds = 0;
			intervalId = setInterval(() => {
				seconds += 1000;
				const timeString = timeConverter(seconds);
				dispatch(setTime(timeString));
			}, 1000);
			flag = false;
		}
	}, [dispatch, clearTimer]);

	useEffect(() => {
		if (clearTimer) {
			clearInterval(intervalId);
			flag = true;
		}
	}, [clearTimer]);

	return (
		<Stats>
			<span>Time</span>
			<h1>{times}</h1>
		</Stats>
	);
};

export default Timer;
