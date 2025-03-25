"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (formType: "login" | "signup") => {
    router.push(`/auth/${formType}`);
  };

  useEffect(() => {
    if (pathname === "/auth/login") {
    } else if (pathname === "/auth/signup") {
    }
  }, [pathname]);

  return (
    <div className="flex flex-row w-full h-[110px] justify-between items-center px-8 relative font-poppins">
      {/* Center Navbar */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col text-slate-300 text-xl bg-zinc-800 rounded-2xl justify-center items-center w-[600px] h-[50px]">
        <ul className="flex gap-12">
          <li>
            <button
              className="px-4 py-1 rounded-xl transition-all hover:bg-zinc-600"
              onClick={() => router.push("/")}
            >
              Home
            </button>
          </li>
          <li>
            <button className="px-4 py-1 rounded-xl transition-all hover:bg-zinc-600">
              Dashboard
            </button>
          </li>
          <li>
            <button className="px-4 py-1 rounded-xl transition-all hover:bg-zinc-600">
              Task
            </button>
          </li>
          <li>
            <button className="px-4 py-1 rounded-xl transition-all hover:bg-zinc-600">
              About
            </button>
          </li>
        </ul>
      </div>

      {/* Right-side Login/Signup */}
      <div className="ml-auto flex w-[210px] h-[50px] justify-end items-center rounded-2xl">
        <ul className="flex gap-4">
          <li>
            <button
              className="bg-zinc-800 text-slate-100 px-4 py-2 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white"
              onClick={() => handleClick("login")}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="bg-zinc-800 text-slate-100 px-4 py-2 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
              onClick={() => handleClick("signup")}
            >
              Sign-Up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
