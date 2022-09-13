import {v4 as uuidv4} from "uuid";
import { faker } from '@faker-js/faker';

export default class User {
    id: string;
    username: string;
    avatar: string;

    constructor() {
        this.id = uuidv4();
        this.username = faker.name.firstName();
        this.avatar = faker.image.avatar();
    }
}
