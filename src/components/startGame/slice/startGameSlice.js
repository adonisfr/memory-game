import { createSlice } from '@reduxjs/toolkit';

const startGameSlice = createSlice({
	name: 'game',
	initialState: {
		theme: 'number',
		players: 1,
		gridSize: 4,
		started: false
	},
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
		}
	}
});

export const { setTheme, setPlayers, setGridSize, setStarted } = startGameSlice.actions;

export default startGameSlice.reducer;
