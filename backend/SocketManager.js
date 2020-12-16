const io = require("./server.js").io;
const {
	JOIN_LOBBY,
	LEAVE_LOBBY,
	UPDATE_PLAYER_LIST,
	LOBBY_EXISTS,
	GET_PLAYER_LIST,
	CREATE_AND_JOIN_LOBBY,
} = require("../client/src/Events");


let socketRooms = new Map();

module.exports = (socket) => {

	
	console.log(`Connected: ${socket.id}`);
	socket.on("disconnect", () => {
		console.log(`Disconnected: ${socket.id}`);
	});

	socket.on(GET_PLAYER_LIST, (roomCode, callback) => {
		callback(getUsersFromRoom(roomCode));
	})




	socket.on(CREATE_AND_JOIN_LOBBY, (roomCode, playerName) => {
		addUserToRoom(roomCode, {
			socketId: socket.id,
			playerName: playerName,
		});
	});

	socket.on(JOIN_LOBBY, (roomCode, playerName) => {
		
		if (socketRooms.has(roomCode)){
			addUserToRoom(roomCode, {
				socketId: socket.id,
				playerName: playerName,
			});
		}
	});

	socket.on(LEAVE_LOBBY, (roomCode) => {
    
		socket.leave(roomCode);
        removeUserFromRoom(roomCode, socket.id);
        updatePlayerListEmit(roomCode);
       
	});

	socket.on(LOBBY_EXISTS, (roomCode, callback) => {
		callback(socketRooms.has(roomCode));
	});


	socket.on("debug", () => {
		console.log("-------DEBUG-------");
		console.log(socketRooms);
		console.log("-------------------");
	});

	/*
		---------------------HELPER FUNCTIONS---------------------
	*/

	const addUserToRoom = (roomCode, socketObj) => {
		socket.join(roomCode);
		if (!socketRooms.has(roomCode)) {
			socketRooms.set(roomCode, new Set().add(socketObj));
		} else {
			let connectedUsers = socketRooms.get(roomCode);
			connectedUsers.add(socketObj);
			socketRooms.set(roomCode, connectedUsers);
		}
		updatePlayerListEmit(roomCode);
	}

	const removeUserFromRoom = (roomCode, socketId) => {
		room = socketRooms.get(roomCode);
		room.forEach((socketObj) => {
			if (socketObj.socketId === socketId) {
				room.delete(socketObj);
			}
		});
	
		if (room.size === 0) {
			socketRooms.delete(roomCode);
		}
	}
	const updatePlayerListEmit = roomCode =>  io.to(roomCode).emit(UPDATE_PLAYER_LIST, getUsersFromRoom(roomCode));
	const getUsersFromRoom = roomCode => {
		room = socketRooms.get(roomCode);
		if (room === undefined || room.size === 0) {
			return [];
		}
		return [...room.keys()];
	};
	



};






