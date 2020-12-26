import React, { Component } from "react";
import socket from "../Socket";
import {
	UPDATE_PLAYER_LIST,
	GET_PLAYER_LIST,
	START_GAME,
	SUBMIT_LOBBY_SETTINGS,
	GET_LOBBY_SETTINGS,
	UPDATE_LOBBY_SETTINGS
} from "../Events";

import { Container, Heading } from "../styled/Lib";
import PlayerContainer from "../components/Lobby/PlayerContainer";
import SettingsContainer from "../components/Lobby/SettingsContainer";
import { LobbyMenuContainer } from "../styled/LobbyMenuStyles";

export class Lobby extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currPlayer: null,
			players: [],
			isHost: false,
			settings: {
				numImposters: 1,
				numTasks: 3,
				numRounds: 3,
			},
		};
	}

	componentDidMount() {
		socket.emit(GET_PLAYER_LIST, this.props.roomCode, (players) => {
			const currPlayer = players.find(
				(socketObj) => socketObj.socketId === socket.id
			);
			this.setState({
				currPlayer: currPlayer,
				players: players,
				isHost: currPlayer === undefined ? false : currPlayer.host,
			});
		});
		socket.on(UPDATE_PLAYER_LIST, (players) => {
			this.setState((prevState) => ({
				...prevState,
				players: players,
			}));
		});

		socket.emit(GET_LOBBY_SETTINGS, this.props.roomCode, (settings)=>{
            this.setState(settings);
        });
        socket.on(UPDATE_LOBBY_SETTINGS, (settings)=>{
			console.log("UPDATE_LOBBY_SETTINGS");
            this.setState((prevState) => ({
				...prevState,
				settings			
			}));
        })
	}
	
	handleSettingsChange = (e) => {
		console.log("handleSettingsChange");
		this.setState(
			(prevState) => ({
				...prevState,
				settings: {
					...prevState.settings,
					[e.target.name]: e.target.value,
				},
			}),
			() => {
			
				socket.emit(
					SUBMIT_LOBBY_SETTINGS,
					this.props.roomCode,
					this.state.settings
				);
			}
		);
	};

	emitStartGame = () => {
		socket.emit(START_GAME, this.props.roomCode, this.state.settings.numImposters);
	};

	render() {
		// const isHost = this.state.currPlayer === null ? false : this.state.currPlayer.host;
		return (
			<Container>
				<Heading>Imposter.io</Heading>
				<LobbyMenuContainer>
					<SettingsContainer
						roomCode={this.props.roomCode}
						isHost={this.state.isHost}
						settings={this.state.settings}
						handleSettingsChange={this.handleSettingsChange}
					/>
					<PlayerContainer
						roomCode={this.props.roomCode}
						currPlayer={this.state.currPlayer}
						players={this.state.players}
					/>
					<button
						onClick={this.emitStartGame}
						disabled={!this.state.isHost}
					>
						Start Game
					</button>
				</LobbyMenuContainer>
			</Container>
		);
	}
}

export default Lobby;
