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
	SWITCH_SCREEN,
	END_GAME

} = require('../Events');

const  {
	PLAYER_ROLE,
	QUESTION_TASK,
	VOTE_VIEW,
	DRAWING_TASK,
	NUMBERS_TASK,
} = require('../Views');
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
			imposter: false,
			host: true,
		});
	});

	socket.on(JOIN_LOBBY, (roomCode, playerName) => {
		if (socketRooms.has(roomCode)) {
			addUserToRoom(roomCode, {
				socketId: socket.id,
				playerName: playerName,
				roomCode: roomCode,
				imposter: false,
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
		runGame(roomCode);
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


	const runGame = async (roomCode) => {

		const createTimeout = (func, delay /* in ms */) => {
			console.log('createTimeout');
			return () => setTimeout(func, delay);
		}

		const delay = ms => new Promise(res => setTimeout(res, ms));

		const room = socketRooms.get(roomCode);
		const settings = room.getSettings();
		const players = room.generateImposters(settings.numImposters);
		const roomSocket = io.to(roomCode);
		const tasks = room.generateTasks();

		
		
		let stepZero, stepOne, stepTwo, stepThree;

		roomSocket.emit(START_GAME, players, settings, tasks);
		console.log("START_GAME");
		await delay(2000);
		roomSocket.emit(SWITCH_SCREEN, QUESTION_TASK);
		console.log("QUESTION_TASK");
		await delay(2000);
		roomSocket.emit(SWITCH_SCREEN, VOTE_VIEW);
		console.log("VOTE_VIEW");
		await delay(2000);
		roomSocket.emit(SWITCH_SCREEN, DRAWING_TASK);
		console.log("DRAWING_TASK");
		await delay(2000);
		roomSocket.emit(SWITCH_SCREEN, VOTE_VIEW);
		console.log("VOTE_VIEW");
		await delay(2000);
		roomSocket.emit(SWITCH_SCREEN, NUMBERS_TASK);
		console.log('NUMBERS_TASK');
		await delay(2000);
		roomSocket.emit(SWITCH_SCREEN, VOTE_VIEW);
		console.log("VOTE_VIEW");
		await delay(2000);
		roomSocket.emit(END_GAME);




		// setTimeout(stepOne, 5000)
		// stepOne = createTimeout(() => {
		// 	console.log("step one finished");
		// 	roomSocket.emit(SWITCH_SCREEN, QUESTION_TASK);
		// }, 5000);

		

		// stepOne();
	}
};
