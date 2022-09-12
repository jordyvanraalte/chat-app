import React, {useEffect, useState} from "react";
import {services} from "../../lib/services";
import Message from "../../entities/message";

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
      services.socketService.on("new-message", (data) => {
        console.log(data);
          //setMessages([...messages, data])
      })
    }, [])


    return (<div className="w-full px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">

                {
                    messages.map((message, index) => {
                        return message.user.id === localStorage.getItem("user") ? (
                            <div>
                                <div
                                    className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                >
                                    {message.message} from {message.user.username}
                                </div>
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                            </div>
                        ) : (    <div className="flex justify-start mb-4">
                            <img
                                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                className="object-cover h-8 w-8 rounded-full"
                                alt=""
                            />
                            <div
                                className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                            >
                                {message.message} from {message.user.username}
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    </div>)
}

export default Messages;
