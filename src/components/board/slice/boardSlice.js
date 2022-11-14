import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	temporalActive: {},
	temporalRotated: [],
	activatedItems: [],
	movements: 0,
	goodMove: false,
	resetRotated: true
};

const BoardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		setItems: (state, actions) => {
			state.items = actions.payload;
		},
		setTemporalActive: (state, actions) => {
			state.temporalActive = actions.payload;
		},
		setTemporalRotated: (state, actions) => {
			state.temporalRotated = actions.payload ? [...state.temporalRotated, actions.payload] : [];
		},
		setActivatedItems: (state, actions) => {
			state.activatedItems = [...state.activatedItems, actions.payload];
		},
		setStat: (state, actions) => {
			state.movements = actions.payload;
		},
		setResetRotated: (state, actions) => {
			state.resetRotated = actions.payload;
		},
		resetBoard: () => initialState
	}
});

export const {
	setItems,
	setTemporalActive,
	setTemporalRotated,
	setActivatedItems,
	setStat,
	resetBoard,
	setResetRotated,
	restartBoard
} = BoardSlice.actions;

export const getItems = (size) => {
	return (dispatch) => {
		const array = [];
		const limit = size === 4 ? 8 : 18;
		for (let i = 0; i < limit; i++) {
			array[i] = i + 1;
		}
		const t = [...array, ...array].sort(function () {
			return Math.random() - 0.5;
		});

		const tmp = [...t];
		dispatch(setItems(tmp));
	};
};

/**
 * Update temporalRotated, movements
 *
 * @param {*} stats
 * @returns
 */
export const updateStats = (stats) => {
	return (dispatch, getState) => {
		const { movements } = getState().board;
		const count = movements + 1;
		dispatch(setStat(count));
	};
};

export default BoardSlice.reducer;
