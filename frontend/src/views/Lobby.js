import React, { Component } from "react";
import socket from "../Socket";

import {

	START_GAME,

} from "../Events";

import { Container, Heading } from "../styled/Lib";
import PlayerContainer from "../components/Lobby/PlayerContainer";
import SettingsContainer from "../components/Lobby/SettingsContainer";
import { LobbyMenuContainer, LobbyMenuDisplay, StartButton } from "../styled/LobbyMenuStyles";


export class Lobby extends Component {
	


	emitStartGame = () => {
		socket.emit(START_GAME, this.props.roomCode);
	};

	render() {

		const { currPlayer, players, settings } = this.props.gameState;
		const isHost = currPlayer === null ? false : currPlayer.host;
		return (
			<Container>
				<Heading>Imposter.io</Heading>
				<LobbyMenuContainer>
					<LobbyMenuDisplay>
						<SettingsContainer
							roomCode={this.props.roomCode}
							isHost={isHost}
							settings={settings}
							handleSettingsChange={this.props.handleSettingsChange}
						/>
						<PlayerContainer
							roomCode={this.props.roomCode}
							currPlayer={currPlayer}
							players={players}
						/>
					</LobbyMenuDisplay>

				<StartButton
					onClick={this.emitStartGame}
					disabled={!isHost}
				>
						Start Game
				</StartButton>

				</LobbyMenuContainer>

			</Container>
		);
	}
}

export default Lobby;
