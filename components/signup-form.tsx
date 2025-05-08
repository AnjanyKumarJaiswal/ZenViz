"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signup , checkSession } from "@/app/lib/action"

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setStatus("")

    const formData = new FormData(event.currentTarget)
    try{
      const result = await signup(formData)
      if(result?.success === true){
        console.log("Redirecting.....")
        router.push("/dashboard")
        setStatus("Sign Up Done")
      } else{
        console.log("Failed to Login Please try again")
        console.log(result?.error)
      }
    } catch(error){
      setStatus("Sign Up Failed")
      return ({"mesage":"An unexpected error occurred","error":error})
    }
  }

  return (
    <div className="mx-auto space-y-4 h-[550px] w-[450px] backdrop-blur-xs bg-slate-950/70 border-2 border-slate-800 rounded-md font-satoshi">
      <div className="space-y-2 text-center p-4">
        <h1 className="text-3xl font-bold text-slate-100 dark:text-slate-300">Sign Up</h1>
        <p className="text-slate-300 dark:text-gray-400 ml-[15px] mr-[15px]">Create an account at ZenViz to get started</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 ml-[20px] mr-[20px]">
      {
          status === "Sign Up Failed" ? 
          (<div className="p-3 text-sm text-white bg-red-500 rounded">{status}</div>) : 
          (status === "Sign Up Done" ? (<div className="p-3 text-sm text-white bg-green-500 rounded">{status}</div>) : (<div></div>))
        }
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-100 dark:text-gray-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter your Name"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-slate-100 dark:text-gray-300">
            Username
          </label>
          <input
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-100 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-100 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        {/* <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div> */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <div className="text-center text-sm text-slate-100 dark:text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-500 font-bold dark:text-blue-400 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  )
}