const express = require('express');
const socketio = require('socket.io');

const app = express();
const http = require('http');
const { addUser, getUser, removeUser, getUsers } = require('./utils');
const server = http.createServer(app);
const io = socketio(server)
const path = require('path')

app.use(express.static(path.join(__dirname, 'client')))

io.on('connection', (socket) => {
    socket.on('join', (username, roomId) => {
        socket.join(roomId);
        addUser(socket.id, username, roomId);
        socket.emit('messageFromServer', `Welcome, ${username}`)
        socket.broadcast.to(roomId).emit('messageFromServer', `${username} has joined the chat.`)
        io.to(roomId).emit('users', getUsers(roomId))
    }); 

    socket.on('messageFromClient', (message) => {
        const user = getUser(socket.id);
        socket.emit('messageFromServer', `You: ${message}`)
        socket.broadcast.to(user.roomId).emit('messageFromServer', `${user.name}: ${message}.`)
    })

    socket.on('disconnect', () => {
        const user = getUser(socket.id);
        socket.broadcast.to(user.roomId).emit('messageFromServer', `${user.name} left chat.`)
        removeUser(socket.id)
        io.to(user.roomId).emit('users', getUsers(user.roomId))
    }) 
})

server.listen(8888)