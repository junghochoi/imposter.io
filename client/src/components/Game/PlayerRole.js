import React, { Component } from 'react'

export class Game extends Component {
    render() {
        return (
            <div>
                <h1>Game Screen {this.props.playerName}</h1>
            </div>
        )
    }
}

export default Game
