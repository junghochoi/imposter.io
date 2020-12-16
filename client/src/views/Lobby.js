import React, { Component } from "react";
import socket from "../Socket";
import { LEAVE_LOBBY, UPDATE_PLAYER_LIST, GET_PLAYER_LIST } from "../Events";
export class Lobby extends Component {
	constructor(props) {
		super(props);

		this.state = {
			players: [],
		};
	}


	// updatePlayers = players => this.setState({players});
	componentDidMount() {
		console.log("Lobby is Mounting")
		socket.emit(GET_PLAYER_LIST, this.props.roomCode, (players)=>{
			this.setState({players});
		});
		socket.on(UPDATE_PLAYER_LIST, (players)=>{
			this.setState({players});
		});
	
	}

	componentWillUnmount() {
        console.log("Lobby Unmounting")
        const roomCode  = this.props.roomCode;
    
		socket.emit(LEAVE_LOBBY, roomCode);
	}

	render() {
		const namesList = this.state.players.map((socketObj) => (
			<li key={socketObj.socketId}>{socketObj.socketId}</li>
		));
		const roomCode = this.props.roomCode;

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
