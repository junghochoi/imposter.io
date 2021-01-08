import React,  { useEffect, useRef } from 'react'
import CanvasDraw from 'react-canvas-draw';
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
        return () => {
            console.log(drawingCanvas.current.getSaveData());
        }
    }, []);
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
            <button onClick={()=> drawingCanvas.undo()}>
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
