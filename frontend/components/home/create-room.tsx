import React from "react";

const CreateRoom: React.FC = () => {

    return(
        <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
                <div className="font-semibold text-xl py-4">Create room</div>
                <div>
                    <input type="text" id="first_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                           placeholder="John" required />
                </div>
                <button type="button"
                        className="text-white bg-blue-400 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 mr-2 mb-2 focus:outline-none">Create
                </button>
            </div>
        </div>
    )
}

export default CreateRoom;
