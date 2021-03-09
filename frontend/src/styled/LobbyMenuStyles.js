import styled from 'styled-components';
export const LobbyMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;
    
`;

export const LobbyMenuDisplay = styled.div`
    display:flex;
    justify-content: center;
    /* margin: 0 100px; */
`;

export const SettingsContainerStyles = styled.div`
    /* border: 1px solid #000; */
    padding: 10px;
    background-color: #c5c5c5;
    margin: 0 10px;
    border-radius: 5px;
`;

export const SettingOption = styled.div`
    display:flex;
    justify-content: space-between;
    background: #333;
    padding: 10px;
    color:white;
    
`;

export const PlayersContainerStyles = styled.div`
    /* border: 1px solid #000; */
    background: #d5d4d4;
    padding: 10px;
    margin: 0 10px;
    min-width: 140px;
    border-radius: 5px;

`;



export const PlayerCard = styled.div`
    color: ${props => props.host ? "red" : "black"};
    padding: 5px 8px;
    border: 1px solid #000;
    border-radius: 10px;
    font-size: 18px;
    margin: 3px;
`;

export const StartButton = styled.button`
// STUFF TO CHANGE ---- if we want to use props
    background: #4c4c4c;
    color: #fff;
    box-shadow: 0 3px 0 #333333;
    border-radius: 20em;

    max-width: 200px;
    

    &:hover {
        background: #747373;
    }
    &:active,
    &:focus {
        background: #444444;
    }

    //-------
    border: 2px solid transparent;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    margin: 7px;
    padding: 15px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    outline: none;
    position: relative;
    top: 0;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.2s ease-in-out 0s;
    -moz-transition: all 0.2s ease-in-out 0s;
    -ms-transition: all 0.2s ease-in-out 0s;
    transition: all 0.2s ease-in-out 0s;
`;
