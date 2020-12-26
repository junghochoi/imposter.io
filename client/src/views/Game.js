import React, { Component } from "react";
import PlayerRole from "../components/Game/PlayerRole";

import {
	GET_PLAYER_LIST,
	GET_LOBBY_SETTINGS,
	PICK_IMPOSTERS,
	GET_IMPOSTERS,
} from "../Events";

import DrawingTask from '../components/Game/DrawingTask';
import NumberTask from '../components/Game/NumbersTask';
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
				//  0 - numberTask view
				//  1 - drawingTask view
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
	
	pickRandomTask = () => {
		const upperBound = 2;
		const taskNumber =  Math.floor(Math.random() * Math.floor(upperBound));
		if (taskNumber === 0) {
			return "numberTaskView";
		} else {
			return "drawingTaskView";
		}
	}

	playerRoleToRandomTask = () => {
		const taskName =  this.pickRandomTask();
	
		this.setState( prevState => ({
			...prevState,
			views: {
				...prevState.views,
				playerRole: false,
				[taskName] : true,
			}
		}));
	}
    
	componentDidMount() {
		this.gameInit();
	}

	render() {
		let content = null;
		if (this.state.views.playerRole) {
			content = <PlayerRole currPlayer={this.state.currPlayer} switchViews={this.playerRoleToRandomTask} />;
		} else if (this.state.views.numberTaskView) {
			content = <NumberTask />
		} else if (this.state.views.drawingTaskView) {
			content = <DrawingTask />
		}

        return content; 
	}
}

export default Game;
