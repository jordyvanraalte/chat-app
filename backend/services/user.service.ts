import User from "../entities/user";
import WebSocket from "ws";
import {Socket} from "socket.io";

const users = Array<User>();
const userSockets = new Map<String, Socket>();


export const listUsers = () => {
    return users;
}

export const getUser = (id: string): User | undefined => {
    return users.find(user => user.id === id);
}

export const listUserSockets = () => {
    return userSockets;
}

export const addUserSocket = (user: User, socket: Socket) => {
    userSockets.set(user.id, socket);
}

export const removeUserSocket = (user: User) => {
    userSockets.delete(user.id);
}

export const createUser = (username: string, avatar: string): User => {
    const user = new User(username, avatar);
    users.push(user);
    return user;
}
