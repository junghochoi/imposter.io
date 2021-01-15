import React from 'react'
import styled, { keyframes } from 'styled-components';
 

const countDownAnimation = keyframes`
    to {
        transform: scaleX(0);
    }
`;
const Bar = styled.div`
        
    height: 25px;
    background: linear-gradient(to bottom, red, #900);


    animation-name: ${countDownAnimation};
    animation-duration: 3s;
    /* animation-duration: ${props => props.timer}; */
    animation-iteration-count: 1;
    transform-origin: left center;
`
function Timer(props) {



    return (
        <Bar  timer={props.timer}/>
    )
}

export default Timer
