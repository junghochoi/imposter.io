import React, { useEffect } from 'react'

function PlayerRole(props) {

    useEffect(() => {
        setTimeout(props.switchViews, 3000);
    }, [])
  

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
