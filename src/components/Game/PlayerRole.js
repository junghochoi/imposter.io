import React  from 'react'

function PlayerRole(props) {

    let statement = "";
    if (props.gameState.currPlayer !== null) {
        
        let role =  props.gameState.currPlayer.imposter ? 'IMPOSTER' : 'CREWMATE'
        statement = props.gameState.currPlayer.playerName +  ' , you are a ' + role;
    }
    return (
        <h1>{statement}</h1>
    )
}

export default PlayerRole
