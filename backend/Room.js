

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
                if (this.host === socketObj){
                    let newHost = this.playerSet.keys().next().value;
                    this.playerSet.delete(newHost);
                    newHost.host = true;
                    this.playerSet.add(newHost);
                    this.host = newHost;

                }
			}
		});
    }

    pickImposters = (numImposters) => {
        const indices = this.uniqueNumbers(this.playerSet.size, numImposters);
        console.log(indices);
        [...this.playerSet.keys()].forEach((socketObj, i) => {
    
            if (indices.includes(i)) {
          
                socketObj.imposter = true;
                this.imposterSet.add(socketObj);
            } 
        }); 
        console.log(this.imposterSet.size);
        return [...this.imposterSet.keys()];
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

} 
module.exports = Room;