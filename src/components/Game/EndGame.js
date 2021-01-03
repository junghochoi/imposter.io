import React, { useState, useEffect } from 'react'
import {
    SHOW_RESULTS
} from '../../Events';
import socket from '../../Socket'
function EndGame() {

    console.log('ENDGAME_MOUNTED');
    const [players, setPlayers] = useState([]);
    
    useEffect(()=> {
        socket.once(SHOW_RESULTS, (playerScores) =>{
            setPlayers(playerScores);
        });
    }, [])

    console.log(players);
    const scores = players.map((playerObj) => {
        return (<li key={playerObj.socketId}>
            {playerObj.playerName} - {playerObj.score}
        </li>)
    })
    return (
        <div>
            <h1>Results</h1>
            <ul>
                {scores}
            </ul>
        </div>

    )
}

export default EndGame
