import User from "./user";

export default class Message {
    id: string;
    message: string;
    timestamp: string;
    user: string;


    constructor(id: string, message: string, timestamp: string, user: string) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.user = user;
    }
}
