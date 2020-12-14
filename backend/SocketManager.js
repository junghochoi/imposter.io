const io = require("./server.js").io;
const {
	JOIN_LOBBY,
	LEAVE_LOBBY,
	UPDATE_PLAYER_LIST,
} = require("../client/src/Events");


let socketRooms = new Map();

module.exports = (socket) => {
	console.log(`Connected: ${socket.id}`);
	socket.on("disconnect", () => {
		console.log(`Disconnected: ${socket.id}`);
	});

	socket.on(JOIN_LOBBY, (roomCode) => {
		socket.join(roomCode);
		addUserToRoom(roomCode, {
			socketId: socket.id,
		});

		updatePlayerListEmit(roomCode);
	});

	socket.on(LEAVE_LOBBY, (roomCode) => {
		socket.leave(roomCode);
        removeUserFromRoom(roomCode, socket.id);
		updatePlayerListEmit(roomCode);
	});

	socket.on("debug", () => {
		console.log("-------DEBUG-------");
		console.log(socketRooms);
		console.log("-------------------");
	});
};

function updatePlayerListEmit(roomCode) {
	io.to(roomCode).emit(UPDATE_PLAYER_LIST, getUsersFromRoom(roomCode));
}

function removeUserFromRoom(roomCode, socketId) {
    
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

function addUserToRoom(roomCode, socketObj) {
	if (!socketRooms.has(roomCode)) {
		socketRooms.set(roomCode, new Set().add(socketObj));
	} else {
		let connectedUsers = socketRooms.get(roomCode);
		connectedUsers.add(socketObj);
		socketRooms.set(roomCode, connectedUsers);
	}
}

function getUsersFromRoom(roomCode) {
	room = socketRooms.get(roomCode);
	if (room === undefined || room.size === 0) {
		return [];
	}
	return [...room.keys()];
}
