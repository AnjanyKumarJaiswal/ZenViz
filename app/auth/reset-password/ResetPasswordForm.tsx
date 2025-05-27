"use client";

import { httpClient } from "@/app/lib/action";
import { useEffect, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { newPassword } from "@/app/lib/action";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    async function verifying_token() {
      if (!token) return;
      try {
        const res = await httpClient.post(
          `http://localhost:5000/api/auth/verifying-token/${token}`
        );
        if (res.status === 200) {
          console.log("Token verification successful");
        } else {
          console.error("Token verification failed with status:", res.status);
          // Potentially redirect or show error
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        // Potentially redirect or show error
        return {"message": error}
      }
    }

    if (token) {
      verifying_token();
    } else {
      // console.log("No token found in URL.");
      // Handle no token, maybe redirect to forgot password or show an error message
      // router.push('/auth/forgot-password?error=missing_token');
    }
  }, [token, router]); // Added router to dependencies if used in effect for redirection

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const new_pass_data = {
      newpassword: formData.get("new-password"),
      confirmpassword: formData.get("confirm-password"),
    };

    const validationResult = newPassword.safeParse(new_pass_data);
    if (!validationResult.success) {
      console.log("Password validation failed:", validationResult.error.flatten().fieldErrors);
      // TODO: Display these errors to the user
      return;
    }

    if (!token) {
        console.error("Token is not available for password reset.");
        // TODO: Display error to user
        return;
    }

    try {
      const res = await httpClient.post(
        "http://localhost:5000/api/auth/new-password",
        validationResult.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        // const errorData = await res.data;
        // console.error("Password reset failed with status:", res.status, errorData);
        // TODO: Display error message to user from errorData if available
      }
    } catch (error) {
      // console.error("An error occurred during password reset:", error);
      // TODO: Display generic error message to user
      return {"message": error}
    }
  }

  return (
    <div className=" flex justify-center w-full p-10  h-[700px] ">
      <div className="flex flex-col gap-4 w-[550px] h-[450px] justify-center items-center  text-slate-100 rounded-3xl backdrop-blur-xs bg-slate-950/50 border-2 border-slate-500">
        <KeyRound />
        <div className="flex flex-col">
          <p className="text-center text-2xl">Reset Password</p>
          <p className="text-center text-md text-slate-300">
            To change your password make sure you enter same password for both.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col p-4 space-y-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="new-password"
              className="block text-md font-medium text-slate-100 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              id="new-password"
              name="new-password"
              type="password"
              placeholder="Enter your New Password"
              required
              className="w-[400px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirm-password"
              className="block text-md font-medium text-slate-100 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Re-enter your New Password"
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
  );
}