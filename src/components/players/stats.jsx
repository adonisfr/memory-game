import styled from 'styled-components';
import device from '../utils/device';

export const Stats = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #dfe7ec;
	border-radius: 5px;

	span {
		font-weight: bold;
		text-align: center;
		color: #7191a5;
	}

	h1 {
		font-weight: bold;
		text-align: center;
		color: #304859;
		margin: 1px;
	}

	@media (${device.mobileM}) {
		gap: 5px;
		width: 151px;
		height: 70px;

		span {
			font-size: 15px;
			line-height: 19px;
		}

		h1 {
			font-size: 24px;
			line-height: 30px;
			margin: 1px;
		}
	}

	@media (${device.tablet}) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 5px;
		width: 255px;
		height: 72px;

		span {
			font-size: 18px;
			line-height: 22px;
			margin-left: 18px;
		}

		h1 {
			font-size: 32px;
			line-height: 40px;
			margin-right: 18px;
		}
	}
`;
