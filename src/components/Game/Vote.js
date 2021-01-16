


import React, { useState, useEffect, useRef } from 'react';
import Loading from '../../views/Loading';
import socket from '../../Socket';
import { PlayerVoteCardContainer } from '../../styled/GameStyles';
import  PlayerVoteCard  from '../Game/PlayerVoteCard';
import { Container, Heading, Underline  } from '../../styled/Lib';
import Timer from './Timer';

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
            socket.emit(SEND_VOTES, props.roomCode, socket.id, voteArrRef.current, 50, false);
            socket.off(SHOW_ANSWERS);
        }
    }, [props.roomCode]);

    useEffect(() => {
        voteArrRef.current = voteArr;
    }, [voteArr]);

 
    
    let castVote = (e) => {
        
        let newVoteArr = [...voteArr];
        newVoteArr.push(e.currentTarget.dataset.vote)
        
        if (newVoteArr.length > props.gameState.settings.numImposters){
            newVoteArr.shift()  
        }
        voteArrRef.current = newVoteArr;
     
        setVoteArr(newVoteArr);
    }


    const playerVoteCards =  responses.map(e => {
        const content = {
            playerName: e.currPlayer.playerName,
            answer: e.answer,
            task: e.task,
        }
      
        return (      
            <span key={e.currPlayer.socketId}  data-vote={e.currPlayer.socketId} onClick={castVote} >
                <PlayerVoteCard 
                    voted={voteArr.includes(e.currPlayer.socketId)} 
                    content={content}
                />
            </span>
        )
    });
    

    let crewmatePrompt = '';
    
    if (props.currQuestion !== null) {
        console.log(props.currQuestion)
        crewmatePrompt = props.currQuestion.original === undefined ? props.currQuestion : props.currQuestion.original;
    } 
    if (receivedRes) {
        return (
            <>
            <Container>
                <Heading><Underline>Crewmate Prompt</Underline></Heading>
                <Heading>{crewmatePrompt}</Heading>
                <PlayerVoteCardContainer>
                    {playerVoteCards}
                </PlayerVoteCardContainer>
            </Container>
            <Timer timer={props.timer}/>
            </>
            
        ) 
        
    }
    
    return <Loading /> ;
}

export default Vote


