import React, { Component } from "react";
import PlayerRole from "../components/Game/PlayerRole";
import DrawingTask from '../components/Game/DrawingTask';
import NumberTask from '../components/Game/NumbersTask';
import QuestionTask from "../components/Game/QuestionTask";
import EndGame from '../components/Game/EndGame';
import Loading from '../views/Loading'
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


				playerRole: true,
				

				numberTask: false,
				drawingTask: false,
				questionTask: false,

				waiting: false,


				vote: false,
				finalVote: false,

				endGame: false,
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
		if (this.state.views.playerRole) {
			content = <PlayerRole {...this.props}  currQuestion={this.state.currQuestion}/>;
		} else if (this.state.views.numberTask) {
			content = <NumberTask {...this.props}  currQuestion={this.state.currQuestion}/>
		} else if (this.state.views.drawingTask) {
			content = <DrawingTask {...this.props}  currQuestion={this.state.currQuestion}/>
		} else if (this.state.views.questionTask) {
			content = <QuestionTask {...this.props}  currQuestion={this.state.currQuestion}/>
		} else if (this.state.views.vote){
			content = <Vote {...this.props} currQuestion={this.state.currQuestion}/>
		} else if (this.state.views.endGame){
			content = <EndGame {...this.props} />
		} else {
			content = <Loading />
		}

        return content; 
	}
}

export default Game;
