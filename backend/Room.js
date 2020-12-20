

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

    removeUser = (socketId) => {
        room.forEach((socketObj) => {
			if (socketObj.socketId === socketId) {
                room.delete(socketObj);
                console.log("hello");
			}
		});
    }

} 
class Cats extends Animals {
    constructor(name, age, whiskerColor) {
        super(name, age);
        this.whiskerColor = whiskerColor;
    }
    whiskers() {
        return `I have ${this.whiskerColor} whiskers`;
    }
}