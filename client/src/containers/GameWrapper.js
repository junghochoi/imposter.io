import React , { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../views/Loading';
import Lobby from '../views/Lobby';

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


    if (lobbyExists === null) {
        return <Loading />
    } else if (lobbyExists === false) {
        return <Redirect to='/' />
    } else {
        return <Lobby {...props} playerName={playerName}/>
    }


}

export default GameWrapper
