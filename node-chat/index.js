const express = require('express')
const cors = require('cors')
const Pusher = require('pusher')

const pusher = new Pusher({
    appId: "1651029",
    key: "1fd1ac5321764a8fdc9f",
    secret: "17144ff1c7626b178bce",
    cluster: "ap2",
    useTLS: true
});

const app = express()

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:4200", "http://localhost:8080"]
}))

app.use(express.json())

app.post('/api/messages', async (req,res) => {
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message,
    })

    res.json([])
})

console.log('listening on port 8080')
const port = 8000
app.listen(port)