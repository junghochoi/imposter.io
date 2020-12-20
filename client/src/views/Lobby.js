import React, { Component } from "react";
import socket from "../Socket";
import { 
	LEAVE_LOBBY, 
	UPDATE_PLAYER_LIST, 
	GET_PLAYER_LIST,
	UPDATE_LOBBY_SETTINGS,
	GET_LOBBY_SETTINGS,
	SUBMIT_LOBBY_SETTINGS } from "../Events";

import { Container, Heading, LobbyMenu, SettingsContainer } from '../styled/Lib';
import PlayerCard from '../components/PlayerCard';


export class Lobby extends Component {
	constructor(props) {
		super(props);

		this.state = {
			settings: {
				numImposters: 1,
				numTasks: 3,
				numRounds: 3
			}, 
			currPlayer: null,
			players: [],
		};
	}

	componentDidMount() {


		
		socket.emit(GET_PLAYER_LIST, this.props.roomCode, (players)=>{
			const currPlayer = players.find(socketObj => socketObj.socketId === socket.id);
			this.setState((prevState) => {
				return {
					...prevState,
					currPlayer: currPlayer,
					players: players
				}
			});
		});
		socket.emit(GET_LOBBY_SETTINGS, this.props.roomCode, (settings)=>{
			this.setState((prevState) => {
				return {
					...prevState,
					settings: settings
				}
			});
		});

		socket.on(UPDATE_PLAYER_LIST, (players)=>{
			this.setState({players});
		});
		socket.on(UPDATE_LOBBY_SETTINGS, (settings)=>{
			this.setState({settings});
		})
	
	}
	componentWillUnmount() {
        const roomCode  = this.props.roomCode;
		socket.emit(LEAVE_LOBBY, roomCode);
	}


	handleSettingChange = (event) => {
		this.setState((prevState) => {
			return {
				...prevState,
				settings: {
					...prevState.settings,
					[event.target.name]: event.target.value,
				}
			}
		}, () => {
			socket.emit(SUBMIT_LOBBY_SETTINGS, this.props.roomCode, this.state.settings );
		});
		

    };

	render() {
		const namesList = this.state.players.map((socketObj) => (
			<PlayerCard key={socketObj.socketId} name={socketObj.playerName} />
		));
		const roomCode = this.props.roomCode;

		return (
			<Container>
				<Heading>Imposter.io</Heading>
				<LobbyMenu>
					<Container>
						<h2>Room Code: {roomCode}</h2>
						<h3>Current Player:  {this.state.currPlayer === null  ?  "unknown" : this.state.currPlayer.playerName}</h3>
						
						
						<SettingsContainer>
							<label>Num Imposters</label>
							<select 
								name='numImposters' 
								value={this.state.settings.numImposters.toString()} 
								onChange={this.handleSettingChange}
								disabled={this.state.currPlayer === null ? true : !this.state.currPlayer.host}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
							</select>
							<label>Num Tasks</label>
							<select 
								name='numTasks'
								value={this.state.settings.numTasks.toString()} 
								onChange={this.handleSettingChange}
								disabled={this.state.currPlayer === null ? true : !this.state.currPlayer.host}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
							<label>Num Rounds</label>
							<select 
								name='numRounds' 
								value={this.state.settings.numRounds.toString()} 
								onChange={this.handleSettingChange}
								disabled={this.state.currPlayer === null ? true : !this.state.currPlayer.host}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</SettingsContainer>
						
					</Container>

					<Container>
						<ul>{namesList}</ul>
					</Container>
				</LobbyMenu>

				
				


			</Container>
			

			
		);
	}
}

export default Lobby;
