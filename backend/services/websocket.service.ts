import WebSocket, {WebSocketServer} from "ws";
import {listRooms, createRoom, joinRoom, leaveRoom, roomUsers, createMessage, getRoom} from "./room.service";
import {addUserSocket, createUser, getUser, listUserSockets} from "./user.service";
import Room from "../entities/room";


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
                        sendToAll(server, JSON.stringify({
                            type: "rooms",
                            command: "create",
                            payload: {
                                message: "Room created",
                                room
                            }
                        }));
                    }
                    break;
                case "join":
                    if (user) {
                        const joinedRoom = joinRoom(payload.id, user);
                        sendToAllInRoom(joinedRoom, JSON.stringify({
                            type: "rooms",
                            command: "join-message",
                            payload: {
                                "message": `${user.username} joined the room`,
                            }
                        }));
                    }
                    break;
                case "leave":
                    if (user) {
                        const leftRoom = leaveRoom(payload.id, user);
                        sendToAllInRoom(leftRoom, JSON.stringify(
                            {
                                type: "rooms",
                                command: "left-message",
                                payload: {
                                    "message": `${user.username} left the room`,
                                }
                            }
                        ));
                    }
                    break;
                case "users":
                    const users = roomUsers(payload.id);
                    send(socket, JSON.stringify(users));
                    break;
                case "message":
                    if (user) {
                        const message = createMessage(user, payload.message);
                        const room = getRoom(payload.id);
                        if(room)
                            sendToAllInRoom(room, JSON.stringify(message));
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


