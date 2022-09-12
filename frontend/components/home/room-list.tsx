import React from "react";

const RoomList: React.FC = () => {
    return (
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto h-full">
            <div
                className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
            >
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">Luis1994</div>
                    <span className="text-gray-500">Pick me at 9:00 Am</span>
                </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/otT2199XwI8/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">Everest Trip 2021</div>
                    <span className="text-gray-500">Hi Sam, Welcome</span>
                </div>
            </div>
            <div
                className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
            >
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">MERN Stack</div>
                    <span className="text-gray-500">Lusi : Thanks Everyone</span>
                </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">Javascript Indonesia</div>
                    <span className="text-gray-500">Evan : some one can fix this</span>
                </div>
            </div>
            <div className="flex flex-row py-4 px-2 items-center border-b-2">
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">Javascript Indonesia</div>
                    <span className="text-gray-500">Evan : some one can fix this</span>
                </div>
            </div>

            <div className="flex flex-row py-4 px-2 items-center border-b-2">
                <div className="w-1/4">
                    <img
                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                    />
                </div>
                <div className="w-full">
                    <div className="text-lg font-semibold">Javascript Indonesia</div>
                    <span className="text-gray-500">Evan : some one can fix this</span>
                </div>
            </div>
        </div>);
}

export default RoomList;
