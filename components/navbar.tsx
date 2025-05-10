"use client";

import React, { useEffect, useState, useCallback } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Box, ChartNoAxesColumn, Bug, Settings, CircleUserRound, LogOut } from "lucide-react";
import { logout } from "@/app/lib/action";
import Image from "next/image";

interface NavbarProps {}

const NavbarComponent: React.FC<NavbarProps> = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  const handleAuthClick = useCallback((formType: "login" | "signup" | "logout") => {
    router.push(`/auth/${formType}`);
  }, [router]);

  const navItems = ["Home", "Features", "Solutions", "Resources", "About"];

  const NavLinks = () => (
    <NavigationMenuList className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 md:gap-10 text-slate-300`}>
      {navItems.map((item) => (
        <NavigationMenuItem key={item}>
          <NavigationMenuLink
            className="px-4 py-2 rounded-xl transition-all hover:bg-zinc-600 cursor-pointer text-lg"
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
        <button
          className="md:hidden text-white p-2 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="flex items-center">
          <Image
            src="/images/zenviz_logo.jpg"
            alt="ZenViz Logo"
            width={150}
            height={90}
            className="object-contain rounded-lg"
            priority
          />
        </div>
        <div className="md:hidden flex items-center">
          <ul className="flex gap-2">
            <li>
              <button
                className="bg-zinc-800 text-slate-100 px-2 py-1 rounded-2xl text-sm cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white"
                onClick={() => handleAuthClick("login")}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                className="bg-zinc-800 text-slate-100 px-2 py-1 rounded-2xl text-sm cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
                onClick={() => handleAuthClick("signup")}
              >
                Sign-Up
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenu className="bg-zinc-800 rounded-xl">
          <NavLinks />
        </NavigationMenu>
      </div>
      <div className="hidden md:flex absolute right-4">
        <ul className="flex gap-4">
          <li>
            <button
              className="text-slate-100 px-4 py-2 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500 hover:text-white"
              onClick={() => handleAuthClick("login")}
            >
              Log In
            </button>
          </li>
          <li>
            <button
              className="bg-zinc-800 text-slate-100 px-4 py-2 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
              onClick={() => handleAuthClick("signup")}
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>

      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-zinc-800 z-40 flex flex-col items-center justify-center">
          <NavigationMenu>
            <NavLinks />
          </NavigationMenu>
        </div>
      )}
    </div>
  );
};

export const Navbar = React.memo(NavbarComponent);

interface MainNavbarProps {}

const MainNavbarComponent: React.FC<MainNavbarProps> = (props) => {
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
          <a className="p-8 font-bold text-3xl">Task Tracker</a>
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