import React, { Component } from "react";
import PlayerRole from "../components/Game/PlayerRole";
import DrawingTask from '../components/Game/DrawingTask';
import NumberTask from '../components/Game/NumbersTask';
import QuestionTask from "../components/Game/QuestionTask";
import Vote from '../components/Game/Vote';
import socket from "../Socket";

import {
	SWITCH_SCREEN
} from '../Events';


export class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			views: {

				playerRoleView: true,
				

				numberTaskView: false,
				drawingTaskView: false,
				questionTaskView: false,


				voteView: false,
				finalVoteView: false,
			},
		};
	}




	componentDidMount() {
		socket.on(SWITCH_SCREEN, (nextView) => {
			this.setState(prevState =>{
				let views = Object.assign({}, prevState.views);
				Object.keys(views).forEach(viewName => views[viewName] = false);
				views[nextView] = true;


				console.log(views);
				return { 
					...prevState, 
					views: views
				};
			});
			
						 
		});
	}
    


	render() {

		let content = null;
		if (this.state.views.playerRoleView) {
			content = <PlayerRole gameState={this.props.gameState} />;
		} else if (this.state.views.numberTaskView) {
			content = <NumberTask gameState={this.props.gameState} />
		} else if (this.state.views.drawingTaskView) {
			content = <DrawingTask gameState={this.props.gameState} />
		} else if (this.state.views.questionTaskView) {
			content = <QuestionTask gameState={this.props.gameState} />
		} else {
			content = <Vote />
		}

        return content; 
	}
}

export default Game;
