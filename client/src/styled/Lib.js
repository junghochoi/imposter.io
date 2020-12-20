import styled from "styled-components";
import { Link } from "react-router-dom";
// import { device }  from './ScreenSize';

export const Container = styled.div`
	padding: 0 30px;
	margin-right: auto;
	margin-left: auto;
`;
export const HomeMenu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 490px;
	margin: 0 auto;
	background: rgba(50, 50, 50, 0.5);
	border-radius: 10px;
	padding: 2em;
`;

export const Heading = styled.h1`
	text-align: center;
`;

export const MenuInput = styled.input`
	padding: 10px 12px;
	margin: 3px;
    border: 2px solid #fff;
    background-color: #000;
    border-radius: 4px;
    color: white;
    font-size: 1.15rem;

    &:focus{
        outline: none
    }
`;

export const MenuLinkButton = styled(Link)`
	// STUFF TO CHANGE ---- if we want to use props
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