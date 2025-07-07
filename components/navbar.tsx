"use client";

import React, { useEffect, useState, useCallback } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Box, ChartNoAxesColumn, Bug, Settings, CircleUserRound, LogOut } from "lucide-react";
import { logout } from "@/app/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { WaitListForm } from '@/components/waitlistform';

const NavbarComponent: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);


  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // const handleAuthClick = useCallback((formType: "login" | "signup" | "logout") => {
  //   router.push(`/auth/${formType}`);
  // }, [router]);


  const navItems = ["Home", "Features", "Solutions", "About"];

  const NavLinks = () => (
    <NavigationMenuList className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 md:gap-10 text-slate-300`}>
      {navItems.map((item) => (
        <NavigationMenuItem key={item}>
          <NavigationMenuLink
            className="px-4 py-2 rounded-xl transition-all hover:bg-slate-200 duration-275 ease-in-out cursor-pointer text-lg"
            onClick={() => {
              if (item === "Home") {
                router.push("/");
              } else {
                router.push(`/#${item.toLowerCase()}`);
              }
              if (isMobile) setIsOpen(false);
            }}
          >
            {item}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );

  return (
    <div className="w-full h-[110px] flex items-center justify-between px-4 md:px-8 font-satoshi shadow-xl relative">
      <div className="flex items-center w-full md:w-auto">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button
              className="text-white p-2 z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          )}
          {/* {!isMobile && (
            <Image
              src="/images/zenviz_logo.jpg"
              alt="ZenViz Logo"
              width={150}
              height={90}
              className="object-contain rounded-lg"
              priority
            />
          )} */}
        </div>

        {/* === MOBILE LOGIN/SIGNUP (FUTURE USE) === */}
        {/* 
        <div className="md:hidden flex items-center gap-2 ml-4">
          <button
            className="bg-zinc-800 text-slate-100 px-3 py-1 rounded-2xl text-sm transition-all duration-300 hover:bg-blue-500"
            onClick={() => handleAuthClick("login")}
          >
            Log In
          </button>
          <button
            className="bg-zinc-800 text-slate-100 px-3 py-1 rounded-2xl text-sm transition-all duration-300 hover:bg-purple-500"
            onClick={() => handleAuthClick("signup")}
          >
            Sign Up
          </button>
        </div>
        */}

        <div className="md:hidden p-4 ml-auto flex items-center" onClick={() => setShowWaitlistForm(true)}>
          <div className="bg-slate-300 rounded-2xl px-4 py-2 flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white">
            <span className="font-semibold text-black hover:text-white transition-colors duration-300">
              Join Waitlist ➔
            </span>
          </div>
        </div>
      </div>

      {/* <div className="hidden rounded-xl md:flex bg-zinc-600/60 backdrop-blur-md justify-center items-center absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenu className="rounded-xl ">
          <NavLinks />
        </NavigationMenu>
      </div> */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 rounded-xl bg-zinc-700/10 backdrop-blur-xl border-3 border-zinc-500/30 shadow-lg justify-center items-center">
          <Link href="/"><Image
              src="/images/zenviz_logo.jpg"
              alt="ZenViz Logo"
              width={110}
              height={40}
              className="p-2 rounded-xl object-contain rounded-lg"
              priority
          /></Link>
        <NavigationMenu className="p-2 rounded-xl">
          <NavLinks />
        </NavigationMenu>
      </div>


      {/* === DESKTOP LOGIN/SIGNUP (FUTURE USE) === */}
      {/* 
      <div className="hidden md:flex absolute right-4 gap-4">
        <button
          className="text-slate-100 px-4 py-2 rounded-2xl transition-all duration-300 hover:bg-blue-500"
          onClick={() => handleAuthClick("login")}
        >
          Log In
        </button>
        <button
          className="bg-zinc-800 text-slate-100 px-4 py-2 rounded-2xl transition-all duration-300 hover:bg-purple-500"
          onClick={() => handleAuthClick("signup")}
        >
          Sign Up
        </button>
      </div>
      */}
      <div className="hidden md:flex absolute right-4" onClick={() => setShowWaitlistForm(true)}>
        <button
          type="button"
          className="group relative overflow-hidden bg-white text-black hover:border-2 hover:border-slate-100 rounded-2xl px-6 py-3 flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0 pointer-events-none"
          />
          <span className="relative z-10 font-semibold text-lg group-hover:text-white">
            Join Waitlist ➔
          </span>
        </button>
      </div>

      {/* mobile navbar dropdown tabs :) */}
      {isMobile && isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-zinc-900 flex flex-col items-center gap-6 py-10 transition-all duration-300 z-40">
          <Image
            src="/images/zenviz_logo.jpg"
            alt="ZenViz Logo"
            width={130}
            height={70}
            className="object-contain rounded-lg"
            priority
          />

          <NavigationMenu>
            <NavLinks />
          </NavigationMenu>

          {/* Optional: Login/Signup for future */}
          {/*
          <div className="flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl"
              onClick={() => handleAuthClick("login")}
            >
              Log In
            </button>
            <button
              className="bg-purple-500 text-white px-4 py-2 rounded-2xl"
              onClick={() => handleAuthClick("signup")}
            >
              Sign Up
            </button>
          </div>
          */}
        </div>
      )}


      {showWaitlistForm && <WaitListForm onClose={() => setShowWaitlistForm(false)} />}
    </div>

  );
};

