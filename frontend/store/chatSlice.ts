// @ts-nocheck

import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface ChatState {
    rooms: [],
    roomUsers: [],
    messages: [],
    currentRoom: string
}

// Initial state
const initialState: ChatState = {
    rooms: [],
    roomUsers: [],
    messages: [],
    currentRoom: ""
};

// Actual Slice

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // Action to set the authentication status
        setRooms(state, action) {
            state.rooms = action.payload;
        },
        addRoom(state, action) {
            if (state.rooms.find((room) => room.id === action.payload.id)) {
                return;
            }
            state.rooms.push(action.payload);
        },
        setCurrentRoom(state, action) {
            state.currentRoom = action.payload;
        },
        setRoomUsers(state, action) {
            console.log(action.payload)
            state.roomUsers = action.payload;
        },
        addMessage(state, action) {
            if (state.messages.find((message) => message.id === action.payload.id)) {
                 return;
            }
            state.messages.push(action.payload);
        },
        setMessages(state, action) {
            state.messages = action.payload;
        },

        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        extraReducers: {
            [HYDRATE]: (state: any, action: any) => ({
                ...state,
                ...action.payload.auth,
            }),
        },
    },
});

export const { setRooms, setRoomUsers, setMessages, setCurrentRoom, addRoom, addMessage } = chatSlice.actions;

export const selectChatState = (state: AppState) => state.chat;

export default chatSlice.reducer;
