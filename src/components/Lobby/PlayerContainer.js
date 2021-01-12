import React from 'react'
import { PlayersContainerStyles, PlayerCard }  from '../../styled/LobbyMenuStyles'
function PlayerContainer(props) {

    const namesList = props.players.map(playerObj => {
        return <PlayerCard key={playerObj.socketId} host={playerObj.host}>{playerObj.playerName}</PlayerCard>
    });
    return (
        <PlayersContainerStyles>
            
            {namesList}
        </PlayersContainerStyles>
    )
}

export default PlayerContainer
