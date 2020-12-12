import React, { Component } from 'react'
import socket from '../socket'
export class Lobby extends Component {

    constructor(props) {
        super(props)

        this.state = {
            
            players: []
        }
    }
    
    updatePlayersState = (players) => {
        this.setState({players})
    }

    componentDidMount(){
        const { id } = this.props.match.params

        socket.emit('get_current_players', id, this.updatePlayersState);

    }

    componentWillUnmount(){
        const { id } = this.props.match.params
        socket.emit("player_disconnect", id);

    }
    
    render() {

        socket.on("send_current_players", (players)=>{
            console.log("SEND_CURRENT_PLAYERS METHOD CALLED")
            console.log(players)

            this.setState({players});
        });

        const namesList = this.state.players.map((socketObj) =>
            <li key={socketObj.socketId}>{socketObj.socketId}</li>
        );

        const { id } = this.props.match.params
        return (
            <div>
                <h1>Lobby Screen</h1>
                <h2>Room Code: { id }</h2>
                <ul>
                    {namesList}
                </ul>

            </div>
        )
    }
}

export default Lobby
