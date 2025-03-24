'use client'

import { useEffect, useState } from "react"
import { useRouter , usePathname } from "next/navigation"
import { LoginForm } from "../auth/loginForm"

export function Navbar(){

    const [ActiveButton, setActiveButton] = useState("Home")
    const [currentForm, setCurrentForm] = useState<"login" | "signup" | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = (formType: "login" | "signup") => {
        setCurrentForm(formType);
        router.push(`/${formType}`); 
    };

    useEffect(() => {
        if (pathname === "/login") {
        setCurrentForm("login");
        } else if (pathname === "/signup") {
        setCurrentForm("signup");
        }
    }, [pathname]);


    return (
        <>
        <div className="flex flex-row w-full h-[110px] justify-between items-center px-8 relative">
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col text-slate-300 text-xl bg-zinc-800 rounded-2xl justify-center items-center w-[550px] h-[50px]">
                <ul className="flex gap-16">
                <button className="hover:bg-zinc-600 hover:rounded-2xl hover:h-[38px] hover:w-[62px]">Home</button>
                <button>Dashboard</button>
                <button>Task</button>
                <button>About</button>
                </ul>
            </div>

            <div className="ml-auto flex w-[210px] h-[50px] justify-end items-center rounded-2xl">
      <ul className="flex gap-4">
        <button
          className="bg-zinc-800 text-slate-100 h-[40px] w-[70px] rounded-2xl cursor-pointer transition-all duration-[1500ms] hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white"
          onClick={() => handleClick("login")}
        >
          Login
        </button>
        <button
          className="bg-zinc-800 text-slate-100 h-[40px] w-[90px] rounded-2xl cursor-pointer transition-all duration-1000 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
          onClick={() => handleClick("signup")}
        >
          Sign-Up
        </button>
      </ul>

      {currentForm === "login" && <LoginForm />}
      {/* {currentForm === "signup" && <SignUpForm />} */}
    </div>
        </div>
        </>
    )
}