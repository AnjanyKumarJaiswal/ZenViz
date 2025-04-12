'use client'
import { useEffect, useState } from "react";
import { checkSession } from "@/app/lib/action";
import { MainNavbar } from "@/components/navbar";

export default function DashboardPage() {

  return (
    <section className="grid grid-cols-[300px_1fr] bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover h-screen">
      <MainNavbar/>
      <div className="text-4xl font-satoshi text-slate-200 text-start p-8">Welcome Back , David </div>
    </section>
  );
}
