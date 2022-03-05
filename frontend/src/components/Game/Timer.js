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
    animation-duration: ${props => props.sec}ms;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    transform-origin: left center;
    animation-fill-mode: forwards;
`
function Timer(props) {
    console.log(props.timer);
    return (
        <Bar  sec={props.timer}/>
    )
}

export default Timer
