import React  from 'react'
import { PlayerRoleName, PlayerRoleReveal } from '../../styled/GameStyles'
function PlayerRole(props) {

   
    let role = '';
    if (props.gameState.currPlayer !== null) {
        role =  props.gameState.currPlayer.imposter ? 'IMPOSTER' : 'CREWMATE'
    }
    return (
        <>
            <PlayerRoleName>{props.gameState.currPlayer.playerName}</PlayerRoleName>
            <PlayerRoleReveal imposter={props.gameState.currPlayer.imposter}>{role}</ PlayerRoleReveal>
        </> 
        
    )
}

export default PlayerRole
