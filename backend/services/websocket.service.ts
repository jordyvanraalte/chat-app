import WebSocket, {WebSocketServer} from "ws";
import {getRooms} from "./room.service";


const stringToJSON = (message: string) => {
    return JSON.parse(message);
}

const sendToAll = (wss: WebSocketServer, message: string) => {
    wss.clients.forEach(client => {
        client.send(message);
    })
}

const send = (ws: WebSocket, message: string) => {
    ws.send(message);
}

export const handleSocketRequest = (socket: WebSocket, server: WebSocketServer, message: string) => {
    const parsedMessage = stringToJSON(message);
    const {type, command, payload} = parsedMessage;

    switch (type) {
        case "rooms":
            switch (command) {
                case "list":
                    send(socket, JSON.stringify(getRooms()));
                case "create":
                    break;
                case "join":
                    break;
            }
    }
}


