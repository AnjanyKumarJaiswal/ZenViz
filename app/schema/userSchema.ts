import { z } from "zod";

export const SignUpSchema = z.object({
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

export const newPassword = z.object({
    new_password: z.string().min(6,{message:"Password must be at least 6 characters"}),
    confirm_password: z.string()
}).refine((data) => data.new_password === data.confirm_password , {
    message: "Passwords do not match",
    path: ["confirm_password"]
})

export type Session = {
    userId: string,
    username: string,
    token?: string
}