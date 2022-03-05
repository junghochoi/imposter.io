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
import { generateRoomCode } from "../Utilities";
import { CREATE_AND_JOIN_LOBBY, JOIN_LOBBY } from "../Events";




export class Root extends Component {


	componentDidMount() {
		socket.on('disconnect', () =>  {
			alert('Server disconnected! Check your net connection');
			window.location = "/"; //page you want to redirect
		});
	}
	/*
		 Prevent Error - If the invalid data is entered in the home Screen
		 return True
	*/
	preventError = (formData) => {
		if (formData !== undefined || formData !== null) {
			const { playerName, roomCode } = formData; 
			const errorPlayerName = playerName === undefined || playerName === '';
			const errorRoomCode   = roomCode   === undefined || roomCode   === '';
			if (errorPlayerName|| errorRoomCode ) {
				alert("Enter a name OR Enter Valid Room Code");
				return true;
			}
			return false;
		}
		return true;
	}

	joinLobby = (formData, emitSignal) => {
		
		if (this.preventError(formData)){
			return <Redirect to='/' />
		}

		const { roomCode, playerName } = formData;
		socket.emit(emitSignal, roomCode, playerName);

		return  (
			<Redirect
				to={{
					pathname: `/game/${roomCode}`,
					state: { 
						roomCode: roomCode,
						playerName: playerName
					}
				}}
			/>
		)
	}

	verifyProps = (props, Component) => {
		if (props === undefined){
			return <Redirect to='/' />
		} else {
			return <Component {...props}/>
		}
	}




	render() {
		return (
			
			<Router>
				<Switch>
					<Route exact path="/" component={HomeScreen} />

					<Route
						exact
						path="/game/new"
						render={ (routeProps) => {
							let formData = {
								...routeProps.location.state,
								roomCode: generateRoomCode(),
							}
							return this.joinLobby(formData, CREATE_AND_JOIN_LOBBY);
						}}
					/>
					<Route
						exact
						path="/game/:id/join"
						render={(routeProps) => {
							return this.joinLobby(routeProps.location.state, JOIN_LOBBY);
						}}
					/>

					<Route
						exact
						path="/game/:roomCode"
						render={(routeProps) => this.verifyProps(routeProps.location.state, GameWrapper)}
	
					/>

				</Switch>
				{/* <Debug /> */}
				
			</Router>
		
		);
	}
}

export default Root;
