import React from 'react'
import styled from 'styled-components';
function PlayerCard(props) { 

    const PlayerCardStyles = styled.div`
        min-width: 200px;
        min-height: 200px;
        background-color: #4c4c4c;
        color: white;
        padding: 30px;
        margin: 0 5px;
    `;


    return (
        <PlayerCardStyles>
            {props.name}
        </PlayerCardStyles>
            

    )
}

export default PlayerCard;
