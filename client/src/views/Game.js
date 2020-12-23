import React, { Component } from 'react'
import PlayerRole from '../components/Game/PlayerRole';

import { GET_PLAYER_LIST, GET_LOBBY_SETTINGS } from '../Events';
import { pickUniqueNumbers } from '../Utilities';
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
            socket.emit(GET_LOBBY_SETTINGS, this.props.roomCode, (settings) => {
                let imposters = [];
                const imposterInd = pickUniqueNumbers(players.length, settings.numImposters);
                players.forEach(playerObj => playerObj.imposter = false);
                imposterInd.forEach(ind => {
                    players[ind].imposter = true;
                    imposters.push(players[ind]);
                });
                const currPlayer = players.find(socketObj => socketObj.socketId === socket.id);

                console.log(currPlayer);
                console.log(settings);
                console.log(imposters);
                console.log(players);


                this.setState({
                    currPlayer : currPlayer,
                    settings: settings,
                    imposters: imposters,
                    players: players
                });
            });

		});
    }
    
    render() {

        let content = null;
        if (this.state.views.playerRole) {
            console.log(this.state.currPlayer);
            content = <PlayerRole currPlayer={this.state.currPlayer}/>
        }

        return (
            <div>
                Game Screen {this.props.playerName} - 
                {content}
            </div>
        )
    }
}

export default Game
