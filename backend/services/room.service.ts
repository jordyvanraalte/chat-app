import User from "../entities/user";
import Room from "../entities/room";
import {v4 as uuidv4} from 'uuid';

const rooms = Array<Room>();

export const listRooms = () => {
    return rooms;
}

export const getRoom = (id: string): Room | undefined => {
   return rooms.find((room) => room.id === id);
}

export const createRoom = (name: string, user: User): Room => {
    const room = new Room(name, [user]);
    rooms.push(room);
    return room;
}

export const joinRoom = (id: string, user: User) => {
    const room = rooms.find(room => room.id === id);
    if (room && !room.users.find(u => u.id === user.id)) {
        room.users.push(user);
    }
    return room;
}

export const leaveRoom = (id: string, user: User) => {
    const room = rooms.find(room => room.id === id);
    if (room) {
        room.users = room.users.filter(u => u.id !== user.id);
    }
    console.log(room);
    return room;
}

export const getUserRoom = (user: User) => {
    return rooms.find(room => room.users.find(u => u.id === user.id));
}

export const roomUsers = (id: string) => {
    const room = rooms.find(room => room.id === id);
    return room ? room.users : [];
}


export const createMessage = (user: User, message: string) => {
    const fullMessage = `${user.username}: ${message}`;
    return {
        id: uuidv4(),
        message: fullMessage,
        user: user,
        timestamp: Date.now()
    }
}


