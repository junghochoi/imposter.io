import React, { useState, useEffect, useRef } from 'react';
import {
    SEND_ANSWER,
} from '../../Events';
import { NUMBERS_TASK } from '../../Views'
import socket from '../../Socket';

import { TaskContainer, TaskPrompt, NumberButton } from '../../styled/GameStyles';


function NumbersTask(props) {
    const [answer, setAnswer] = useState(5);
    const answerRef = useRef(answer);

    useEffect(() => {
        answerRef.current = answer;
    }, [answer]);
    
    useEffect(() => {
        return (() => {
            let responseObj = {
                answer: answerRef.current,
                currPlayer: props.gameState.currPlayer,
                task: NUMBERS_TASK,
            }
            // let responseObj = Object.assign({answer: answerRef.current}, props.gameState.currPlayer);
            socket.emit(SEND_ANSWER, props.roomCode, responseObj);
        });
    }, [props.gameState.currPlayer, props.roomCode]);


    let buttons = [];
    for(let i = 1; i <= 10; i++){
        const b = <NumberButton key={i} onClick={()=>setAnswer(i)} selected={answer===i}>{i}</NumberButton>
        buttons.push(b);
    }

    let prompt;
    if (props.currQuestion !== null){
        if(props.gameState.currPlayer.imposter) {
            prompt = 'You are the imposter, pick a number and DEFEND YOUR SELF'
        } else{
            prompt = props.currQuestion;
        }
    }
  

    return (
        
        <TaskContainer>
            <TaskPrompt>{prompt}</TaskPrompt>
            <div>{ buttons }</div>
        </TaskContainer>
        
    )
}

export default NumbersTask
