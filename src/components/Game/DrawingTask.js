import React, { useEffect } from 'react'
import {
    DRAWING_TASK
} from '../../Views';
function DrawingTask(props) {

    useEffect(() => {
        setTimeout(props.switchView, 2000, DRAWING_TASK); 
    }, []);
    return (
        <div>
            Drawing Task
        </div>
    )
}

export default DrawingTask
