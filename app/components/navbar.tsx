'use client'

import { useEffect, useState } from "react"

export function Navbar(){

    const [ActiveButton, setActiveButton] = useState("Home")

    return (
        <>
        <div className="flex flex-col text-slate-300 shadow-slate-400 text-xl bg-zinc-800 rounded-2xl justify-center items-center w-[500px] h-[50px] mt-[20px] ">
            <ul className="flex gap-8">
                <li>Home</li>
                <li>Dashboard</li>
                <li>Task</li>
                <li>About</li>
            </ul>
        </div>
        </>
    )
}