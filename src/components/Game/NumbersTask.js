import React, { useState, useEffect, useRef } from 'react';
import {
    SEND_ANSWER,
} from '../../Events';
import { NUMBERS_TASK } from '../../Views'
import socket from '../../Socket';


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
        const b = <button key={i} onClick={()=>setAnswer(i)}>{i}</button>
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
        <div>
            <h1>My response is {answer}</h1>
            <h2>{prompt}</h2>
            { buttons }
        </div>
    )
}

export default NumbersTask
