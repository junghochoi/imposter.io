import styled from 'styled-components';
export const LobbyMenuContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;


export const SettingOption = styled.div`
    display:flex;
    justify-content: space-between;
    background: #333;
    padding: 10px;
    color:white;
`;

export const PlayerCard = styled.li`
    color: ${props => props.host ? "red" : "black"};
`;