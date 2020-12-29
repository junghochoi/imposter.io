import React, { Component } from "react";
import { 
	Heading, 
	Container,
} from "../styled/Lib";

import HomeMenu from '../components/Home/HomeMenu';

export class Home extends Component {
	render() {
		return (
			<>
				<Heading> Imposter.io </Heading>
				<Container>
					<HomeMenu />
				</Container>
			</>
		);
	}
}

export default Home;
