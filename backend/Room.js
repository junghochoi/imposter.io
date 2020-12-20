

class Room {
    constructor(roomCode, socketObj) {
        this.roomCode = roomCode;
        this.host = socketObj;
        this.playerSet = new Set();
        this.settings = {
             
			numImposters: 1,
			numTasks: 3,
            numRounds: 3
			
        }
        this.addUser(socketObj);
    }

  

    getRoomSize = () =>{
        return this.playerSet.size();
    }

    addUser = (socketObj) => {
        this.playerSet.add(socketObj);
    }

    getUsersFromRoom = () => {
        const res = [...this.playerSet.keys()]
        console.log(res)
        return res;
    }

    removeUser = (socketId) => {
        this.playerSet.forEach((socketObj) => {
			if (socketObj.socketId === socketId) {
                this.playerSet.delete(socketObj);
			}
		});
    }

} 
module.exports = Room;