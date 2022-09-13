import React, {useEffect, useState} from 'react';
import {services} from "../../lib/services";
import Room from "../../entities/room";
import {useDispatch, useSelector} from "react-redux";
import {selectChatState, setCurrentRoom, setMessages, setRoomUsers} from "../../store/chatSlice";

export interface IRoomList {
    rooms: Room[]
}

const RoomList: React.FC<IRoomList> = ({ rooms}) => {
    const dispatch = useDispatch();
    const currentRoom = useSelector(selectChatState).currentRoom

    const onClick = (room: Room) => {
        if(currentRoom !== room.id){
            if (currentRoom !== "") {
                services.socketService.emit("leave-room", {
                    room: currentRoom,
                    user: localStorage.getItem("user"),
                })

                dispatch(setCurrentRoom(""))
                dispatch(setMessages([]))
                dispatch(setRoomUsers([]))
            }

            services.socketService.emit("join-room", {
                room: room.id,
                user: localStorage.getItem("user")
            })

            services.socketService.emit("list-room-users", {
                room: room.id
            })

            dispatch(setCurrentRoom(room.id))
        }
    }

    return (
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto h-full">
                {
                    rooms.map((room) => {
                      return(
                          <div key={room.id} onClick={() => onClick(room)} className={"flex flex-row py-4 px-2 justify-center items-center border-b-2 "
                            + (currentRoom === room.id ? "bg-blue-300" : "bg-white")} >
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
