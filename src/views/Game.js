import React, { Component } from "react";
import PlayerRole from "../components/Game/PlayerRole";
import DrawingTask from '../components/Game/DrawingTask';
import NumberTask from '../components/Game/NumbersTask';
import QuestionTask from "../components/Game/QuestionTask";
import EndGame from '../components/Game/EndGame';
import Loading from '../views/Loading'
import Vote from '../components/Game/Vote';
import Timer from '../components/Game/Timer'
import { Centered } from '../styled/Lib';
import socket from "../Socket";

import {
	SWITCH_SCREEN
} from '../Events';


export class Game extends Component {
	constructor(props) {
		super(props);
		this.timer = React.createRef(3000);
		this.currQuestion = React.createRef(null);
		this.state = {
		
			

			playerRole: true,
			

			numberTask: false,
			drawingTask: false,
			questionTask: false,

			waiting: false,


			vote: false,
			finalVote: false,

			endGame: false,
		
		};
	}




	componentDidMount() {
		socket.on(SWITCH_SCREEN, (nextView, question, timestamp) => {
			
			this.currQuestion.current = question;
			this.timer.current = timestamp - Date.now();
			this.setState(prevState =>{
				let views = Object.assign({}, prevState);
				Object.keys(views).forEach(viewName => views[viewName] = false);
				views[nextView] = true;

				return views;
			});
			
						 
		});
	}
    


	render() {

		let content = null;
		if (this.state.playerRole) {
			content = <PlayerRole {...this.props}  currQuestion={this.currQuestion.current} timer={this.timer.current} />;
		} else if (this.state.numberTask) {
			content = <NumberTask {...this.props}  currQuestion={this.currQuestion.current} timer={this.timer.current}/>
		} else if (this.state.drawingTask) {
			content = <DrawingTask {...this.props}  currQuestion={this.currQuestion.current} timer={this.timer.current}/>
		} else if (this.state.questionTask) {
			content = <QuestionTask {...this.props}  currQuestion={this.currQuestion.current} timer={this.timer.current}/>
		} else if (this.state.vote){
			content = <Vote {...this.props} currQuestion={this.currQuestion.current} timer={this.timer.current}/>
		} else if (this.state.endGame){
			content = <EndGame {...this.props} />
		} else {
			content = <Loading />
		}

        return (
		
		<Centered>
			{content}
			<Timer timer={this.timer.current}/>
		</Centered> 
		); 
	}
}

export default Game;
