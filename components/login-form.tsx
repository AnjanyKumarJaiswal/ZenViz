"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { login  , checkSession } from "@/app/lib/auth"
import { OauthLogin, exisitingGithubUser } from "@/app/lib/authProviders"
import { Github } from "lucide-react"

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus("");

    const formData = new FormData(event.currentTarget)
    try{
      const result = await login(formData);
      if (result && result.success) {
        const sessionCheck = await checkSession();
        
        if (sessionCheck && !sessionCheck.error) {
          console.log("Session verified, redirecting...");
          router.push("/dashboard");
        } else {
          return ({"message":"Session could not be established"});
        }
      } else {
        setStatus(result?.error || "Login failed")
      }
    } catch{
      return ({"mesage":"An unexpected error occurred"})
    } finally {
      setIsLoading(false)
    }
  }
  type OAuthService = "github" | "google";

  async function handleOauth(oauth_type: OAuthService) {
    try {
      const response = await exisitingGithubUser();
      if (!response?.success) {
        const res = await OauthLogin(oauth_type);
        const auth_url = res?.message.url;
        window.open(auth_url, "_blank", "width=500,height=600");
      } else {
        const session = await checkSession();
        if (session?.status === 200) {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      return { error };
    }
  }

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_SUCCESS') {
        console.log("Logged in as", event.data.username);
        router.push("/dashboard");
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [router]);

  return (
    <>
    <div className="mx-auto space-y-4 h-[520px] w-[450px] backdrop-blur-xs bg-slate-950/70 border-2 border-slate-700 rounded-md font-satoshi">
      <div className="space-y-2 text-center p-10">
        <h1 className="text-3xl text-slate-100 dark:text-slate-900">Welcome Back to ZenViz</h1>
        <p className="text-slate-300 dark:text-gray-700 ml-[15px] mr-[15px]">Hey there, Zenviz is your specialized personal space as Developers</p>
      </div>

      <form  onSubmit={handleSubmit} className="space-y-4 ml-[20px] mr-[20px]">
        {
          status === "Login Failed" ? 
          (<div className="p-3 text-sm text-white bg-red-500 rounded">{status}</div>) : 
          (status === "Login Done" ? (<div className="p-3 text-sm text-white bg-green-500 rounded">{status}</div>) : (<div></div>))
        }
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-100 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your Email"
            required
            className="w-full px-3 py-2 text-slate-300 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-slate-100 dark:text-gray-300">
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center text-sm text-slate-100 dark:text-gray-400">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-blue-500 font-bold   dark:text-blue-400 hover:underline">
          Sign up
        </Link>
      </div>

      <div className="flex flex-row justify-between items-center space-x-4 p-4 max-w-[440px] w-full mx-auto">
        <div className="flex-1 h-10  flex items-center justify-center bg-black rounded-lg shadow text-white border-2 border-slate-300/50">
          <button 
          className="flex flex-row gap-2 hover:cursor-pointer"
          onClick={() => { handleOauth('github')}}
          >
            <Github/>
            Sign in with GitHub
          </button>
        </div>
        <div className="flex-1 h-10 flex items-center justify-center bg-black rounded-lg shadow text-white border-2 border-slate-300/50">
          <button 
          className="flex flex-row gap-2 hover:cursor-pointer"
          onClick={()=>{handleOauth('google')}}
          >
            <div className="bg-[url('/images/google2.png')] bg-no-repeat bg-cover h-[22px] w-[22px]"/>
            Sign in with Google
          </button>
        </div>
      </div>


    </div>
    </>
  )
}