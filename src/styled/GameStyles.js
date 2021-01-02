import styled from 'styled-components';
export const PlayerVoteCard = styled.li`

    color: ${props => props.voted ? "red" : "black"};
`;
