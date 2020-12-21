import React, { useState } from 'react'
import socket from '../../Socket';
import { GET_PLAYER_LIST, UPDATE_PLAYER_LIST } from '../../Events';
function PlayerContainer(props) {

    const [playerState, setPlayerState] = useState({
        currPlayer: null,
        players: []
    });


    socket.emit(GET_PLAYER_LIST, this.props.roomCode, (players)=>{
        const currPlayer = players.find(socketObj => socketObj.socketId === socket.id);
        setPlayerState((prevState) => {
            return {
                ...prevState,
                currPlayer: currPlayer,
                players: players
            }
        });
    });


    socket.on(UPDATE_PLAYER_LIST, (players)=>{
        setPlayerState((prevState) => ({
            ...prevState,
            players: players
        }));
    });


    const namesList = playerState.players.map(playerObj => {
        return <li>{playerObj.playerName}</li>
    });
    return (


        <div>
            <ul>{namesList}</ul>
        </div>
    )
}

export default PlayerContainer
