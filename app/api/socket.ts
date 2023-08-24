import {Server} from "socket.io"
import { createServer } from "http";

export default function SocketHandler({req,res} : {req :any, res: any}) {
    const httpServer = createServer();
    const io = new Server(httpServer, res.socket.server)
    res.socket.server.io = io

    io.on("connection", (socket) => {
        socket.on("send-message", obj => {
            io.emit("recieve-message",obj)
        })
    })
    httpServer.listen(3000)

    console.log("session socket")
    res.end()
}