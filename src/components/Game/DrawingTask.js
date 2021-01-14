import React,  { useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw';
import { SEND_ANSWER } from '../../Events';
import socket from '../../Socket';
import { DRAWING_TASK } from '../../Views';
import { DrawingCanvas, TaskContainer } from '../../styled/GameStyles'

import { TaskPrompt } from '../../styled/GameStyles';
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
        console.log(drawingCanvas.current === null);

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
        console.log(props.currQuestion);
        if(props.gameState.currPlayer.imposter) {
            prompt = props.currQuestion.modified
        } else{
            prompt = props.currQuestion.original;
        }
    }
    return (
        <TaskContainer>
            <TaskPrompt>{prompt}</TaskPrompt>

            <DrawingCanvas
                ref = {drawingCanvas}
                hideGrid
                brushRadius={brushSettings.brushRadius}
                lazyRadius={brushSettings.lazyRadius}
            />
            

            <button onClick={()=> drawingCanvas.current.undo()}>
                Undo
            </button>
            
            
           

    
  
        </TaskContainer>

     
    )
}

export default DrawingTask
