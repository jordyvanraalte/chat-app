import WebSocket, {WebSocketServer} from "ws";
import {listRooms, createRoom, joinRoom, leaveRoom, roomUsers, createMessage} from "./room.service";
import {addUserSocket, createUser, getUser, listUserSockets} from "./user.service";
import Room from "../models/room";


const stringToJSON = (message: string) => {
    return JSON.parse(message);
}

const sendToAll = (wss: WebSocketServer, message: string) => {
    wss.clients.forEach(client => {
        client.send(message);
    })
}

const sendToAllInRoom = (room: Room | undefined, message: string) => {
    if (room) {
        const users = listUserSockets()
        room.users.forEach(user => {
            const socket = users.get(user.id);
            if (socket) {
                send(socket, message);
            }
        })
    }
}

const send = (ws: WebSocket, message: string) => {
    ws.send(message);
}

export const handleSocketRequest = (socket: WebSocket, server: WebSocketServer, message: string) => {
    const parsedMessage = stringToJSON(message);
    const {type, command, payload} = parsedMessage;

    const user = getUser(payload.user);

    switch (type) {
        case "rooms":
            switch (command) {
                case "list":
                    send(socket, JSON.stringify(listRooms()));
                    break;
                case "create":
                    if (user) {
                        const room = createRoom(payload.name, user);
                        sendToAll(server, JSON.stringify(room));
                    }
                    break;
                case "join":
                    if (user) {
                        const joinedRoom = joinRoom(payload.id, user);
                        sendToAllInRoom(joinedRoom, JSON.stringify(joinedRoom));
                    }
                    break;
                case "leave":
                    if (user) {
                        const leftRoom = leaveRoom(payload.id, user);
                        sendToAllInRoom(leftRoom, JSON.stringify(leftRoom));
                    }
                    break;
                case "users":
                    const users = roomUsers(payload.id);
                    send(socket, JSON.stringify(users));
                    break;
                case "message":
                    if (user) {
                        const message = createMessage(user, payload.message);
                        sendToAllInRoom(payload.room, JSON.stringify(message));
                    }
                    break;
            }
    }
}

export const handleConnection = (socket: WebSocket, server: WebSocketServer) => {
    const user = createUser("test", "test");
    addUserSocket(user, socket);
    return user
}


