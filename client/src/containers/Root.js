import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import socket from "../Socket";

import HomeScreen from "../views/Home";
import LobbyScreen from "../views/Lobby";
import Debug from "../dev/Debug";
import { JOIN_LOBBY } from '../Events';
import { generateRoomCode } from '../Utilities';

export class Root extends Component {
	createLobbyAndRedirect = () => {
		const roomCode = generateRoomCode(); // Randomly Generate Unique code
		socket.emit(JOIN_LOBBY, roomCode);
		return <Redirect to={`/game/${roomCode}`} />;
    };

    joinLobbyAndRedirect = (roomCode) => {
        
    }

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={HomeScreen} />

					<Route exact path="/game/new" render={this.createLobbyAndRedirect} />
                    <Route exact path="/game/:id/join" render={this.joinLobbyAndRedirect} />
					<Route
						exact
						path="/game/:roomCode"
						component={LobbyScreen}
					/>
                
                </Switch>
				<Debug />
			</Router>
		);
	}
}

export default Root;
