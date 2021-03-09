import React, { useState, useEffect, useRef } from 'react'
import Timer from './Timer';
import socket from '../../Socket';
import { Container, Heading, Underline } from '../../styled/Lib';
import { PlayerVoteCardContainer } from '../../styled/GameStyles';
import PlayerVoteCard from './PlayerVoteCard';
import {
    SEND_VOTES 
} from '../../Events';

function FinalVote(props) {

    const [voteArr, setVoteArr] = useState([]);
    const voteArrRef = useRef(voteArr);

    useEffect(() => {
        return () => {
            
            socket.emit(SEND_VOTES, props.roomCode, socket.id, voteArrRef.current, 100, true)
        };
    }, [props.roomCode]);

    useEffect(() => {
        voteArrRef.current = voteArr;
    },[voteArr])
    const  castVote = (e) => {
        
        if (props.gameState.currPlayer.imposter){
            return;
        }
        let newVoteArr = [...voteArr];
        newVoteArr.push(e.currentTarget.dataset.vote)
        
        if (newVoteArr.length > props.gameState.settings.numImposters){
            newVoteArr.shift()  
        }
        voteArrRef.current = newVoteArr;
     
        setVoteArr(newVoteArr);
    }


    const players = props.gameState.players;
    const playerVoteCards = players.map(e => {
        const content = {
            playerName: e.playerName
        }

        return (      
            <span key={e.socketId}  data-vote={e.socketId} onClick={castVote} >
                <PlayerVoteCard 
                    voted={voteArr.includes(e.socketId)} 
                    content={content}
                    disabled={props.gameState.currPlayer.imposter}
                />
            </span>
        )
    });
    
    return (
        <>
        <Container>
            <Heading><Underline>Final Votes</Underline></Heading>
            <PlayerVoteCardContainer>
                {playerVoteCards}
            </PlayerVoteCardContainer>
        </Container>
        <Timer timer={props.timer}/>
        </>
        
    )
}

export default FinalVote
