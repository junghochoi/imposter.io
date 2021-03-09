import React from 'react'
import styled, { keyframes } from 'styled-components';
 

const countDownAnimation = keyframes`
    to {
        transform: scaleX(0);
    }
`;
const Bar = styled.div`
        
    height: 25px;
    width: 100%;
    background: linear-gradient(to bottom, red, #900);

    position: fixed;
    left: 0;
    bottom: 0;

    animation-name: ${countDownAnimation};
    animation-duration: ${props => props.timer}ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    transform-origin: left center;
`
function Timer(props) {

    return (
        <Bar  timer={props.timer}/>
    )
}

export default Timer