export const Navbar = React.memo(NavbarComponent);

const MainNavbarComponent: React.FC = () => {
  const router = useRouter();

  const handleLogoutClick = useCallback(async () => {
    const status = await logout();
    if (status === 200) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <div className="flex font-satoshi justify-center items-center w-[300px] h-screen">
        <div className="flex flex-col w-[280px] h-[650px] text-slate-100 rounded-3xl backdrop-blur-xs bg-slate-950/70 items-center border-2 border-slate-800">
          <a className="p-8 font-bold text-3xl">ZenViz</a>
          <ul className="flex flex-col text-lg gap-8">
            <li className="flex flex-row gap-4 items-center h-[60px] w-[230px] hover:cursor-pointer hover:rounded-xl hover:backdrop-blur-xs hover:bg-slate-500/20">
              <Box className="ml-[10px]"></Box>
              <span>Dashboard</span>
            </li>
            <li className="flex flex-row gap-4 items-center h-[60px] w-[230px] hover:cursor-pointer hover:rounded-xl hover:backdrop-blur-xs hover:bg-slate-500/20">
              <ChartNoAxesColumn className="ml-[10px]"></ChartNoAxesColumn>
              <span>Analytics</span>
            </li>
            <li className="flex flex-row gap-4 items-center h-[60px] w-[230px] hover:cursor-pointer hover:rounded-xl hover:backdrop-blur-xs hover:bg-slate-500/20">
              <Bug className="ml-[10px]"></Bug>
              <span>Reports</span>
            </li>
            <li className="flex flex-row gap-4 items-center h-[60px] w-[230px] hover:cursor-pointer hover:rounded-xl hover:backdrop-blur-xs hover:bg-slate-500/20">
              <Settings className="ml-[10px]"></Settings>
              <span>Settings</span>
            </li>
          </ul>
          <ul className="flex flex-col mt-[70px] gap-2 text-md">
            <li className="flex flex-row gap-2 items-center h-[50px] w-[230px] hover:cursor-pointer hover:rounded-xl hover:backdrop-blur-xs hover:bg-slate-500/20">
              <CircleUserRound className="ml-[10px]" />
              <span>Profile</span>
            </li>
            <li className="flex flex-row gap-2 items-center h-[50px] w-[230px] hover:cursor-pointer hover:rounded-xl hover:backdrop-blur-xs hover:bg-slate-500/20">
              <LogOut className="ml-[10px]" />
              <button className="hover:cursor-pointer" onClick={handleLogoutClick}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export const MainNavbar = React.memo(MainNavbarComponent);
