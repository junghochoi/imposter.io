const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = module.exports.io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET']
  }
});

const SocketManager = require('./SocketManager');
io.on('connection', SocketManager);

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});