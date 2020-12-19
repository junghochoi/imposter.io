import React, { Component } from "react";
import { 
	MenuLinkButton, 
	MenuInput,
	Heading, 
	Container,
	HomeMenu 
	
} from "../styled/Lib";

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
				<Heading> Imposter.io </Heading>

				<Container>
					<HomeMenu>
						
						<MenuInput
							type="text" name="playerName" placeholder="Name" onChange={this.handleChange}
							autoComplete="off"
						/>
						<MenuInput 
							type="text" name="roomCode" placeholder="Room Code" onChange={this.handleChange}
							autoComplete="off"
						/>
						



						<MenuLinkButton
							to={{
								pathname: "/game/new",
								state: {
									playerName: this.state.playerName,
								},
							}}
						>
							Create new Lobby
						</MenuLinkButton>

						<MenuLinkButton
							to={{
								pathname: `/game/${this.state.roomCode}/join`,
								state:{
									playerName: this.state.playerName,
									roomCode: this.state.roomCode
								}
							}}
						>    
							Join Lobby
						</MenuLinkButton>
					</HomeMenu>

				</Container>
	


		

			</div>
		);
	}
}

export default Home;
