const { NUMBERS_TASK, QUESTION_TASK, DRAWING_TASK, FINAL_VOTE } = require('../Views');

class Room {
    constructor(roomCode, socketObj) {
        this.roomCode = roomCode;
        this.host = socketObj;
        this.playerMap = new Map();
        this.imposterMap = new Map();
        this.settings = {
			numImposters: 1,
			numTasks: 1,
            numRounds: 1
        }

        this.prevAnswers = new Set();
        this.votesReceived = 0;



        this.addUser(socketObj);
    }

    setSettings = (newSettings) => {
        this.settings = newSettings
    }

    getSettings = () => {
        return this.settings;
    }

    getRoomSize = () =>{
        return this.playerMap.size;
    }

    addUser = (socketObj) => {
        this.playerMap.set(socketObj.socketId, socketObj);
    }

    getUsersFromRoom = () => {
        const res = [...this.playerMap.values()]
        return res;
    }


    // Have to fix remove User with New map 
    removeUser = (socketId) => {

        
        this.playerMap.delete(socketId);
        if (this.host.socketId === socketId && this.playerMap.size > 0){
            let newHost = this.playerMap.values().next().value;
            newHost.host = true;
            this.host = newHost;
        }
    }

    
    generateImposters = (numImposters) => {
        // Reset Imposters

        
        this.playerMap.forEach(socketObj => socketObj.imposter = false);

        const indices = this.uniqueNumbers(this.playerMap.size, numImposters);
        [...this.playerMap.values()].forEach((socketObj, i) => {
    
            if (indices.includes(i)) {
          
                socketObj.imposter = true;
                this.imposterMap.set(socketObj.socketId, socketObj);
            } 
        }); 

        return this.getUsersFromRoom();
    }


    uniqueNumbers = (upperBound, num) => {
        let arr = [...Array(upperBound).keys()];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }  
    
        const numToDelete = arr.length - num;
        const res = arr.splice(0, num, numToDelete);
        return res;
    }
	
	pickRandomTask = () => {
		const upperBound = 3;
		const taskNumber =  Math.floor(Math.random() * Math.floor(upperBound));
		if (taskNumber === 0) {
			return NUMBERS_TASK
		} else if (taskNumber === 1){
			return QUESTION_TASK
		} else {    
			return DRAWING_TASK
		}
    }
    
    recordTaskAnswer = (responseObj) => {
        this.prevAnswers.add(responseObj);
    }
    clearAnswers = () => {
        this.prevAnswers.clear();
    }
    getAnswers = () => {
        return [...this.prevAnswers.values()];
    }
    getAnswerSize = () => {
        return this.prevAnswers.size;
    }
    recordVoteAnswer = (playerSocketId, votesArr, pts, endgame) => {
     
        
        this.votesReceived += 1;
        console.log(this.votesReceived);
        let player = this.playerMap.get(playerSocketId);

        let totalScore = 0;
        votesArr.forEach(socketId => {
            if (endgame){
                this.playerMap.get(socketId).finalVotes += 1;
            } 
            
            if (this.imposterMap.has(socketId)){
                totalScore += pts;
            } 
        });
        player.score.push(totalScore)
    }

    receivedAllVotes = () => {
        console.log(`${this.votesReceived} ${this.playerMap.size}`);
        if (this.votesReceived >= this.playerMap.size){
            console.log("votesReceived have been reset");
            this.votesReceived = 0;
            return true;
        }
        return false;
    }

    resetRoom = () => {
        this.imposterMap.clear();
        this.playerMap.forEach(playerObj => {
            playerObj.score = [];
            playerObj.finalVotes = 0;
        })
    }
} 
module.exports = Room;