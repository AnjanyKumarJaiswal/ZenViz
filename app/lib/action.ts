

import {z} from "zod"
import axios from "axios";

const SignUpSchema = z.object({
    fullName: z.string({
        required_error:"Full Name is Required"
    }),
    email: z.string({
        required_error:"Email is Required"
    }).email(
        {message:"Invalid Email Address"}
    ).trim(),
    password: z.string().min(4,{message:"Password must be at least 4 characters"}).trim(),
    reTypepassword: z.string().min(4,{message:"Re-Entered Password must match the original Password"}).optional()
})  

const httpClient = await axios.create({
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

export async function signup(formData: FormData) {
    const data = {
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
        const response = await fetch("http://localhost:5000/api/auth/signup",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data),
            credentials:"include",
        })
        if(response.ok){
            const data = await response.json()
            return { success: true, data }
        } else{
            // Return the error status for proper handling
            return { success: false, error: "Login failed" }
        }
    } catch(err){
        console.error("Invalid Login:", err)
        return { success: false, error: "Network error" }
    }
}

export async function checkSession() {
    try {
        const response = await httpClient.get("/api/auth/current_user", {
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
