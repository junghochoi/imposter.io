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

    
    let content = null;
    if (props.content.task === DRAWING_TASK){
        content = <CanvasDraw 
                style={{
                    border: "1px solid #272727"
                }}
                hideInterface
                hideGrid
                disabled
                saveData = {props.content.answer}
                canvasWidth={canvasSettings.width}
                canvasHeight={canvasSettings.height}
                brushRadius={0}
                lazyRadius={0}

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
