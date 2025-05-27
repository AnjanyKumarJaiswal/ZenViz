"use client"

import { Navbar } from "@/components/navbar"
import { useState } from "react"
import { MailCheck , Fingerprint} from "lucide-react"
import Link from "next/link"
import { forgetpass } from "@/app/lib/action"
import { useRouter } from "next/navigation"

export default function ForgotPassword(){

    const [status, setStatus] = useState("")
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        setStatus("")

        const formData = new FormData(event.currentTarget)

        try{
            const res = await forgetpass(formData)
            setStatus("Reset PassWord Link has been sent! Please Kindly check your Email")
            if(res?.success === true){
                setTimeout(() => {
                    router.push("/")
                    }, 2000)
            }
        } catch(e){
            setStatus("Failed to Send Reset Password Change Email , Kindly Re-Check Your Email")
            return ({"mesage":"An unexpected error occurred", "error": e})
        }
    }

    return (
        <>
        <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover min-h-screen overflow-hidden">
            <div className="w-full h-screen font-satoshi">
                <Navbar/>
                <div className=" flex justify-center w-full p-10  h-[700px] ">
                    <div className="flex flex-col gap-4 w-[550px] h-[500px] justify-center items-center  text-slate-100 rounded-3xl backdrop-blur-xs bg-slate-950/50 border-2 border-slate-500">
                        <Fingerprint className=""/>
                        <div className="flex flex-col"> 
                            <p className="text-center text-2xl">
                                Forgot Password?
                            </p>
                            <p className="p-2 text-center text-md text-slate-300">
                                No worriess, we'll send you a password reset url to your email to change your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col p-4 space-y-4">
                            
                            {status && (
                                <div className={`flex flex-col items-center justify-center gap-2 p-2 rounded-lg w-[400px] h-[120px]  text-center ${
                                    status.includes("Reset PassWord Link") ? "bg-green-600 text-white" : "bg-red-500 text-white"
                                }`}>
                                    {status.includes("Reset PassWord Link") && <MailCheck className="h-6 w-6" />}
                                    <p className="text-md font-medium">{status}</p>
                                </div>
                            )}

                            <div className="flex flex-row gap-2">
                                <label htmlFor="email" className="block text-md font-medium text-slate-100 dark:text-gray-300">
                                    Email
                                </label>
                                <MailCheck className="ml-auto"/>
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your Email"
                                required
                                className="w-[400px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                            <button
                                type="submit"
                                className="w-[400px] flex font-medium justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md text-white bg-blue-600 hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                                >
                                Send Password Change Link
                            </button>
                        </form>
                        <Link href="/auth/login" className="text-lg text-center hover:cursor-pointer">
                            ← Back to Log-in Page
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}