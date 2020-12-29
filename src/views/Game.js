import React, { Component } from "react";
import PlayerRole from "../components/Game/PlayerRole";



import DrawingTask from '../components/Game/DrawingTask';
import NumberTask from '../components/Game/NumbersTask';
import QuestionTask from "../components/Game/QuestionTask";
import socket from "../Socket";


export class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			taskInd: 0,
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


	switchView = (lastView) => {

		console.log("switchView");
		const nextView = this.props.gameState.tasks[this.state.taskInd];
		this.setState(prevState => ({
			...prevState,
			taskInd: prevState.taskInd + 1,
			views: {
				...prevState,
				[nextView] : true,
				[lastView] : false
			}
		}));

	}

	componentDidMount() {

	}
    


	render() {
		console.log(this.state.views);
		console.log(this.props.gameState.tasks);
		let content = null;
		if (this.state.views.playerRoleView) {
			content = <PlayerRole gameState={this.props.gameState} switchView={this.switchView} />;
		} else if (this.state.views.numberTaskView) {
			content = <NumberTask gameState={this.props.gameState} switchView={this.switchView}/>
		} else if (this.state.views.drawingTaskView) {
			content = <DrawingTask gameState={this.props.gameState} switchView={this.switchView}/>
		} else {
			content = <QuestionTask gameState={this.props.gameState} switchView={this.switchView}/>
		}

        return content; 
	}
}

export default Game;
