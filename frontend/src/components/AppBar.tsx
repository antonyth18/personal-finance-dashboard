import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react";

type AppBarType = {
    heading: string
}

type UserDataType = {
    id: string,
    username: string,
    name: string,
    password: string
}

export default function AppBar({heading}: AppBarType) {

    const [userDetails, setUserdetails] = useState<UserDataType[]>([]);

    const token = localStorage.getItem("token");
    const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

    const fetchUser = async () => {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user`, config)
        setUserdetails(response.data.data);
    }

    useEffect(() => {
        fetchUser();
    },[])

    const user = userDetails[0];

    return <div className="border-b border-gray-700 flex justify-between items-center text-white pt-4 p-3">
        <div className="text-2xl font-bold">
            {heading}
        </div>

        <div className="flex items-center justify-center">
            <div className="flex items-center justify-center h-10 w-10 bg-gray-700 rounded-full">
                {user ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="pl-4 pr-2 font-medium">
                {user ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "loading..."}
            </div>
        </div> 
    </div>
}
