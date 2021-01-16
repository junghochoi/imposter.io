import React,  { useEffect, useRef } from 'react'
import Timer from './Timer';
import socket from '../../Socket';
import { SEND_ANSWER } from '../../Events';

import { DRAWING_TASK } from '../../Views';
import { DrawingCanvas, TaskContainer } from '../../styled/GameStyles'
import {FaUndo} from 'react-icons/fa'; 
import { TaskPrompt } from '../../styled/GameStyles';
import { Button, Centered } from '../../styled/Lib';
function DrawingTask(props) {
    const brushSettings =  {
        color: "#ffc600",
        width: 400,
        height: 400,
        brushRadius: 2,
        lazyRadius: 0,
    }

    let drawingCanvas = useRef();

    useEffect(() => {


        const canvas = drawingCanvas.current
        return () => {
            let responseObj = {
                answer: canvas.getSaveData(),
                currPlayer: props.gameState.currPlayer,
                task: DRAWING_TASK
            }
            
            socket.emit(SEND_ANSWER, props.roomCode, responseObj);
        }
    }, [props.gameState.currPlayer, props.roomCode]);
    

    let prompt;
    if (props.currQuestion !== null){

        if(props.gameState.currPlayer.imposter) {
            prompt = props.currQuestion.modified
        } else{
            prompt = props.currQuestion.original;
        }
    }
    return (
        <>
        <TaskContainer>
            <TaskPrompt>{prompt}</TaskPrompt>

            <DrawingCanvas
                ref = {drawingCanvas}
                hideGrid
                brushRadius={brushSettings.brushRadius}
                lazyRadius={brushSettings.lazyRadius}
            />
            

            <Button onClick={()=> drawingCanvas.current.undo()}>
                <FaUndo />
            </Button>
     
        </TaskContainer>
        
        <Timer timer={props.timer}/>
        </>
     
    )
}

export default DrawingTask
