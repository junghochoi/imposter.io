import React,  { useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw';
import { SEND_ANSWER } from '../../Events';
import socket from '../../Socket';
import { DRAWING_TASK } from '../../Views';
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
    return (
        <div>
            Drawing Task
            <CanvasDraw
                style={{
                    border: "1px solid #272727"
                }}
                ref = {drawingCanvas}
                // ref = {drawingCanvas}
                brushRadius={brushSettings.brushRadius}
                lazyRadius={brushSettings.lazyRadius}
            />
            <button onClick={()=> drawingCanvas.current.undo()}>
                Undo
            </button>
            <button onClick={() => console.log(drawingCanvas.current.getSaveData())}>
                Save
            </button>
            <button onClick={() => console.log(drawingCanvas.current)}>
                Test
            </button>
        </div>

     
    )
}

export default DrawingTask
