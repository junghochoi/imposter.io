import React, { Component } from 'react'
import socket from '../../Socket';
import { GET_LOBBY_SETTINGS, UPDATE_LOBBY_SETTINGS, SUBMIT_LOBBY_SETTINGS } from '../../Events';  
import { SettingOption } from '../../styled/LobbyMenuStyles';
export class SettingsContainer extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            numImposters: 1,
            numTasks: 3,
            numRounds: 3
        }
    }
    
    componentDidMount() {
        socket.emit(GET_LOBBY_SETTINGS, this.props.roomCode, (settings)=>{
            this.setState(settings);
        });

        socket.on(UPDATE_LOBBY_SETTINGS, (settings)=>{
            this.setState(settings);
        })
    }

    
    handleSettingsChange = (e) => {
        this.setState(prevState => ({
            ...prevState,
            [e.target.name]:  e.target.value
        }),() => {
            const newSettings = this.state
            console.log(this.props.roomCode);
            socket.emit(SUBMIT_LOBBY_SETTINGS, this.props.roomCode, newSettings);
        });
        
    }

    render() {
        return (
            <div>
                <h2>Room Code: {this.props.roomCode}</h2>
                
                <SettingOption>
                    <label>Num Imposters</label>
                    <select 
                        name='numImposters' 
                        value={this.state.numImposters} 
                        onChange={e=>this.handleSettingsChange(e)}
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
                        value={this.state.numTasks} 
                        onChange={e=>this.handleSettingsChange(e)}
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
                        value={this.state.numRounds} 
                        onChange={e=>this.handleSettingsChange(e)}
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