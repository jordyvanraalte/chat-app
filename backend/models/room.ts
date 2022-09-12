export default class Room {
    id: string;
    name: string;
    users: string[];

    constructor(id: string, name: string, users: string[]) {
        this.id = id;
        this.name = name;
        this.users = users;
    }
}
