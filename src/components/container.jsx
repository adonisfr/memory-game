import Board from './board/board';
import Menu from './menu/menu';
import Players from './players/players';

const Container = () => {
	return (
		<div
			style={{
				width: '100%',
				padding: 20,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between'
			}}
		>
			<Menu />
			<Board />
			<Players />
		</div>
	);
};

export default Container;
