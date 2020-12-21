import React from 'react'
function PlayerContainer(props) {

    const namesList = props.players.map(playerObj => {
        return <li key={playerObj.socketId}>{playerObj.playerName}</li>
    });
    return (
        <div>
            <h5>{props.currPlayer === null ? '' : props.currPlayer.playerName}</h5>
            <ul>{namesList}</ul>
        </div>
    )
}

export default PlayerContainer
