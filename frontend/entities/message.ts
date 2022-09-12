import User from "./user";

export default class Message {
    user: User
    message: string;
    timestamp: string;


    constructor(user: User, message: string, timestamp: string) {
        this.user = user;
        this.message = message;
        this.timestamp = timestamp;
    }
}
