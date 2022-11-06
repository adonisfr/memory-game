import { useSelector } from 'react-redux';
import './App.css';
import Container from './components/container';
import StartGame from './components/startGame/startGame';

function App() {
	const started = useSelector((state) => state.game.started);
	return <div className="App">{started ? <Container /> : <StartGame />}</div>;
}

export default App;
