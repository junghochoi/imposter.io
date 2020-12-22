import React, { Component } from 'react'
import PlayerRole from '../components/Game/PlayerRole';

import { GET_PLAYER_LIST, GET_LOBBY_SETTINGS } from '../Events';
import { shuffleAndPick } from '../Utilities';
import socket from '../Socket';

export class Game extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            settings: {
                numImposters: 1,
                numTasks: 3,
                numRounds: 3,
            },
            views:{
                 playerRole: true,
                 voteView: false,
                 numberTaskView: false,
                 drawingTaskView: false,
                 finalVoteView: false,
            },
            imposters: [],
            players: [],
            currPlayer: null
        }
    }
    componentDidMount() {
        
		socket.emit(GET_PLAYER_LIST, this.props.roomCode, (players)=>{
            socket.emit()
            const currPlayer = players.find(socketObj => socketObj.socketId === socket.id);
            let imposters = shuffleAndPick(players);
            
            
		});
    }
    
    render() {

        let content = null;
        if (this.state.playerRole) {
            content = <PlayerRole />
        }

        return (
            <div>
                Game Screen {this.props.playerName}
            </div>
        )
    }
}

export default Game
