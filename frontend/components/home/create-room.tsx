import React, {useState} from "react";
import {services} from "../../lib/services";
import User from "../../entities/user";
import {useDispatch, useSelector} from "react-redux";
import {selectChatState, setCurrentRoom, setMessages, setRoomUsers} from "../../store/chatSlice";

export interface ICreateRoom {
    users: User[]
}

const CreateRoom: React.FC<ICreateRoom> = ({ users}) => {
    const [name, setName] = useState("");
    const currentRoom = useSelector(selectChatState).currentRoom
    const dispatch = useDispatch();

    const onRoomCreate = () => {
        if (currentRoom !== "") {
            services.socketService.emit("leave-room", {
                room: currentRoom,
                user: localStorage.getItem("user"),
            })

            dispatch(setCurrentRoom(""))
            dispatch(setMessages([]))
            dispatch(setRoomUsers([]))
        }

        const user = localStorage.getItem("user");
        services.socketService.emit("create-room", {
            name,
            user
        })
    }

    return(
        <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
                <div className="font-semibold text-xl py-4">Create room</div>
                <div>
                    <input type="text" id="name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           placeholder="Room name" required
                            value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="button" onClick={() => onRoomCreate()}
                        className="text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2 focus:outline-none">Create
                </button>
            </div>
            <div className="overflow-y-auto h-4/5">
                <div className="font-semibold text-xl py-4">Users in room</div>
                {
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <div  className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                                    <div className="flex w-full justify-between">
                                        <span className="text-gray-500">{user.username}</span>
                                        <img
                                            src={user.avatar}
                                            className="object-cover h-8 w-8 rounded-full"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CreateRoom;
