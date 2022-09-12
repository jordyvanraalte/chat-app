import React from "react";

const ChatInput: React.FC = () => {

    return(
        <div className="py-5 flex">
            <input
                className="bg-gray-100 w-full py-5 px-3 rounded-xl"
                type="text"
                placeholder="type your message here..."
            />
            <button type="button"
                    className="text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-5 px-20 rounded-xl ml-4 focus:outline-none">Send
            </button>
        </div>
    )
}

export default ChatInput;
