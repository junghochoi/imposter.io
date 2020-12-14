import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			roomcode: "",
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
				<input type="text" name="name" onChange={this.handleChange} />

				<label>Room Code</label>
				<input
					type="text"
					name="roomcode"
					onChange={this.handleChange}
				/>

				<Link
					to={{
						pathname: "/game/new",
						state: {
							playerName: this.state.name,
						},
					}}
				>
					Create new Lobby
				</Link>
			</div>
		);
	}
}

export default Home;
