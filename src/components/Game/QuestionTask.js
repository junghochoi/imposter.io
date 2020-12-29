import React, { useEffect } from 'react'
import {
    QUESTION_TASK
} from '../../Views';

function QuestionTask(props) {

    useEffect(() => {
        setTimeout(props.switchView, 2000, QUESTION_TASK); 
    }, []);

    return (
        <div>
            Quesiton Task
        </div>
    )
}

export default QuestionTask
