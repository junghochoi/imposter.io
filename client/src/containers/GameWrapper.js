import React , { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../views/Loading';
import Lobby from '../views/Lobby';
import ErrorBoundary from '../containers/ErrorBoundary';

import socket from '../Socket';

import { LOBBY_EXISTS } from '../Events';

function GameWrapper(props) {
    const { playerName, roomCode } = props;
    const [ lobbyExists , setLobbyExists  ] = useState(null);

    
    useEffect(() => {
        if (lobbyExists === null) {
            socket.emit(LOBBY_EXISTS, roomCode, (exists)=>{
                setLobbyExists(exists);
            });
        }
    }, [lobbyExists, roomCode]);



    let content = null;
    if (lobbyExists === null) {
        content =  <Loading />
    } else if (lobbyExists === false) {
        console.log("lobby doesn't exist")
        content =  <Redirect to='/' />
    } else {
        content =  <Lobby {...props} playerName={playerName}/>
    }
    return (
        <ErrorBoundary>
            {content}
        </ErrorBoundary>

    );

}

export default GameWrapper
