import React, {useEffect} from "react";
import ChatHeader from "./chat-header";
import RoomList from "./room-list";
import ChatInput from "./chat-input";
import Messages from "./messages";
import CreateRoom from "./create-room";
import SocketService from "../../lib/services/socket.service";
import {services} from "../../lib/services";

const ChatComponent: React.FC = () => {
    useEffect(() => {
            services.socketService.emit("list-rooms", {})
    }, [])



    return(<div className="h-4/5 container shadow-lg rounded-lg mb-28">
       <ChatHeader/>
        <div className="h-full flex flex-row justify-between bg-white">
            <RoomList />
            <div className="w-full px-5 flex flex-col justify-between">
                <Messages />
                <ChatInput />
            </div>
            <CreateRoom />
        </div>
</div>)
}

export default ChatComponent;
