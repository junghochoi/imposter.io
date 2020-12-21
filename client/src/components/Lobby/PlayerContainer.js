import React, { useState } from 'react'
import socket from '../../Socket';
import { GET_PLAYER_LIST, UPDATE_PLAYER_LIST } from '../../Events';
function PlayerContainer(props) {

    const [playerState, setPlayerState] = useState({
        currPlayer: null,
        players: []
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
