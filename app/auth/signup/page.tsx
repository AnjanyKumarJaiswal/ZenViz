"use client"

import {SignupForm} from "@/components/signup-form"
import { Navbar } from "@/components/navbar";

export default function SignUpPage(){
    return (
        <>
        <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover min-h-screen overflow-hidden">
                    <div className="w-full h-full flex flex-col">
                        <Navbar />
                        <div className="flex-grow flex items-center justify-center p-[20px]">
                            <SignupForm />
                        </div>
                    </div>
                </section>
        </>
    )
}