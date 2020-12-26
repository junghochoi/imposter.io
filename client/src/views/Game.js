import React, { Component } from "react";
import PlayerRole from "../components/Game/PlayerRole";

import {
	GET_PLAYER_LIST,
	GET_LOBBY_SETTINGS,
	PICK_IMPOSTERS,
	GET_IMPOSTERS,
} from "../Events";
import socket from "../Socket";

export class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			settings: {
				numImposters: 1,
				numTasks: 3,
				numRounds: 3,
			},
			views: {
				playerRole: true,
				voteView: false,
				numberTaskView: false,
				drawingTaskView: false,
				finalVoteView: false,
			},
			players: [],
			currPlayer: null,
		};
	}

	gameInit = () => {
		socket.emit(GET_LOBBY_SETTINGS, this.props.roomCode, (settings) => {
			socket.emit(GET_PLAYER_LIST, this.props.roomCode, (players) => {
				const currPlayer = players.find(
					(socketObj) => socketObj.socketId === socket.id
				);
				this.setState({
					currPlayer: currPlayer,
					settings: settings,
					players: players,
				});
			});
		});
    };
    
	componentDidMount() {
		this.gameInit();
	}

	render() {
		let content = null;
		if (this.state.views.playerRole) {
			content = <PlayerRole currPlayer={this.state.currPlayer} />;
		}

        return content; 
	}
}

export default Game;
