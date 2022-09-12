import React, {useState} from "react";
import {services} from "../../lib/services";
import User from "../../entities/user";

const CreateRoom: React.FC = () => {
    const [name, setName] = useState("");
    const [users, setUsers] = useState<User[]>([]);

    const onRoomCreate = () => {
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
            <div>
                {
                    users.map((user, index) => {
                        return (
                            <div key={index}>
                                <div className="font-semibold text-xl py-4">Users in room</div>
                                <div  className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                                    <div className="flex w-full justify-between">
                                        <span className="text-gray-500">Username</span>
                                        <img
                                            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
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
