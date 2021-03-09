import styled, { css } from "styled-components";

export const buttonStyles = css`
	background: #4c4c4c;
	color: #fff;
	box-shadow: 0 3px 0 #333333;
	border-radius: 20em;

	max-width: 200px;

	&:hover {
		background: #747373;
	}
	&:active,
	&:focus {
		background: #444444;
	}

	//-------
	border: 2px solid transparent;
	box-sizing: border-box;
	cursor: pointer;
	font-size: 1rem;
	font-weight: 700;
	line-height: 1;
	margin: 7px;
	padding: 15px 25px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	outline: none;
	position: relative;
	top: 0;
	text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
	-webkit-transition: all 0.2s ease-in-out 0s;
	-moz-transition: all 0.2s ease-in-out 0s;
	-ms-transition: all 0.2s ease-in-out 0s;
	transition: all 0.2s ease-in-out 0s;

`;

export const Button = styled.button(buttonStyles);

export const Container = styled.div`
	padding: 0 30px;
	margin-right: auto;
	margin-left: auto;
	
`;
export const Centered = styled.div`
  
	min-height: 90vh;
	display: flex;
	align-items: center;
	justify-content: center;

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