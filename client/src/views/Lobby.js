import React, { Component } from "react";
import socket from "../Socket";
import { LEAVE_LOBBY, UPDATE_PLAYER_LIST } from "../Events";
export class Lobby extends Component {
	constructor(props) {
		super(props);

		this.state = {
			players: [],
		};
	}

	componentDidMount() {
		socket.on(UPDATE_PLAYER_LIST, (players) => {
			this.setState({ players });
		});
	}

	componentWillUnmount() {
        const { roomCode } = this.props.match.params;
    
		socket.emit(LEAVE_LOBBY, roomCode);
	}

	render() {
		const namesList = this.state.players.map((socketObj) => (
			<li key={socketObj.socketId}>{socketObj.socketId}</li>
		));
		const { roomCode } = this.props.match.params;

		return (
			<div>
				<h1>Lobby Screen</h1>
				<h2>Room Code: {roomCode}</h2>
				<ul>{namesList}</ul>
			</div>
		);
	}
}

export default Lobby;
