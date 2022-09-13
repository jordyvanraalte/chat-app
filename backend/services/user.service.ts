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

export const removeUser = (user: User) => {
    users.splice(users.indexOf(user), 1);
}

export const getUserSocketFromSocket = (socket: Socket) => {
    const user = users.find(user => userSockets.get(user.id) === socket);
    return user;
}

export const createUser = (): User => {
    const user = new User();
    users.push(user);
    return user;
}
