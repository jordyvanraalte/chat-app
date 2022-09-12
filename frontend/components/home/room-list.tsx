import React, {useEffect, useState} from 'react';
import {services} from "../../lib/services";
import Room from "../../entities/room";

const RoomList: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        services.socketService.on("listed-rooms", (data) => {
            setRooms(JSON.parse(data))
        })

        services.socketService.on("created-room", (data) => {
            console.log(data)
            const room = JSON.parse(data)
            setRooms([...rooms, room])
        })
    })



    return (
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto h-full">
                {
                    rooms.map((room) => {
                      return(
                          <div key={room.id} className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                              <div className="w-full">
                                <div className="text-lg font-semibold">Room: {room.name}</div>
                                <span className="text-gray-500">Room id: {room.id}</span>
                              </div>
                          </div>
                      )
                    })
                }
        </div>);
}

export default RoomList;
