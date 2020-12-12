import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect

} from 'react-router-dom'

import socket from '../socket';


import HomeScreen from '../views/Home'
import LobbyScreen from '../views/Lobby'
import Debug from '../dev/Debug'
export class Root extends Component {



    createLobby = () => {
        const lobbyCode = 'abcde'; // Randomly Generate Unique code

        // console.log(this.props.location.playerName)
        // socket.playerName = "nick"
        socket.emit('join', lobbyCode);
        return <Redirect to={`/game/${lobbyCode}`}/>

    }

    render() {
        return (

            <Router>
                <Switch>
                    
                    <Route exact path='/' component={HomeScreen} />
                    
                    <Route exact path='/game/new' render={this.createLobby} />
                    <Route exact path= '/game/:id' component={LobbyScreen} />
                    

                    
                </Switch>
                <Debug />
            </Router>
                

            

        )
    }
}

export default Root
