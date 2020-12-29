import React from 'react'
import { PlayerCard }  from '../../styled/LobbyMenuStyles'
function PlayerContainer(props) {

    const namesList = props.players.map(playerObj => {
        return <PlayerCard key={playerObj.socketId} host={playerObj.host}>{playerObj.playerName}</PlayerCard>
    });
    return (
        <div>
            <h5>{props.currPlayer === null ? '' : props.currPlayer.playerName}</h5>
            <ul>{namesList}</ul>
        </div>
    )
}

export default PlayerContainer
