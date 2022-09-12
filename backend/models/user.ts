import {v4 as uuidv4} from "uuid";

export default class User {
    id: string;
    username: string;
    avatar: string;

    constructor(username: string, avatar: string) {
        this.id = uuidv4();
        this.username = username;
        this.avatar = avatar;
    }
}
