import dotenv from 'dotenv';
import {handleSocketRequest} from "./services/websocket.service";
import { createServer } from "http"
import { Server } from "socket.io";


dotenv.config();

// @ts-ignore
const port: number = process.env.PORT || 3000;

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket ) => {
    console.log(`New connection ${socket.id}`)
    socket.on('message', (message) => {
        handleSocketRequest(socket, message)
    })
})


httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


// wss.on('connection', (ws: WebSocket) =>
// {
//     const user = handleConnection(ws, wss);
//     ws.send(JSON.stringify(user));
//
//     ws.on("message", (message: string) => {
//         handleSocketRequest(ws, wss, message);
//     })
// })
