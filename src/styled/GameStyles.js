import styled from 'styled-components';
export const PlayerVoteCardStyles = styled.div`

    
    background-color: ${props => props.voted ? "#44a133" : "#a3a3a3"};
    padding: 6px;
    margin: 5px;
    min-width: 100px;
    min-height: 100px;
  
    
    border-radius: 10px;
    &:hover{
        background-color: "#8af078";
        cursor: pointer;
    }
        
    
`;


export const PlayerVoteCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 50px;
    
    
`;