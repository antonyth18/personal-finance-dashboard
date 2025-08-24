import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

type SignupInput = {
    name: string;
    username: string;
    password: string;
};

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup":"signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/dashboard");
        } catch(e){

        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold pl-5 pr-5 pb-3">
                    {type === "signup"? "Create an account":"Log in to your account" }       
                </div>

                <div className="text-slate-500 text-center">
                    {type === "signup"? "Already have an account?": "Don't have an account?"}
                    <Link className="underline" to = {type === "signup"? "/signin": "/signup"}> {type === "signup"? "Login" : "Sign Up"} 
                    </Link>         
                </div>

                {type ==="signup" ? <InputBox label="Name" placeholder="John Doe" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                }}/>: null}

                <InputBox label="Username" placeholder="Enter your username" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        username: e.target.value
                    })
                }}/>

                <InputBox label="Password" type = "password" placeholder="Enter your password" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                }}/>

                <div className="pt-3">
                    <button type="button" onClick={sendRequest} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                </div>

            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const InputBox = ({label, placeholder, onChange, type}: LabelledInputType) => {
    return <div>
        <div className="pt-2 pb-2">
            <label  className="block mb-2 text-sm font-semibold text-gray-900 ">{label}</label>
            <input onChange={onChange} type= {type || "text"} className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder= {placeholder}/>
        </div>
    </div>
}