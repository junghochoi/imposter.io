import React, { useState, useEffect } from "react";
import { SHOW_RESULTS } from "../../Events";
import { Container, Heading } from "../../styled/Lib";
import Timer from './Timer'

import {
	ImposterResultCard,
    ImposterResultContainer,
    ScoreTable,
    ScoreTableRow,
    ScoreTableData,
} from "../../styled/GameStyles";
import socket from "../../Socket";
function EndGame(props) {
	const [players, setPlayers] = useState([]);
	const [imposters, setImposters] = useState([]);

	useEffect(() => {
		socket.once(SHOW_RESULTS, (playerScores) => {
            playerScores.sort((a, b) =>
                a.finalVotes > b.finalVotes ? -1 : 1
            );
            let players = [],
                imposters = [],
                allPlayers = [];
            playerScores.forEach((p, i) => {
                if (i < props.gameState.settings.numImposters) {
                    p.votedOff = true;
                } else {
                    p.votedOff = false;
                }
                p.hidden = true;
                allPlayers.push(p);
                if (p.imposter) {
                    imposters.push(p);
                } else {
                    players.push(p);
                }
            });

            setPlayers(players);
            setImposters(imposters);

            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
            const showImposters = async () => {
                for (let i = 0; i < imposters.length; i++) {
                    await delay(2000);
                    setImposters((prevImposters) => {
                        let newImposters = [...prevImposters];
                        newImposters[i] = {
                            ...newImposters[i],
                            hidden: false,
                        };
                        return newImposters;
                    });
                }
            };
            showImposters();
        });
	}, [props.gameState.settings.numImposters]);

	const imposterCards = imposters.map((imp) => {
		return (
			<span key={imp.socketId}>
				<ImposterResultCard hidden={imp.hidden} votedOff={imp.votedOff}>
					{imp.playerName}
					<br />
					{imp.finalVotes} Votes
				</ImposterResultCard>
			</span>
		);
    });
    
    const roundTableHeaders = [];
    roundTableHeaders.push(<ScoreTableData>Player</ScoreTableData>)
    roundTableHeaders.push(<ScoreTableData># of Votes</ScoreTableData>)
    for (let i = 1; i <= props.gameState.settings.numTasks; i++){
        roundTableHeaders.push(<ScoreTableData>Round {i}</ScoreTableData>);
    }
    roundTableHeaders.push(<ScoreTableData>Final Vote</ScoreTableData>)
    roundTableHeaders.push(<ScoreTableData>Total</ScoreTableData>);


	const scores = players.map((playerObj) => {

        let totalPoints = 0;
		const roundScores = playerObj.score.map((score, i) => {
            totalPoints += score;
            return (
			    <ScoreTableData key={`${playerObj.socketId}-score-${i}`}>{score}</ScoreTableData>
            )
        }); 

        const tableRow = [
            <ScoreTableData key={playerObj.socketId}>{playerObj.playerName}</ScoreTableData>,
            <ScoreTableData key={`${playerObj.socketId}-votes`}>{playerObj.finalVotes} Votes</ScoreTableData>,
            ...roundScores,
            <ScoreTableData key={`${playerObj.socketId}-finalScore`}>{totalPoints}</ScoreTableData>
        ];

		return (
			<ScoreTableRow key={playerObj.socketId}>
				{tableRow}
			</ScoreTableRow>
		);
    });
    
	return (
        
		<Container>
			<Heading>Results</Heading>
			<Heading>Imposters</Heading>
			<ImposterResultContainer>{imposterCards}</ImposterResultContainer>
			<Heading>Scores</Heading>
			<ScoreTable>
                <thead>
                    {roundTableHeaders}
                </thead>
                <tbody>
                    {scores}
                </tbody>
                
            </ScoreTable>
            <Timer timer={props.timer} />
		</Container>
	);
}

export default EndGame;
