const { NUMBERS_TASK, QUESTION_TASK, DRAWING_TASK} = require('../Views');

class Room {
    constructor(roomCode, socketObj) {
        this.roomCode = roomCode;
        this.host = socketObj;
        this.playerSet = new Set();
        this.imposterSet = new Set();
        this.settings = {
			numImposters: 1,
			numTasks: 3,
            numRounds: 3
        }
        this.tasks = ["numberTaskView", "drawingTaskView", "questionTaskView"],
        this.addUser(socketObj);
    }

    setSettings = (newSettings) => {
        this.settings = newSettings
    }

    getSettings = () => {
        return this.settings;
    }

    getRoomSize = () =>{
        return this.playerSet.size;
    }

    addUser = (socketObj) => {
        this.playerSet.add(socketObj);
    }

    getUsersFromRoom = () => {
        const res = [...this.playerSet.keys()]
        return res;
    }

    removeUser = (socketId) => {
        this.playerSet.forEach((socketObj) => {
			if (socketObj.socketId === socketId) {
                this.playerSet.delete(socketObj);
                
                if (this.host === socketObj && this.playerSet.size > 0){
                    let newHost = this.playerSet.keys().next().value;
                    this.playerSet.delete(newHost);
                    newHost.host = true;
                    this.playerSet.add(newHost);
                    this.host = newHost;

                }
			}
		});
    }

    
    generateImposters = (numImposters) => {
        // Reset Imposters
        this.playerSet.forEach(socketObj => socketObj.imposter = false);

        const indices = this.uniqueNumbers(this.playerSet.size, numImposters);
        [...this.playerSet.keys()].forEach((socketObj, i) => {
    
            if (indices.includes(i)) {
          
                socketObj.imposter = true;
                this.imposterSet.add(socketObj);
            } 
        }); 

        return this.getUsersFromRoom();
    }

    generateTasks = () => {

        let tasks = []
        for(let i = 0; i < this.settings.numTasks; i++){
            // tasks.push(NUMBERS_TASK);
            tasks.push(this.pickRandomTask());
        }
        this.tasks = tasks;
        return tasks;
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
} 
module.exports = Room;