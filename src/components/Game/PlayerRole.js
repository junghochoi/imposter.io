import React, { useEffect } from 'react'
import {
    PLAYER_ROLE 
} from '../../Views';

function PlayerRole(props) {


    useEffect(() => {
        console.log("playerRole useEffect")
        setTimeout(props.switchView, 2000, PLAYER_ROLE);
        
    }, []);

    let statement = "";
    if (props.gameState.currPlayer !== null) {
        console.log(props.gameState.currPlayer);
        let role =  props.gameState.currPlayer.imposter ? 'IMPOSTER' : 'CREWMATE'
        statement = props.gameState.currPlayer.playerName +  ' , you are a ' + role;
    }
    return (
        <h1>{statement}</h1>
    )
}

export default PlayerRole
