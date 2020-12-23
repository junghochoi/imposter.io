import React , { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../views/Loading';
import Lobby from '../views/Lobby';
import Game from '../views/Game';
import ErrorBoundary from '../containers/ErrorBoundary';

import socket from '../Socket';

import { LOBBY_EXISTS, START_GAME, LEAVE_LOBBY } from '../Events';


function GameWrapper(props) {
    const { roomCode } = props;

    const [ gameState, setGameState ] = useState({
        lobbyExists: null,
        gameStarted: false,

    });

    socket.on(START_GAME, ()=> {
        setGameState((prevState) => ({
            ...prevState,
            gameStarted: true,
        }));
    })

    
    
    useEffect(() => {
        if (gameState.lobbyExists === null) {
            socket.emit(LOBBY_EXISTS, roomCode, (exists)=>{
                setGameState((prevState) => ({
                    ...prevState,
                    lobbyExists: exists
                }));
            });
        }


        return () =>  socket.emit(LEAVE_LOBBY, roomCode);
    }, []);




    let content = null;
    if (gameState.lobbyExists === null) {
        content =  <Loading />
    } else if (gameState.gameStarted === true){
        content = <Game {...props}/>
    }else if (gameState.lobbyExists === false) {
        content =  <Redirect to='/' />
    } else if (gameState.lobbyExists === true){
        content =  <Lobby {...props} />
    }
    return (
        <ErrorBoundary>
            {content}
        </ErrorBoundary>

    );

}

export default GameWrapper
