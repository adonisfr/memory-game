import { createSlice } from '@reduxjs/toolkit';

const BoardSlice = createSlice({
	name: 'board',
	initialState: {
		items: [],
		temporalActive: {},
		temporalRotated: [],
		activatedItems: [],
		movements: 0,
		goodMove: false
	},
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
			// const { movements, good } = actions.payload;
			state.movements = actions.payload;
			// state.goodMove = good;
		},
		resetBoard: (state, actions) => {
			state.items = [];
			state.activatedItems = [];
			state.movements = -1;
			state.goodMove = false;
			state.temporalActive = {};
			state.temporalRotated = [1, 2];
		}
	}
});

export const {
	setItems,
	setTemporalActive,
	setTemporalRotated,
	setActivatedItems,
	setStat,
	resetBoard
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
 * Update temporalRotated, movements and goodMove
 *
 * @param {*} stats
 * @returns
 */
export const updateStats = (stats) => {
	return (dispatch, getState) => {
		// const { good, moved } = stats || {};
		const { movements } = getState().board;
		const count = movements + 1;
		// console.log('movements', count);
		// const tmp = {
		// 	// movements: moved ? movements + 1 : movements,
		// 	movements: count
		// 	// goodMove: good
		// };
		dispatch(setStat(count));
	};
};

export default BoardSlice.reducer;
