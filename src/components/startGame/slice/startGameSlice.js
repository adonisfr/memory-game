import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	theme: 'number',
	players: 1,
	gridSize: 4,
	started: false
};

const startGameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setPlayers: (state, action) => {
			state.players = action.payload;
		},
		setGridSize: (state, action) => {
			state.gridSize = action.payload;
		},
		setStarted: (state, action) => {
			state.started = action.payload;
		},
		resetGame: (state) => initialState
	}
});

export const { setTheme, setPlayers, setGridSize, setStarted, resetGame } = startGameSlice.actions;

export default startGameSlice.reducer;
