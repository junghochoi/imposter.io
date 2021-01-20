import styled from 'styled-components';
import CanvasDraw from 'react-canvas-draw';


export const TaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
export const TaskPrompt = styled.h2`
    font-family: "Bitmap";
    font-size: 2rem;
    text-align: center;
    color: black;

`;

// Player Role View
export const PlayerRoleName = styled.h3`
    font-family: "Bitmap";
    font-size: 2rem;
    text-align: center;
    color: black;

`;

export const PlayerRoleReveal = styled.h1`
    text-align: center;
    font-family: "Bitmap";
    font-size: 5rem;
    color: ${props => props.imposter ? '#cf1d1d' : '#31dec1'};
    text-shadow: 3px 3px 50px ${props=>props.imposter ? '#cf1d1d' : '#31dec1' };
    

`;

// Number Task View



export const NumberButton = styled.button` 
    background-color: ${props => props.selected  ? '#44a133' : '#505050'}; /* Green */
    font-family: "Bitmap";
    border: none;
    color: white;
    width: 60px;
    height: 60px;
    text-align: center;
    text-decoration: none;
    font-size: 1.5rem;
    &:hover{
        cursor: pointer;
    }
    &:focus{
        outline: none;
    }
`;

//Drwaing Task


export const DrawingTaskContainer = styled.div`
    display: flex;
    align

`;
export const DrawingCanvas = styled(CanvasDraw)`
    border: 1px solid #272727;
    margin: 0 auto;
`




// Vote View

export const PlayerVoteCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 50px;
`;

export const PlayerVoteCardStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: ${props => props.voted ? '#44a133' : '#505050' };
    padding: 6px;
    margin: 5px;
    min-width: 110px;
    min-height: ${props => props.half ? "55px" : "110px"};
    
  
    
    border-radius: 10px;
    &:hover{
        background-color: "#8af078";
        cursor: ${props => props.disabled ?  "default" : "pointer"};
    }
`;

export const PlayerVoteName = styled.div`
    font-family: "Bitmap";
    font-size: 1.5rem;
    margin: 8px;
    text-align: center;
    color: white;
`;

export const PlayerVoteAnswer = styled.div`
    font-family: "Bitmap";
    text-decoration: underline;
    padding: 3px;
    color: white;
    text-align: center;
    font-size: 2rem;

`;

//EndGame

export const ImposterResultContainer = styled.div`
    display:flex;
    justify-content: space-around;

`

export const ImposterResultCard = styled.div`
    display: ${props => props.hidden ? "hidden" : "block"};
    text-decoration: ${props => props.votedOff ? "line-through" : "none"};
    font-size: 1.8rem;
    font-family: "Bitmap";
    text-align: center;
    padding: 5px 10px;
    margin: 0 10px;
    color: #cf1d1d;
    text-shadow: 10px 10px 50px #cf1d1d;

`;

