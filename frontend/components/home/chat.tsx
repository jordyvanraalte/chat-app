import React, {useEffect} from "react";
import ChatHeader from "./chat-header";
import RoomList from "./room-list";
import ChatInput from "./chat-input";
import Messages from "./messages";
import CreateRoom from "./create-room";
import SocketService from "../../lib/services/socket.service";
import {services} from "../../lib/services";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, addRoom, selectChatState, setRooms} from "../../store/chatSlice";

const ChatComponent: React.FC = () => {
    const chatState = useSelector(selectChatState);

    const dispatch = useDispatch();

    useEffect(() => {
        services.socketService.emit("list-rooms", {})

        services.socketService.on("listed-rooms", (data) => {
            dispatch(setRooms(JSON.parse(data)))
        })

        services.socketService.on("created-room", (data) => {
            const room = JSON.parse(data)
            dispatch(addRoom(room))
        })

        services.socketService.on("new-message", (data) => {
            console.log(data)
            dispatch(addMessage(JSON.parse(data)))
        })
    }, [])

    return(<div className="h-4/5 container shadow-lg rounded-lg mb-28">
       <ChatHeader/>
        <div className="h-full flex flex-row justify-between bg-white">
            <RoomList rooms={chatState.rooms} />
            <div className="w-full px-5 flex flex-col justify-between">
                <Messages messages={chatState.messages} />
                <ChatInput />
            </div>
            <CreateRoom />
        </div>
</div>)
}

export default ChatComponent;
