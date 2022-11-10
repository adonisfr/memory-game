import styled from 'styled-components';
import MovemetsStats from './movementStats';
import Timer from './timer';

const StatsContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 20px;
`;

const OnePlayerStats = () => {
	return (
		<StatsContainer>
			<Timer />
			<MovemetsStats />
		</StatsContainer>
	);
};

export default OnePlayerStats;
