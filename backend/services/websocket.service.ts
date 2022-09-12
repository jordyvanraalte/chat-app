import {listRooms, createRoom, joinRoom, leaveRoom, roomUsers, createMessage, getRoom} from "./room.service";
import {addUserSocket, createUser, getUser, listUserSockets} from "./user.service";
import {Socket} from "socket.io"
import Room from "../entities/room";

const sendToAll = (socket :Socket, event:string, message: string) => {
    socket.broadcast.emit(event, message);
}

const sendToAllInRoom = (room: Room | undefined, event: string, message: string) => {
    if (room) {
        const users = listUserSockets()
        room.users.forEach(user => {
            const socket = users.get(user.id);
            if (socket) {
                send(socket, event, message);
            }
        })
    }
}

const send = (s: Socket,event:string, message: string) => {
    s.emit(event, message);
}

export const handleSocketRequest = (socket: Socket,  message: any) => {
    const {type, command, payload} = message;

    let user = null
    if(payload?.user)
        user = getUser(payload.user);

    switch (type) {
        case "rooms":
            switch (command) {
                case "list":
                    send(socket, "list", JSON.stringify(listRooms()));
                    break;
                case "create":
                    if (user) {
                        const room = createRoom(payload.name, user);
                        sendToAll(socket, "create", JSON.stringify({
                            type: "rooms",
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
                        sendToAllInRoom(joinedRoom, "join-message", JSON.stringify({
                            type: "rooms",
                            payload: {
                                "message": `${user.username} joined the room`,
                            }
                        }));
                    }
                    break;
                case "leave":
                    if (user) {
                        const leftRoom = leaveRoom(payload.id, user);
                        sendToAllInRoom(leftRoom, "leave-message", JSON.stringify(
                            {
                                type: "rooms",
                                payload: {
                                    "message": `${user.username} left the room`,
                                }
                            }
                        ));
                    }
                    break;
                case "users":
                    const users = roomUsers(payload.id);
                    send(socket, "users", JSON.stringify(users));
                    break;
                case "message":
                    if (user) {
                        const message = createMessage(user, payload.message);
                        const room = getRoom(payload.id);
                        if(room)
                            sendToAllInRoom(room, "room-message", JSON.stringify(message));
                    }
                    break;
            }
    }
}

export const handleConnection = (socket: Socket) => {
    const user = createUser("test", "test");
    addUserSocket(user, socket);
    return user
}


