import styled from 'styled-components';


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

export const NumberTaskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const NumberTaskPrompt = styled.h2`
    font-family: "Bitmap";
    font-size: 2rem;
    text-align: center;
    color: black;

`;

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


// Vote View

export const PlayerVoteCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 50px;
`;

export const PlayerVoteCardStyles = styled.div`
    background-color: ${props => props.voted ? '#44a133' : '#505050' };
    padding: 6px;
    margin: 5px;
    min-width: 110px;
    min-height: 110px;
  
    
    border-radius: 10px;
    &:hover{
        background-color: "#8af078";
        cursor: pointer;
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

