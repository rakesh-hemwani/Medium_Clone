import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignUpInput } from "@rakesh_hemwani/medium-common/dist";
import { LabelledInput } from "./LabelInput";
import { BACKEND_URL } from "../config";
import axios from "axios"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    /*{ type }: { type: "signup" | "signin" }*/
    const navigate = useNavigate();
    const [postInput, setPostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: ""
    })
    async function sendSignUpRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"?"signup":"signin"}`, postInput);
            const res = response.data;
            localStorage.setItem("token",res.jwt);
            localStorage.setItem("id",res.id)
            localStorage.setItem("name",res.name);
            navigate("/blogs");
        }catch(e){
            console.log(e);
            alert("Some error occured!")
        }
    
    }
    return <div className="h-screen flex justify-center flex-col">
        {/* <!--- {JSON.stringify(postInput)} --->*/}
        <div className="flex justify-center">
            <div className="px-10 w-full max-w-md">
                <div className="text-3xl text-center font-extrabold">
                    {type==="signup"?"Create an Account":"Login to your account"}
                </div>
                <div className="text-slate-800 text-center mt-1 -2">
                    {type === "signup" ? "Already have an account?" : "Don't have an account"}
                    <Link className="no-underline hover:underline hover:text-blue-500 " to={ type === "signup" ?"/signin" : "/signup"}> 
                    {type === "signup" ? " Sign In" : " Sign Up"}</Link>
                </div>
                <div className="mt-4 w-full max-w-md">
                    {type === "signup" &&<LabelledInput label="Name" placeholder="Rakesh Hemwani" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        })
                        )
                    }} />} 
                    <LabelledInput label="Email" placeholder="Rakesh@gmail.com" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            email: e.target.value
                        })
                        )
                    }} />
                    <LabelledInput label="Password" type="password" placeholder="***********" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        })
                        )
                    }} />
                </div>
                <button onClick={sendSignUpRequest} type="button" className=" rounded-md text-md mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 font-bold ">{type === "signup" ? "Sign Up" : "Sign In"}</button>
            </div>
        </div>
    </div>
}
