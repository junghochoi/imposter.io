import React, { Component } from "react";
import socket from "../Socket";
import { 
	LEAVE_LOBBY, 
	UPDATE_PLAYER_LIST, 
	GET_PLAYER_LIST,
} from "../Events";

import { Container, Heading } from '../styled/Lib';
import LobbyMenu from '../components/Lobby/LobbyMenu';


export class Lobby extends Component {


	componentDidMount() {
		console.log("lobby mounting");
		console.log(this.props);
	
	}
	componentWillUnmount() {
        const roomCode  = this.props.roomCode;
		socket.emit(LEAVE_LOBBY, roomCode);
	}




	render() {
		return (
			<Container>
				<Heading>Imposter.io</Heading>
				<LobbyMenu {...this.props}/>
			</Container>
		);
	}
}

export default Lobby;
