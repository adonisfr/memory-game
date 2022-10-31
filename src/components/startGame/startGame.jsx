import Button from '../button/button';
import styled from 'styled-components';
import device from '../utils/device';

const Title = styled.h2`
	line-height: 40px;
	color: #fcfcfc;
	margin-bottom: 40px;
	font-style: normal;

	@media (${device.tablet}) {
		font-size: 40px;
		line-height: 50px;
		margin-bottom: 78px;
	}
`;

const Wraper = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #152938;
	width: 100%;
`;

const InitialConfig = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fcfcfc;
	height: 386px;
	gap: 30px;
	padding: 24px;
	border-radius: 10px;

	@media (${device.tablet}) {
		width: auto;
		padding: 56px;
		height: 559px;
		gap: 55px;
	}
`;

const SectionsConfig = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	@media (${device.tablet}) {
		gap: 20px;
	}
`;

const TitleSectionConfig = styled.span`
	font-style: normal;
	font-weight: bold;
	font-size: 15px;
	line-height: 19px;
	color: #7191a5;

	@media (${device.tablet}) {
		font-size: 20px;
		line-height: 25px;
	}
`;

const BtnContainer = styled.div`
	display: flex;
	gap: 12px;

	@media (${device.tablet}) {
		gap: 20px;
	}
`;

const StartGame = () => {
	return (
		<Wraper>
			<Title>memory</Title>
			<InitialConfig>
				<SectionsConfig>
					<TitleSectionConfig>Select Theme</TitleSectionConfig>
					<BtnContainer>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
							active
						>
							Numbers
						</Button>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
						>
							Icons
						</Button>
					</BtnContainer>
				</SectionsConfig>
				<SectionsConfig>
					<TitleSectionConfig>Numbers of Players</TitleSectionConfig>
					<BtnContainer>
						<Button type="selection" md={{ width: '119px', height: '52px' }} active>
							1
						</Button>
						<Button type="selection" md={{ width: '119px', height: '52px' }}>
							2
						</Button>
						<Button type="selection" md={{ width: '119px', height: '52px' }}>
							3
						</Button>
						<Button type="selection" md={{ width: '119px', height: '52px' }}>
							4
						</Button>
					</BtnContainer>
				</SectionsConfig>
				<SectionsConfig>
					<TitleSectionConfig>Grid Size</TitleSectionConfig>
					<BtnContainer>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
							active
						>
							4x4
						</Button>
						<Button
							type="selection"
							sm={{ width: '134px' }}
							md={{ width: '256px', height: '52px' }}
						>
							6x6
						</Button>
					</BtnContainer>
				</SectionsConfig>
				<div style={{ marginTop: 20, textAlign: 'center' }}>
					<Button type="big" sm={{ height: '48px' }} md={{ width: '541px', height: '70px' }}>
						Start Game
					</Button>
				</div>
			</InitialConfig>
		</Wraper>
	);
};

export default StartGame;
