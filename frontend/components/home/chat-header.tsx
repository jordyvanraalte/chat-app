import React from "react";
import {services} from "../../lib/services";
import {selectChatState, setCurrentRoom, setMessages, setRoomUsers} from "../../store/chatSlice";
import {useDispatch, useSelector} from "react-redux";

const ChatHeader: React.FC = () => {
    const chatState = useSelector(selectChatState);
    const dispatch = useDispatch();

    const onLeavePress = () => {
        services.socketService.emit("leave-room", {
            user: localStorage.getItem("user"),
            room: chatState.currentRoom
        })
        dispatch(setCurrentRoom(""))
        dispatch(setMessages([]))
        dispatch(setRoomUsers([]))
    }

    return (
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
            <div className="font-semibold text-2xl">Jordy chat</div>
                <button type="button"
                        onClick={() => onLeavePress()}
                        className="text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-5 px-20 rounded-xl ml-4 focus:outline-none">Leave chat
                </button>
        </div>
    )
}


export default ChatHeader;
