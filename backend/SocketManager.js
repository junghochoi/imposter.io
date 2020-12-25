const io = require("./server.js").io;
const {
	JOIN_LOBBY,
	LEAVE_LOBBY,
	UPDATE_PLAYER_LIST,
	LOBBY_EXISTS,
	GET_PLAYER_LIST,
	CREATE_AND_JOIN_LOBBY,
	IO_DISCONNECT,
	IO_DISCONNECTING,
	SUBMIT_LOBBY_SETTINGS,
	UPDATE_LOBBY_SETTINGS,
	GET_LOBBY_SETTINGS,
	START_GAME,

} = require("../client/src/Events");
const Room = require('./Room');

let socketRooms = new Map();

module.exports = (socket) => {
	console.log(`Connected: ${socket.id}`);
	socket.on(IO_DISCONNECT, () => {
		console.log(`Disconnected: ${socket.id}`);
	});

	socket.on(IO_DISCONNECTING, () => {
		socket.rooms.forEach((roomCode) => {
			removeUserFromRoom(roomCode, socket.id);
		});
	});

	socket.on(GET_PLAYER_LIST, (roomCode, callback) => {
		let room = socketRooms.get(roomCode);
		if (room === undefined || room.size === 0) {
			callback([]);
		} else {
			callback(room.getUsersFromRoom());
		}
	});

	socket.on(CREATE_AND_JOIN_LOBBY, (roomCode, playerName) => {
		addUserToRoom(roomCode, {
			socketId: socket.id,
			playerName: playerName,
			roomCode: roomCode,
			host: true,
		});
	});

	socket.on(JOIN_LOBBY, (roomCode, playerName) => {
		if (socketRooms.has(roomCode)) {
			addUserToRoom(roomCode, {
				socketId: socket.id,
				playerName: playerName,
				roomCode: roomCode,
				host: false,
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

	socket.on(SUBMIT_LOBBY_SETTINGS, (roomCode, newSettings)=>{
		socketRooms.get(roomCode).setSettings(newSettings);
		io.to(roomCode).emit(UPDATE_LOBBY_SETTINGS, newSettings);
	});
	socket.on(GET_LOBBY_SETTINGS, (roomCode, callback) => {
		callback(socketRooms.get(roomCode).getSettings());
	});

	socket.on(START_GAME, (roomCode)=>{
		io.to(roomCode).emit(START_GAME);
	})	

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
			let newRoom = new Room(roomCode, socketObj);
			socketRooms.set(roomCode, newRoom);
		} else {
			socketRooms.get(roomCode).addUser(socketObj);
		}
		updatePlayerListEmit(roomCode);
	};

	const removeUserFromRoom = (roomCode, socketId) => {
		let room = socketRooms.get(roomCode);
		if (room === undefined || room === null) {
			return;
		}
		room.removeUser(socketId);
		if (room.getRoomSize() === 0) {
			socketRooms.delete(roomCode);
		}
	};
	const updatePlayerListEmit = (roomCode) =>
		io.to(roomCode).emit(UPDATE_PLAYER_LIST, getUsersFromRoom(roomCode));
	const getUsersFromRoom = (roomCode) => {
		let room = socketRooms.get(roomCode);
		if (room === undefined || room.size === 0) {
			return [];
		}
		return room.getUsersFromRoom();
	};
};
