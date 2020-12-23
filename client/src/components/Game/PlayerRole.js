import React from 'react'

function PlayerRole(props) {

    console.log("Mounting PlayerRole");

    let content = null;

    let statement = "";
    if (props.currPlayer !== null) {
        let role =  props.currPlayer.imposter ? 'IMPOSTER' : 'CREWMATE'
        statement = props.currPlayer.playerName +  ' , you are a ' + role;
    }
    return (
        <h1>{statement}</h1>
    )
}

export default PlayerRole
