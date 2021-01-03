


import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../views/Loading';
import socket from '../../Socket';
import { PlayerVoteCard } from '../../styled/GameStyles';

import {
    SHOW_ANSWERS,
    SEND_VOTES
} from '../../Events';
function Vote(props) {

    const [receivedRes, setReceivedRes] = useState(false);
    const [responses, setResponses] = useState([]);
    const [voteArr, setVoteArr] = useState([]);
    const voteArrRef = useRef(voteArr);
    

    useEffect(() => {
        socket.once(SHOW_ANSWERS, (res) =>{
            setReceivedRes(true);
            setResponses(res);
        });
        return () => {
            socket.emit(SEND_VOTES, props.roomCode, socket.id, voteArrRef.current);
            socket.off(SHOW_ANSWERS);
        }
    }, []);

    useEffect(() => {
        voteArrRef.current = voteArr;
    }, [voteArr]);

 
    let content = <Loading />
    let castVote = (e) => {
        let newVoteArr = [...voteArr];
        newVoteArr.push(e.target.value);
        
        if (newVoteArr.length > props.gameState.settings.numImposters){
            newVoteArr.shift()
        }
        voteArrRef.current = newVoteArr;
        setVoteArr(newVoteArr);
    }
    const playerVoteContainer =  responses.map(e => {
        return (
        <PlayerVoteCard key={e.socketId} voted={voteArr.includes(e.socketId)}>
            {e.playerName} - {e.answer}
            <button value={e.socketId} onClick={castVote}>Vote</button>
        </PlayerVoteCard>
        )
    });
    

    if (receivedRes) {
        content = (
            <ul>
                {playerVoteContainer}
            </ul>
        )
        
    }
    
    return content;
}

export default Vote


