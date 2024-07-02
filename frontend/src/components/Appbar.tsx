import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./Avatar"
import { useState } from "react";

export const Appbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin')
    };

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"} className="font-semibold font-xl flex justify-center items-center cursor-pointer">
            Medium
        </Link>

        <div className="flex ">
            <Link to={"/publish"} >
                <button type="button" className="mr-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 
                focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center me-2 mb-2 ">New</button>
            </Link>
            <div className="relative">
                    <div onClick={() => setDropdownVisible(!dropdownVisible)}>
                        <Avatar size="big" name={localStorage.getItem("name") || "Rakesh"}></Avatar>
                    </div>
                            {dropdownVisible && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
            </div>
        </div>
    </div>

}