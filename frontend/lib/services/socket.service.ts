import { io, Socket } from 'socket.io-client'

export default class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io(process.env.WEBSOCKET_URL || "ws://localhost:8082", {});
        this.socket.on("connect", () => {
            console.log("Connected to websocket");
        })

        this.socket.on("user", (user: any) => {
            user = JSON.parse(user);
            localStorage.setItem("user", user.id);
        })
    }

    public on(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback);
    }

    public emit(event: string, data: any) {
        this.socket.emit(event, data);
    }


}

