import { configureStore } from '@reduxjs/toolkit';
import startGameReducer from './components/startGame/slice/startGameSlice';
import boardReducer from './components/board/slice/boardSlice';
import playerReducer from './components/players/slice/playersSlice';

const store = configureStore({
	reducer: { game: startGameReducer, board: boardReducer, players: playerReducer }
});

export default store;
