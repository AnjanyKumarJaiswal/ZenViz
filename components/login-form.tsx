"use client"

import type React from "react"

import { useState , useActionState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { login  , checkSession} from "@/app/lib/action"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setStatus("")

    const formData = new FormData(event.currentTarget)
    try{
      const result = await login(formData)
      if (result && result.success) {
        
        const sessionCheck = await checkSession()
        
        if (sessionCheck && !sessionCheck.error) {
          console.log("Session verified, redirecting...")
          router.push("/dashboard")
        } else {
          return ({"message":"Session could not be established"})
        }
      } else {
        setStatus(result?.error || "Login failed")
      }
    } catch(err) {
      return ({"message":"An unexpected error occurred"})
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
    <div className="mx-auto space-y-4 h-[500px] w-[450px] backdrop-blur-xs bg-white/30 rounded-xl font-satoshi">
      <div className="space-y-2 text-center p-10">
        <h1 className="text-3xl font-bold text-gray-700 dark:text-slate-900">Login</h1>
        <p className="text-gray-900 dark:text-gray-700 ml-[15px] mr-[15px]">Enter your credentials to access your account</p>
      </div>
      <form  onSubmit={handleSubmit} className="space-y-4 ml-[20px] mr-[20px]">
        {
          status === "Login Failed" ? 
          (<div className="p-3 text-sm text-white bg-red-500 rounded">{status}</div>) : 
          (status === "Login Done" ? (<div className="p-3 text-sm text-white bg-green-500 rounded">{status}</div>) : (<div></div>))
        }
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-300">
              Password
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="text-center text-sm text-gray-900 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
    </>
  )
}