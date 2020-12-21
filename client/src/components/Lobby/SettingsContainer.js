import React, { useState } from 'react'
import socket from '../../Socket';
import { GET_LOBBY_SETTINGS, UPDATE_LOBBY_SETTINGS } from '../../Events';  
function SettingsContainer(props) {

    const [settings, setSettings] = useState({
        numImposters: 1,
        numTasks: 3,
        numRounds: 3
    });
    console.log(props);

    const isHost = props.currPlayer === null ? false : !props.currPlayer.host;
   
    socket.emit(GET_LOBBY_SETTINGS, this.props.roomCode, (settings)=>{
        setSettings(settings);
    });

    socket.on(UPDATE_LOBBY_SETTINGS, (settings)=>{
        setSettings({settings});
    })


    const handleSettingsChange = (e) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [e.target.name]:  e.target.value
        }));
    }
    return (
        <div>
            <h2>Room Code: {props.roomCode}</h2>
            
            
            

            <label>Num Imposters</label>
            <select 
                name='numImposters' 
                value={settings.numImposters} 
                onChange={e=>handleSettingsChange(e)}
                disabled={isHost}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <label>Num Tasks</label>
            <select 
                name='numTasks'
                value={settings.numTasks} 
                onChange={e=>handleSettingsChange(e)}
                disabled={isHost}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <label>Num Rounds</label>
            <select 
                name='numRounds' 
                value={settings.numRounds} 
                onChange={e=>handleSettingsChange(e)}
                disabled={isHost}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
        

}

export default SettingsContainer
