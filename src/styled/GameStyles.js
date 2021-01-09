import styled from 'styled-components';
export const PlayerVoteCardStyles = styled.li`

    color: ${props => props.voted ? "red" : "black"};
`;
