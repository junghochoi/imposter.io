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
			currQuestion: null,
			
			views: {

				playerRoleView: true,
				

				numberTaskView: false,
				drawingTaskView: false,
				questionTaskView: false,

				waitingView: false,


				voteView: false,
				finalVoteView: false,
			},
		};
	}




	componentDidMount() {
		socket.on(SWITCH_SCREEN, (nextView, question) => {
			this.setState(prevState =>{
				let views = Object.assign({}, prevState.views);
				Object.keys(views).forEach(viewName => views[viewName] = false);
				views[nextView] = true;

				return { 
					...prevState, 
					currQuestion: question,
					views: views
				};
			});
			
						 
		});
	}
    


	render() {

		let content = null;
		if (this.state.views.playerRoleView) {
			content = <PlayerRole {...this.props}  currQuestion={this.state.currQuestion}/>;
		} else if (this.state.views.numberTaskView) {
			content = <NumberTask {...this.props}  currQuestion={this.state.currQuestion}/>
		} else if (this.state.views.drawingTaskView) {
			content = <DrawingTask {...this.props}  currQuestion={this.state.currQuestion}/>
		} else if (this.state.views.questionTaskView) {
			content = <QuestionTask {...this.props}  currQuestion={this.state.currQuestion}/>
		} else {
			content = <Vote {...this.props} currQuestion={this.state.currQuestion}/>
		}

        return content; 
	}
}

export default Game;
