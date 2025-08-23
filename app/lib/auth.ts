import axios from "axios";
import { SignUpSchema } from "../schema/userSchema";

export const httpClient = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export async function joinwaitlist(formData: FormData){
    const email = formData.get("email")

    try{
        const res = await httpClient.post("/api/waitlist",{
            email
        })

        if(res.status === 200){
            return {success: true, message:res.data.message}
        }
    } catch(error){
        return {"message": error}
    }
}

export async function login(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await httpClient.post("/api/auth/login", {
            email, password
        });
        if (response.status=== 200) {
            await new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve("delay")
                },2000)
            })
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
    
    try{
        const res = await httpClient.post("/api/auth/forget-password", {
            email
        });
        if(res.status === 200){
            return {success: true, message: "Successfully Done" , data: res.data}
        }

    } catch(error){
        return {sucess:false , error: error}
    }

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
        const response = await httpClient.post("/api/auth/signup",data)
        if(response.status === 200){
            return { success: true, "message":"New Sign Up and Authorized"};
        } else{
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
      return {"message": error};
    }
  }
export async function checkSession() {
    try {
        const response = await httpClient.get("/api/auth/session", {
            withCredentials: true
        });
        
        return { 
            success: response.status === 200,
            data: response.data,
            status: response.status 
        };
    } catch (error) {
        return { success: false, "error": error };
    }
}
