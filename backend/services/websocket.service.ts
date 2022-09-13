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

export const listRoomsHandler = (socket: Socket) => {
    socket.on("list-rooms", () => {
        const rooms = listRooms();
        send(socket, "listed-rooms", JSON.stringify(rooms));
    })
}

export const createRoomHandler = (socket: Socket) => {
    socket.on("create-room", (payload) => {
        if (payload?.user && payload?.name) {
            {
                const user = getUser(payload.user);
                if (user) {
                    const room = createRoom(payload.name, user);
                    sendToAll(socket, "created-room", JSON.stringify(room));
                    //extra send to own client
                    send(socket, "created-room", JSON.stringify(room));
                }
            }
        }
    })
}

export const joinRoomHandler = (socket: Socket) => {
    socket.on("join-room", (payload) => {
        if(payload?.user && payload?.room)
        {
            const user = getUser(payload.user);
            const room = getRoom(payload.room);
            if (user && room) {
                joinRoom(room.id, user);
                const message = `joined the room`;
                sendToAllInRoom(room, "joined-room", JSON.stringify(createMessage(user, message)));
                send(socket, "joined-room", JSON.stringify(createMessage(user, "You joined the room!")));
            }
        }
    })
}

export const leaveRoomHandler = (socket: Socket) => {
    socket.on("leave-room", (payload) => {
        if(payload?.user && payload?.room)
        {
            const user = getUser(payload.user);
            const room = getRoom(payload.room);
            if (user && room) {
                leaveRoom(room.id, user);
                const message = `left the room`;
                sendToAllInRoom(room, "left-room", JSON.stringify(createMessage(user, message)));
            }
        }
    })
}

export const listRoomUsersHandler = (socket: Socket) => {
    socket.on("list-room-users", (payload) => {
        if(payload?.room)
        {
                const users = roomUsers(payload.room);
                send(socket, "list-room-users", JSON.stringify(users));
        }
    })
}

export const sendMessageHandler = (socket: Socket) => {
    socket.on("send-message", (payload) => {
        if(payload?.room && payload?.message)
        {
            const room = getRoom(payload.room);
            const user = getUser(payload.user);
            if (room && user) {
                const message = createMessage(user, payload.message);
                sendToAllInRoom(room, "new-message", JSON.stringify(message));
                send(socket, "new-message", JSON.stringify(message));
            }
        }
    })
}

export const handleConnection = (socket: Socket) => {
    const user = createUser("test", "test");
    addUserSocket(user, socket);
    return user
}


