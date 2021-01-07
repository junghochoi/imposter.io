import React, { Component } from 'react'
import { SettingOption } from '../../styled/LobbyMenuStyles';
export class SettingsContainer extends Component {

    


    render() {
        return (
            <div>
                <h2>Room Code: {this.props.roomCode}</h2>
                
                <SettingOption>
                    <label>Num Imposters</label>
                    <select 
                        name='numImposters' 
                        value={this.props.settings.numImposters} 
                        onChange={e=>this.props.handleSettingsChange(e)}
                        disabled={!this.props.isHost}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </SettingOption>
                <SettingOption>
                    <label>Num Tasks</label>
                    <select 
                        name='numTasks'
                        value={this.props.settings.numTasks} 
                        onChange={e=>this.props.handleSettingsChange(e)}
                        disabled={!this.props.isHost}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </SettingOption>
                <SettingOption>
                    <label>Num Rounds</label>
                    <select 
                        name='numRounds' 
                        value={this.props.settings.numRounds} 
                        onChange={e=>this.props.handleSettingsChange(e)}
                        disabled={!this.props.isHost}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </SettingOption>

            </div>
        )
    }
}

export default SettingsContainer


/*





import React, { useState, useEffect } from 'react'
import socket from '../../Socket';
import { GET_LOBBY_SETTINGS, UPDATE_LOBBY_SETTINGS } from '../../Events';  
function SettingsContainer(props) {

    const [settings, setSettings] = useState({
        numImposters: 1,
        numTasks: 3,
        numRounds: 3
    });
    console.log("SettingsContainer Mounted");


    useEffect(() => {

    }, [settings]);
   



    const handleSettingsChange = (e) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [e.target.name]:  e.target.value
        }));
    }
    return (

    )
        

}

export default SettingsContainer
*/