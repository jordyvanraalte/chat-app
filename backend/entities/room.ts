import {v4 as uuidv4} from 'uuid';
import User from "./user";

export default class Room {
    id: string;
    name: string;
    users: User[];

    constructor(name: string, users: User[]) {
        this.id = uuidv4();
        this.name = name;
        this.users = users;
    }
}
