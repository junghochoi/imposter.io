import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playerName: "",
			roomCode: "",
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
    };
    


	render() {
		return (
			<div>
				<h1>Home Page</h1>
				<label>Name</label>
				<input type="text" name="playerName" onChange={this.handleChange} />

				<label>Room Code</label>
				<input type="text" name="roomCode" onChange={this.handleChange}/>

				<Link
					to={{
						pathname: "/game/new",
						state: {
							playerName: this.state.playerName,
						},
					}}
				>
					Create new Lobby
				</Link>

                <Link
                    to={{
                        pathname: `/game/${this.state.roomCode}/join`,
                        state:{
							playerName: this.state.playerName,
							roomCode: this.state.roomCode
                        }
                    }}
                >    
                    Join Lobby
                </Link>
			</div>
		);
	}
}

export default Home;
