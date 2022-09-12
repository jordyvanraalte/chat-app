import React, {useState} from "react";
import {services} from "../../lib/services";

const ChatInput: React.FC = () => {
    const [message, setMessage] = useState("");

    const onSendPress = () => {
        services.socketService.emit("send-message", {
            type: "messages",
            command: "create",
            payload: {
                message: message,
            }
        })
    }

    return(
        <div className="py-5 flex">
            <input
                className="bg-gray-100 w-full py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="button"
                    onClick={() => onSendPress()}
                    className="text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-5 px-20 rounded-xl ml-4 focus:outline-none">Send
            </button>
        </div>
    )
}

export default ChatInput;
