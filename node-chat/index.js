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

var messsages= []

io.on("connection", (socket) => {
    console.log("connected...")
    socket.on('send-message', (message) => {
        console.log(message)
        messsages.push(message)
        socket.broadcast.emit('recieve-message',(message))
    })
})