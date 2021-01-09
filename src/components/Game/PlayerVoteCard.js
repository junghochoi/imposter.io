import React from 'react'
import { PlayerVoteCardStyles } from '../../styled/GameStyles';
import CanvasDraw from 'react-canvas-draw';
import {
    DRAWING_TASK,
    NUMBERS_TASK,
    QUESTION_TASK
} from '../../Views';

function PlayerVoteCard(props) {
    const canvasSettings =  {
        width: 120,
        height: 120,
    }

    console.log(props);
    let content = null;
    if (props.content.task === DRAWING_TASK){
        content = <CanvasDraw  
                disabled
                saveData = {props.content.answer}
                width ={canvasSettings.width}
                height={canvasSettings.height} 

            />
    } else {
        content = <h5>{props.content.answer}</h5>
    }

    return (
        <PlayerVoteCardStyles key={props.key} voted={props.voted}>
            {props.content.playerName}
            {content}
        </PlayerVoteCardStyles>
    )
}

export default PlayerVoteCard
