"use client"

import { LoginForm } from "@/components/login-form";
import { Navbar } from "@/components/navbar";

export default function LoginPage() {
    return (
        <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover min-h-screen overflow-hidden">
            <div className="flex flex-col w-full h-full flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center p-[30px]">
                    <LoginForm />
                </div>
            </div>
        </section>
    );
}
