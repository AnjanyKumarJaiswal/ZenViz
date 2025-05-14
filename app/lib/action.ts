

import {z} from "zod"
import axios from "axios";
import {useRouter} from "next/navigation"
import { data } from "framer-motion/client";

const SignUpSchema = z.object({
    fullName: z.string({
        required_error:"Full Name is Required"
    }),
    username : z.string({
        required_error: "Username is Required"
    }),
    email: z.string({
        required_error:"Email is Required"
    }).email(
        {message:"Invalid Email Address"}
    ).trim(),
    password: z.string().min(4,{message:"Password must be at least 4 characters"}).trim(),
    reTypepassword: z.string().min(4,{message:"Re-Entered Password must match the original Password"}).optional()
})  

export const httpClient = await axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await httpClient.post("/api/auth/login", {
            email, password
        });

        console.log(response.data)

        if (response.status=== 200) {
            return { success: true, "message":"Authorized" , data: response.data };

        } else {
            return { success: false, error: "Login failed" };
        }
    } catch (err) {
        console.error("Login error:", err);
        return { success: false, error: "Network error" };
    }
}

export async function forgetpass(formData: FormData){
    const email = formData.get("email")
    // try{
    //     const res = await httpClient.post("/api/auth/forget-password", {
    //         email
    //     });

    //     console.log(res.data)

    //     if(res.status === 200){
    //         return {success: true, message: "Successfully Done" , data: res.data}
    //     }


    // } catch(error){
    //     return {sucess:false , error: "Network Error"}
    // }
    const res = await httpClient.post("/api/auth/forget-password", {
            email
        });
}

export async function signup(formData: FormData) {
    const data = {
        username: formData.get("username"),
        fullName:formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    }
    const res = SignUpSchema.safeParse(data)

    if (!res.success) {
        console.log("Signup validation failed:", res.error)
        return
    }

    try{
        // const response = await fetch("http://localhost:5000/api/auth/signup",{
        //     method: "POST",
        //     headers: {
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify(data),
        //     credentials:"include",
        // })

        const response = await httpClient.post("/api/auth/signup",data)

        console.log(response.data)

        if(response.status === 200){
            // const data = await response.data
            return { success: true, "message":"New Sign Up and Authorized" , data: response.data };
        } else{
            // Return the error status for proper handling
            return { success: false, error: "Login failed" }
        }
    } catch(err){
        console.error("Invalid Login:", err)
        return { success: false, error: "Network error" }
    }
}

export async function logout() {
    try {
      const response = await httpClient.post("/api/auth/logout");
      return response.status;
    } catch (error) {
      console.log("Failed to Log-Out");
      return null;
    }
  }
  

export async function checkSession() {
    try {
        const response = await httpClient.get("/api/auth/callback/usersession", {
            withCredentials: true
        });


        if (!response.status) {
            return { error: "Unauthorized" };
        }

        const userData = await response.data;
        console.log("Session Data:", userData);
        return userData;
    } catch (err) {
        console.error("Session check failed:", err);
        return { error: "Network error" };
    }
}
