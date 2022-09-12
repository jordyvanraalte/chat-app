import React from "react";
import ChatHeader from "./chat-header";
import RoomList from "./room-list";
import ChatInput from "./chat-input";
import Messages from "./messages";
import CreateRoom from "./create-room";

const ChatComponent: React.FC = () => {
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
