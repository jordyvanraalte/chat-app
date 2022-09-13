import React, {useEffect} from "react";
import ChatHeader from "./chat-header";
import RoomList from "./room-list";
import ChatInput from "./chat-input";
import Messages from "./messages";
import CreateRoom from "./create-room";
import SocketService from "../../lib/services/socket.service";
import {services} from "../../lib/services";
import {useDispatch, useSelector} from "react-redux";
import {
    addMessage,
    addRoom,
    addRoomUser, removeRoomUser,
    selectChatState,
    setCurrentRoom, setMessages,
    setRooms,
    setRoomUsers
} from "../../store/chatSlice";
import {json} from "stream/consumers";

const ChatComponent: React.FC = () => {
    const chatState = useSelector(selectChatState);

    const dispatch = useDispatch();

    useEffect(() => {
        services.socketService.emit("list-rooms", {})

        if(chatState.currentRoom !== ""){
            services.socketService.emit("list-room-users", {
                room: chatState.currentRoom
            })
        }

        services.socketService.on("list-room-users", (data) => {
            dispatch(setRoomUsers(JSON.parse(data)))
        })

        services.socketService.on("listed-rooms", (data) => {
            dispatch(setRooms(JSON.parse(data)))
        })

        services.socketService.on("own-created-room", (data) => {
            const room = JSON.parse(data)
            dispatch(addRoom(room))
            dispatch(setCurrentRoom(room.id))
            dispatch(setMessages([]))
            services.socketService.emit("list-room-users", {
                room: room.id
            })
        })

        services.socketService.on("created-room", (data) => {
            const room = JSON.parse(data)
            dispatch(addRoom(room))
        })

        services.socketService.on("own-joined-room", (data) => {
            const message = JSON.parse(data)
            dispatch(setMessages([]))
            dispatch(addMessage(message))
            dispatch(addRoomUser(message.user))
        })

        services.socketService.on("joined-room", (data) => {
            const message = JSON.parse(data)
            dispatch(addMessage(message))
            dispatch(addRoomUser(message.user))
        })

        services.socketService.on("left-room", (data) => {
            const message = JSON.parse(data)
            dispatch(addMessage(message))
            dispatch(removeRoomUser(message.user))
        })

        services.socketService.on("new-message", (data) => {
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
            <CreateRoom users={chatState.roomUsers} />
        </div>
</div>)
}

export default ChatComponent;
