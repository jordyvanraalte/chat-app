export default class User {
    id: string;
    username: string;
    avatar: string;

    constructor(id: string, username: string, avatar: string) {
        this.id = id;
        this.avatar = avatar;
        this.username = username;
    }
}
