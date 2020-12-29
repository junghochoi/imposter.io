import React, { useEffect } from 'react';
import {
    NUMBERS_TASK,
} from '../../Views'


function NumbersTask(props) {

    useEffect(() => {
        setTimeout(props.switchView, 2000, NUMBERS_TASK); 
    }, []);

    return (
        <div>
            Number tasks
        </div>
    )
}

export default NumbersTask
