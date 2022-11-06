import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
	name: 'players',
	initialState: {
		activePlayer: 1,
		showPlayerInTurn: true,
		counter: 3,
		playersList: []
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
		}
	}
});

export const { setPlayersList, setActivePlayer, setShowPlayerInTurn, setCounter, setCountDown } =
	playerSlice.actions;

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
	return (dispath, getState) => {
		const { playersList, activePlayer } = getState().players;
		const updatedPlayers = playersList.map((i) => {
			if (activePlayer === i.player) {
				return {
					...i,
					points: i.points + counter
				};
			}
			return i;
		});
		const count = activePlayer + 1;
		const player = count > playersList.length ? 1 : count;
		dispath(setActivePlayer(player));
		dispath(setPlayersList(updatedPlayers));
		dispath(
			setCountDown({
				counter: 3,
				showPlayerInTurn: true
			})
		);
	};
};

export default playerSlice.reducer;
