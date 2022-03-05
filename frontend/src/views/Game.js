import React, { Component } from "react";
import PlayerRole from "../components/Game/PlayerRole";
import DrawingTask from '../components/Game/DrawingTask';
import NumberTask from '../components/Game/NumbersTask';
import QuestionTask from "../components/Game/QuestionTask";
import EndGame from '../components/Game/EndGame';
import Loading from '../views/Loading'
import Vote from '../components/Game/Vote';
import FinalVote from '../components/Game/FinalVote';
import { Centered } from '../styled/Lib';
import socket from "../Socket";

import {
	SWITCH_SCREEN
} from '../Events';


export class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			timer: 0,
			currQuestion: null,
			view: {
				playerRole: true,
			

				numberTask: false,
				drawingTask: false,
				questionTask: false,
	
				waiting: false,
	
	
				vote: false,
				finalVote: false,
	
				endGame: false,
			}

		
		};
	}




	componentDidMount() {
		socket.on(SWITCH_SCREEN, (nextView, question, timestamp) => {
			
	
			this.setState(prevState =>{
				
				let newViews = Object.assign({}, prevState.view);
				Object.keys(newViews).forEach(viewName => newViews[viewName] = false);
				newViews[nextView] = true;

				return {
					// timer: timestamp - Date.now(),
					timer: timestamp - Date.now(),
					currQuestion: question,
					view: newViews,
				};
			});
			
						 
		});
	}
	componentWillUnmount() {
		socket.off(SWITCH_SCREEN);
	}
    

	render() {
		
		let content = null;
		if (this.state.view.playerRole) {
			content = <PlayerRole {...this.props}  currQuestion={this.state.currQuestion} timer={this.state.timer}/>;
		} else if (this.state.view.numberTask) {
			content = <NumberTask {...this.props}  currQuestion={this.state.currQuestion} timer={this.state.timer}/>
		} else if (this.state.view.drawingTask) {
			content = <DrawingTask {...this.props}  currQuestion={this.state.currQuestion} timer={this.state.timer}/>
		} else if (this.state.view.questionTask) {
			content = <QuestionTask {...this.props}  currQuestion={this.state.currQuestion} timer={this.state.timer}/>
		} else if (this.state.view.vote){
			content = <Vote {...this.props} currQuestion={this.state.currQuestion} timer={this.state.timer}/>
		} else if (this.state.view.finalVote) {
			content = <FinalVote {...this.props} timer={this.state.timer}/>

		}  else if (this.state.view.endGame){
			content = <EndGame {...this.props} timer={this.state.timer} />
		}  else {
			content = <Loading />
		}


		return (
			<Centered>
				<div>{content}</div>
			</Centered>	
			
			
			
		);
        
	}
}

export default Game;
