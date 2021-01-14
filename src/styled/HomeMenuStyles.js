import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonStyles } from './Lib';
 
export const HomeMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 490px;
    margin: 0 auto;
    background: rgba(50, 50, 50, 0.5);
    border-radius: 10px;
    padding: 2em;
    `;
export const MenuInput = styled.input `
    padding: 10px 12px;
    margin: 3px;
    border: 2px solid #fff;
    background-color: #000;
    border-radius: 4px;
    color: white;
    font-size: 1.15rem;

    &:focus{
        outline: none
    }
`;
export const MenuLinkButton = styled(Link)(buttonStyles);
