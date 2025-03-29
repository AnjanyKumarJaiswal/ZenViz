"use server"
import {z} from "zod"


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
    reTypepassword: z.string().min(4,{message:"Re-Entered Password must match the original Password"})
})  

export async function login(formData: FormData){
    const email = formData.get('email')
    const password = formData.get('password')
    try{
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email,password})
        })
        if(response.ok){
            const data = await response.json()
            return data
        } else{
            throw new Error("Failed to Log-in")
        }
    } catch(err){
        console.log("Invalid Login!! Please Re-Check your Email and Password")
    }
}

export async function logout(){

}
export async function signup(formData: FormData) {

}
export async function signout(){

}