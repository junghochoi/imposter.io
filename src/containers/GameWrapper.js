import React , { Component  } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../views/Loading';
import Lobby from '../views/Lobby';
import Game from '../views/Game';
import ErrorBoundary from '../containers/ErrorBoundary';

import socket from '../Socket';

import { LOBBY_EXISTS, 
    START_GAME, 
    LEAVE_LOBBY, 
    UPDATE_PLAYER_LIST, 
    GET_PLAYER_LIST,
    GET_LOBBY_SETTINGS,
    UPDATE_LOBBY_SETTINGS,
    SUBMIT_LOBBY_SETTINGS,
    END_GAME,
} from '../Events';


export class GameWrapper extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             lobbyExists: null,
             gameStarted: false,
             gameState: {
                 currPlayer: null,
                 players: [],
                 settings: {
                     numImposters: 1,
                     numTasks: 3,
                     numRounds: 3
                 },
                 tasks: []

             }
        }
    }

    handleSettingsChange = (e) => {
		this.setState(
			(prevState) => ({
                ...prevState,
                gameState: {
                    ...prevState.gameState,
                    settings: {
                        ...prevState.gameState.settings,
                        [e.target.name]: e.target.value,
                    },
                }

			}),
			() => {
				socket.emit(
					SUBMIT_LOBBY_SETTINGS,
					this.props.roomCode,
					this.state.gameState.settings
				);
			}
		);
	};

    lobbySettingsInit = () => {

        const setPlayerState = (players) => {
            const currPlayer = players.find(
                (socketObj) => socketObj.socketId === socket.id
            );
            this.setState(prevState => ({
                ...prevState, 
                gameState: {
                    ...prevState.gameState,
                    players: players,
                    currPlayer: currPlayer
                }
            }));
        }
        const updateSettingState = settings => {
            this.setState(prevState => ({
                ...prevState,
                gameState: {
                    ...prevState.gameState,
                    settings: settings
                }
            }));
        }


        socket.emit(LOBBY_EXISTS, this.props.roomCode, (exists)=>{
            this.setState((prevState) => ({
                ...prevState,
                lobbyExists: exists
            }), () => {
                
                if (!this.state.lobbyExists) return;
                socket.emit(GET_PLAYER_LIST, this.props.roomCode, players => setPlayerState(players));
                socket.on(UPDATE_PLAYER_LIST,  players => setPlayerState(players));
                
                socket.emit(GET_LOBBY_SETTINGS, this.props.roomCode, settings => updateSettingState(settings));
                socket.on(UPDATE_LOBBY_SETTINGS, settings => updateSettingState(settings));
                
            });
        });



    }
 
    componentDidMount() {
        this.lobbySettingsInit();
        socket.on(START_GAME, (players, settings, tasks)=> {
            const currPlayer = players.find(
                (socketObj) => socketObj.socketId === socket.id
            );
            this.setState((prevState) => ({
                ...prevState,
                gameStarted: true,
                gameState: {
                    ...prevState.gameState,
                    currPlayer: currPlayer, 
                    settings: settings,
                    players: players,
                    tasks: tasks
                }
            }));
        });

        socket.on(END_GAME, ()=> {
            this.setState(prevState => ({
                ...prevState,
                gameStarted: false,
            }))
        });

        
    }

    componentWillUnmount() {
        socket.emit(LEAVE_LOBBY, this.props.roomCode);
    }
    
    render() {

        if (this.state.gameState.currPlayer === undefined) {
            console.log("currPlayer is undefined");
            return <Redirect to='/' />
        }


        let content = null;
        if (this.state.lobbyExists === null) {
            content =  <Loading />
        } else if (this.state.gameStarted === true){
            content = <Game {...this.props} gameState={this.state.gameState}/>
        } else if (this.state.lobbyExists === false) {
            content =  <Redirect to='/' />
        } else if (this.state.lobbyExists === true){
            content =  <Lobby {...this.props} gameState={this.state.gameState} handleSettingsChange={this.handleSettingsChange} />
        }
        return (
            <ErrorBoundary>
                {content}
            </ErrorBoundary>
        );

    }
}

export default GameWrapper

