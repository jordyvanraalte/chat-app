import React, {useEffect, useState} from "react";
import {services} from "../../lib/services";
import Message from "../../entities/message";


export interface IMessages {
    messages: Message[]
}

const Messages: React.FC<IMessages> = ({ messages}) => {
    return (<div className="w-full px-5 flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col mt-5">
                {
                    messages.map((message) => {
                        return message.user.id === localStorage.getItem("user") ? (
                            <div key={message.id} className="flex justify-end mb-4">
                                <div
                                    className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                >
                                    {message.message}
                                </div>
                                <img
                                    src={message.user.avatar}
                                    className="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                            </div>
                        ) : (
                            <div key={message.id} className="flex justify-start mb-4">
                                <img
                                    src={message.user.avatar}
                                    className="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                                <div
                                    className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                >
                                    {message.message}
                                </div>
                            </div>
                        )
                    })
                }
        </div>
    </div>)
}

export default Messages;
