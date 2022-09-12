import User from "../models/user";
import Room from "../models/room";

const rooms = Array<Room>();

export const listRooms = () => {
    return rooms;
}

export const createRoom = (name: string, user: User): Room => {
    const room = new Room(name, [user]);
    rooms.push(room);
    return room;
}

export const joinRoom = (id: string, user: User) => {
    const room = rooms.find(room => room.id === id);
    if (room) {
        room.users.push(user);
    }
    return room;
}

export const leaveRoom = (id: string, user: User) => {
    const room = rooms.find(room => room.id === id);
    if (room) {
        room.users = room.users.filter(u => u.id !== user.id);
    }
    return room;
}

export const roomUsers = (id: string) => {
    const room = rooms.find(room => room.id === id);
    return room ? room.users : [];
}

export const createMessage = (user: User, message: string) => {
    return {
        user,
        message,
        timestamp: Date.now()
    }
}


