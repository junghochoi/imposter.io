import React from 'react'
import { PlayerVoteCardStyles, PlayerVoteName, PlayerVoteAnswer } from '../../styled/GameStyles';
import CanvasDraw from 'react-canvas-draw';
import {
    DRAWING_TASK,
    QUESTION_TASK,
    NUMBERS_TASK,
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
    } else if (props.content.task === QUESTION_TASK || props.content.task === NUMBERS_TASK) {
        content = <PlayerVoteAnswer>{props.content.answer}</PlayerVoteAnswer>
    } 
    
    if (content === null){
        return (
            <PlayerVoteCardStyles key={props.key} voted={props.voted} disabled={props.disabled} half>
                <PlayerVoteName>{props.content.playerName}</PlayerVoteName> 
            </PlayerVoteCardStyles>
        )
    } else {
        return (
            <PlayerVoteCardStyles key={props.key} voted={props.voted} disabled={props.disabled}>
                <PlayerVoteName>{props.content.playerName}</PlayerVoteName> 
                {content}
            </PlayerVoteCardStyles>
        )
    }

}

export default PlayerVoteCard
