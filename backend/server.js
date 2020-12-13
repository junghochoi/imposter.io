const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");

const port = process.env.PORT || 4001;

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET"]
  }
});

let socketRooms = new Map()




io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on('join', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
    addUserToRoom(room, {socketId: socket.id});
    socket.emit("send_current_players", getUsersFromRoom(room));
  });


  socket.on('get_current_players' , (roomcode) => {

    // const players = ['j', 'k', 'l']
    

    io.to(roomcode).emit("send_current_players", getUsersFromRoom(roomcode));
    // socket.emit("send_current_players", getUsersFromRoom(roomcode));
    // socket.emit("send_current_players", [...socket.adapter.rooms.get(roomcode).keys()]);
  })

  socket.on('player_disconnect', (roomcode) => {

    console.log("player_disconnect listener triggered")
    
    room = socketRooms.get(roomcode)
    room.forEach((socketObj) => {
      
      
      if (socketObj.socketId = socket.id) {
        
        const res = room.delete(socketObj);
        console.log(res)
      }

      
    });
    
   
    if (room.size === 0) {
      socketRooms.delete(roomcode);
    }

    

    io.to(roomcode).emit("send_current_players", getUsersFromRoom(roomcode));
  });



  
  socket.on('debug', () =>{
    console.log('\x1bc')
    console.log("-------DEBUG-------")

    console.log(socketRooms);

    console.log("-------------------")
  });


});

function addUserToRoom(roomCode, socketObj){
  console.log("addUserToRoom")
  if (!socketRooms.has(roomCode)){
    socketRooms.set(roomCode, new Set().add(socketObj))
  } else {
    let connectedUsers = socketRooms.get(roomCode)
    connectedUsers.add(socketObj)
    socketRooms.set(roomCode, connectedUsers)
  }
}

function getUsersFromRoom(roomCode){
  room = socketRooms.get(roomCode)
  // if (room === undefined || room.size === 0) {
  //   return []
  // }
  return [...room.keys()]
}


  



server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});