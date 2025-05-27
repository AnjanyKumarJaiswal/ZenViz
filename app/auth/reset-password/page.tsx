"use client"

import { Navbar } from "@/components/navbar"
import { httpClient } from "@/app/lib/action";
import { useEffect, useState } from "react"
import { useSearchParams , useRouter} from "next/navigation";
import { KeyRound } from "lucide-react";
import { newPassword } from "@/app/lib/action";

export default function NewPassWord(){

    const [verifying , setVerifying] = useState("")
    const [passreset , setPassReset] = useState("")
    const searchparams = useSearchParams()
    const router = useRouter()
    const token = searchparams.get("token")

    async function verifying_token(){
        try{
        const res = await httpClient.post(`http://localhost:5000/api/auth/verifying-token/${token}`
        )
        if(res.status == 200){
            setVerifying("Token Verified for Password Change")
            return {success: 200, message: verifying}
        }
        } catch(e){
            setVerifying("Token Could not be verified")
            return ({"message": verifying})
        }
    }

    useEffect(()=>{
        if(token){
            verifying_token();
        }
    }, [token])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        
        event.preventDefault()
        setPassReset("")

        const formData = new FormData(event.currentTarget)

        const new_pass_data = {
            newpassword: formData.get("new-password"),
            confirmpassword : formData.get("confirm-password")
        }
        
        try{
            const validate_pass = newPassword.safeParse(new_pass_data)
            const res = await httpClient.post("http://localhost:5000/api/auth/new-password",
                new_pass_data,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if(res.status === 200){
                setPassReset("New PassWord has been changed now you login with the new password")
                setTimeout(()=>{
                    router.push("/auth/login")
                }, 2000)
            }
        } catch(error){
            console.log(error)
            return {"mesage": error}
        }
    }
    

    return (
        <>
        <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover min-h-screen overflow-hidden">
            <div className="w-full h-screen font-satoshi">
                <Navbar/>
                <div className=" flex justify-center w-full p-10  h-[700px] ">
                    <div className="flex flex-col gap-4 w-[550px] h-[450px] justify-center items-center  text-slate-100 rounded-3xl backdrop-blur-xs bg-slate-950/50 border-2 border-slate-500">
                        <KeyRound />
                        <div className="flex flex-col"> 
                            <p className="text-center text-2xl">
                                Reset Password
                            </p>
                            <p className="text-center text-md text-slate-300">
                                To change your password make sure you enter same password for both.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col p-4 space-y-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="block text-md font-medium text-slate-100 dark:text-gray-300">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    name="new-password"
                                    type="password"
                                    placeholder="Enter your New Password"
                                    required
                                    className="w-[400px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="block text-md font-medium text-slate-100 dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <input
                                    id="password2"
                                    name="confirm-password"
                                    type="password"
                                    placeholder="Enter your New Password"
                                    required
                                    className="w-[400px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-[400px] flex font-medium justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md text-white bg-blue-600 hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                                >
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}