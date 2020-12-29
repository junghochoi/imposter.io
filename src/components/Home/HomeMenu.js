import React, { useState } from 'react'
import { HomeMenuContainer, MenuInput, MenuLinkButton } from '../../styled/HomeMenuStyles';



function HomeMenu() {

    const [playerName, setPlayerName] = useState('');
    const [roomCode, setRoomCode] = useState('');

    return (
        <HomeMenuContainer>
            <MenuInput
                type="text" name="playerName" placeholder="Name"autoComplete="off"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
            />
            <MenuInput 
                type="text" name="roomCode" placeholder="Room Code" autoComplete="off"
                value={roomCode}
                onChange={e => setRoomCode(e.target.value)}
            />
            
            <MenuLinkButton
                to={{
                    pathname: "/game/new",
                    state: {
                        playerName: playerName,
                    },
                }}
            >
                Create new Lobby
            </MenuLinkButton>

            <MenuLinkButton
                to={{
                    pathname: `/game/${roomCode}/join`,
                    state:{
                        playerName: playerName,
                        roomCode: roomCode
                    }
                }}
            >    
                Join Lobby
            </MenuLinkButton>
        </HomeMenuContainer>
    )
}

export default HomeMenu
