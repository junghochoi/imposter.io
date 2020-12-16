import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import socket from "../Socket";

import HomeScreen from "../views/Home";
import GameWrapper from "./GameWrapper";

import Debug from "../dev/Debug";
import { CREATE_AND_JOIN_LOBBY, JOIN_LOBBY, LOBBY_EXISTS } from "../Events";
import { generateRoomCode } from "../Utilities";


export class Root extends Component {
	createLobbyAndRedirect = (formData) => {
		const { playerName } = formData;
		const roomCode = generateRoomCode(); // Randomly Generate Unique code
		socket.emit(CREATE_AND_JOIN_LOBBY, roomCode, playerName);
		
		return  (
			<Redirect
				to={{
					pathname: `/game/${roomCode}`,
					state: { 
						roomCode: roomCode,
						playerName: "bob"
					}
				}}
			/>
		)
	
	};

	
	joinLobbyAndRedirect = (formData) => {
		const { playerName, roomCode } = formData;
		socket.emit(JOIN_LOBBY, roomCode);
		return (
			<Redirect
				to={{
					pathname: `/game/${roomCode}`,
					state: { 
						roomCode: roomCode,
						playerName: playerName 
					}
				}}
			/>
		);
	};



	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={HomeScreen} />

					<Route
						exact
						path="/game/new"
						render={this.createLobbyAndRedirect}
					/>
					<Route
						exact
						path="/game/:id/join"
						render={(routeProps) => {
							
							const redirectComponent = this.joinLobbyAndRedirect(
								routeProps.location.state
							);
							
							return redirectComponent;
						}}
					/>
					<Route
						exact
						path="/game/:roomCode"
						render={(routeProps) => {
							const props  = routeProps.location.state;
						
							
							return <GameWrapper {...props}/>
						}}	
					/>
				</Switch>
				<Debug />
			</Router>
		);
	}
}

export default Root;
