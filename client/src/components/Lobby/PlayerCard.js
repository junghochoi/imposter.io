import React from 'react'
import styled from 'styled-components';
function PlayerCard(props) { 

    const PlayerCardStyles = styled.div`
        width: 60px;
        height: 60px;
        background-color: #4c4c4c;
        color: white;
        padding: 10px;
        margin: 0 5px;
    `;


    return (
        <PlayerCardStyles>
            {props.name}
        </PlayerCardStyles>
            

    )
}

export default PlayerCard;
