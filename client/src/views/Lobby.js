import React, { Component } from "react";
import socket from "../Socket";
import { 
	LEAVE_LOBBY, 
	UPDATE_PLAYER_LIST, 
	GET_PLAYER_LIST,
} from "../Events";

import { Container, Heading } from '../styled/Lib';
import PlayerContainer from '../components/Lobby/PlayerContainer';
import SettingsContainer from '../components/Lobby/SettingsContainer';
import { LobbyMenuContainer } from "../styled/LobbyMenuStyles";


export class Lobby extends Component {

	constructor(props) {
		super(props)
	
		this.state = {
			currPlayer: null,
			players: [],
			isHost: false,
		}
	}
	

	componentDidMount() {

		socket.emit(GET_PLAYER_LIST, this.props.roomCode, (players)=>{
			const currPlayer = players.find(socketObj => socketObj.socketId === socket.id);
			this.setState({
				currPlayer: currPlayer,
				players: players,
				isHost: currPlayer.host,
			})
		});
	
	
		socket.on(UPDATE_PLAYER_LIST, (players)=>{
			this.setState((prevState) => ({
				...prevState,
				players: players
			}));
		});
	
	
	}
	componentWillUnmount() {
        const roomCode  = this.props.roomCode;
		socket.emit(LEAVE_LOBBY, roomCode);
	}




	render() {

		// const isHost = this.state.currPlayer === null ? false : this.state.currPlayer.host;
		return (
			<Container>
				<Heading>Imposter.io</Heading>
				<LobbyMenuContainer>
					
					<SettingsContainer roomCode={this.props.roomCode} isHost={this.state.isHost}/>
					<PlayerContainer  roomCode={this.props.roomCode} currPlayer={this.state.currPlayer} players={this.state.players}/>
               
				</LobbyMenuContainer>
				{/* <LobbyMenu {...this.props}/> */}
			</Container>
		);
	}
}

export default Lobby;
