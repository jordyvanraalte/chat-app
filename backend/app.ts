import dotenv from 'dotenv';
import {
    createRoomHandler,
    handleConnection,
    joinRoomHandler,
    leaveRoomHandler,
    listRoomsHandler, listRoomUsersHandler, onDisconnect, sendMessageHandler
} from "./services/websocket.service";
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
    const user = handleConnection(socket);
    socket.emit("user", JSON.stringify(user))
    listRoomsHandler(socket);
    createRoomHandler(socket);
    joinRoomHandler(socket);
    leaveRoomHandler(socket);
    sendMessageHandler(socket);
    listRoomUsersHandler(socket);
    onDisconnect(socket);
})


httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
