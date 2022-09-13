import User from "./user";

export default class Message {
    id: string;
    message: string;
    timestamp: string;
    user: User;


    constructor(id: string, message: string, timestamp: string, user: User) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.user = user;
    }
}
