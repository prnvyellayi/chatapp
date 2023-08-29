const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)

http.listen(8080, () => {
    console.log(`listening on port 8080`)
})

app.get('/', (req,res) => {
    res.send('Hello world')
})

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:4200", "http://localhost:8080"]
}))

const io = require('socket.io')(http)

var messages= []

io.on("connection", (socket) => {
    console.log("connected...")
    socket.on("join",({ name, room }) => { 
        // Emit will send message to the user
        // who had joined
        socket.emit('message', {
            username: 'admin', message:
                `${name},
            welcome to room ${room}.`
        });
 
        // Broadcast will send message to everyone
        // in the room except the joined user
        socket.broadcast.to(room)
            .emit('message', {
                username: "admin",
                message: `${name}, has joined`
            });
 
        socket.join(room);
    })

    socket.on('send-message', ({username, activeRoom, message}) => {
        // messages.push(message)
        console.log(message)
        // socket.broadcast.emit('recieve-message',(message))
        io.sockets.in(activeRoom).emit('message', {username: username, message: message});
    })

    socket.on('disconnect', ({username,activeRoom}) => {
        if (username) {
            io.to(activeRoom).emit('message',
                {
                    username: 'admin', message:
                        `${username} had left`
                });
        }
    })
})