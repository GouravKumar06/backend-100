const express = require('express');
const http = require("http");
const socketIo = require("socket.io");


// Initialize express app
const app = express();

//create a server
const server = http.createServer(app);

//initialize socket.io and attach it to the http server
const io = socketIo(server);

// attach the public folder with static
app.use(express.static('public'));


const users = new Set();

io.on('connection', (socket) => {
    console.log('A user connected');

    //handle users when they will join the chat
    socket.on('join', (userName) => {
        users.add(userName);
        socket.userName = userName;

        //broadcast to all clients/users that a newuser is joined
        io.emit('userJoined', userName);

        //send the updated user list to all clients/users
        io.emit('userList', Array.from(users));
    });


    //handle incoming chat message 
    socket.on("chatMessage",(message)=>{
        //broadcast the received message to all connected users/clients
        io.emit("chatMessage",message);
    });


    //handle user disconnection

    socket.on('disconnect', () => {
        console.log('A user is disconnected');
        users.forEach(user =>{
            if(user === socket.userName){
                users.delete(user);

                io.emit('userLeft', user);
                io.emit('userList', Array.from(users));
            }
        })
    });
});


const PORT = 3000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});