import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import {handleSocketRequest} from "./services/websocket.service";

dotenv.config();

// @ts-ignore
const port: number | undefined = process.env.PORT;
const wss = new WebSocketServer({ port });

wss.on('connection', (ws: WebSocket) => {
    ws.on("message", (message: string) => {
        handleSocketRequest(ws, wss, message);
    })
})

