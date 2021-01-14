import styled from "styled-components";


export const Container = styled.div`
	padding: 0 30px;
	margin-right: auto;
	margin-left: auto;
	
`;
export const Centered = styled.div`
  margin: 0;
  position: absolute;
  width: 100%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Heading = styled.h1`
	text-align: center;
	font-family: 'Bitmap';
	
`;

/*
	Lobby.js

*/

export const LobbyMenu = styled.div`
	display: flex;
`;

export const SettingsContainer = styled.div`
	display: flex;
	flex-direction: column;

`;

export const Underline = styled.div`
	text-decoration: underline;
`;