import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
	name: 'players',
	initialState: {
		activePlayer: 1,
		showPlayerInTurn: true,
		counter: 2,
		playersList: [],
		showPlayerWinner: false
	},
	reducers: {
		setPlayersList: (state, actions) => {
			state.playersList = actions.payload;
		},
		setActivePlayer: (state, actions) => {
			state.activePlayer = actions.payload;
		},
		setShowPlayerInTurn: (state, actions) => {
			state.showPlayerInTurn = actions.payload;
		},
		setCounter: (state, actions) => {
			state.counter = actions.payload;
		},
		setCountDown: (state, actions) => {
			state.counter = actions.payload.counter;
			state.showPlayerInTurn = actions.payload.showPlayerInTurn;
		},
		setShowPlayerWinner: (state, actions) => {
			state.showPlayerWinner = actions.payload;
		}
	}
});

export const {
	setPlayersList,
	setActivePlayer,
	setShowPlayerInTurn,
	setCounter,
	setCountDown,
	setShowPlayerWinner
} = playerSlice.actions;

export const createPlayersList = (num) => {
	return (dispath) => {
		const playersL = [];
		for (let i = 0; i < num; i++) {
			playersL[i] = { player: i + 1, points: 0 };
		}
		dispath(setPlayersList(playersL));
	};
};

export const updatePlayersScore = (counter) => {
	return (dispatch, getState) => {
		const { playersList, activePlayer } = getState().players;
		const { items } = getState().board;
		let totalPoints = 0;
		const updatedPlayers = playersList.map((i) => {
			totalPoints += i.points;
			if (activePlayer === i.player) {
				totalPoints += counter;
				return {
					...i,
					points: i.points + counter
				};
			}
			return i;
		});
		const count = activePlayer + 1;
		const player = count > playersList.length ? 1 : count;
		dispatch(setActivePlayer(player));
		dispatch(setPlayersList(updatedPlayers));

		if (items.length > 0 && totalPoints !== items.length / 2) {
			dispatch(
				setCountDown({
					counter: 2,
					showPlayerInTurn: true
				})
			);
		}
	};
};

export default playerSlice.reducer;
