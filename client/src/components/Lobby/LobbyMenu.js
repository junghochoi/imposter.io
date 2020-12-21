import React, { Component } from 'react'
import PlayerContainer from './PlayerContainer';
import SettingsContainer from './SettingsContainer';

import { LobbyMenuContainer } from '../../styled/LobbyMenuStyles';

export class LobbyMenu extends Component {
    render() {
        return (
            <LobbyMenuContainer>

                <SettingsContainer roomCode={this.props.roomCode}/>
                <PlayerContainer  roomCode={this.props.roomCode} />
               
            </LobbyMenuContainer>
        )
    }
}

export default LobbyMenu
