"use client"

import { useEffect, useState , useRef} from "react";
import { useRouter } from "next/navigation";
import {checkSession} from "../lib/auth"
import { MainNavbar } from "@/components/navbar";
import { Music } from "lucide-react";
import { User } from "../schema/userSchema";


export default function DashboardPage() {

  const [user, setUser] = useState<User | null >(null);
  // const [spotifyUser, setSpotifyUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  
  const currentDate = new Date()

  const monthTimeline:{[key:number] : string } = {
    1 : "January",
    2 : "February",
    3 : "March",
    4 : "April",
    5 : "May",
    6 : "June",
    7 : "July",
    8 : "August",
    9 : "September",
    10 : "October",
    11 : "November",
    12 : "December"
  }

  const hasFetched = useRef(false); 

  useEffect(() => {
      if (hasFetched.current) return;  
      hasFetched.current = true;

      const authenticateUser = async () => {
        try {
          setLoading(true);
          const resp = await checkSession();
          console.log("The response from server", resp);
          if (resp.success) {
            // setUser(resp.data);
            setUser(resp?.data.data);
          } else {
            router.push("/auth/login");
          }
        } catch (error) {
          router.push("/auth/login");
          console.error(error)
        } finally {
          setLoading(false);
        }
      };

      authenticateUser();
    }, [router]);

  // if(loading) return <LoadingSpinner/>


  return (
    <section className="grid grid-cols-[300px_1fr] bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover h-screen">
      <MainNavbar/>
      <div className="text-4xl font-satoshi text-slate-200 p-8">
        
        {(user != null) ? (<p>Welcome Back, {user.username}</p> ) :  ( loading )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 px-4">

          <div className="flex flex-col gap-4 w-full">

            <div className="flex flex-col rounded-lg bg-slate-100/70 backdrop-blur-2xl p-4 w-full h-[25vh] min-h-[150px]">
              <div className="flex flex-wrap justify-between items-center mb-2">
                <p className="text-2xl font-bold text-black">Today's Task</p>
                {currentDate.getMonth() in monthTimeline && (
                  <p className="text-xl text-black">
                    {monthTimeline[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}
                  </p>
                )}
              </div>
              <div className="flex flex-col overflow-y-auto">
                {/* user task will be displayed over here i will write the logic after setting up frontend design :) */}
              </div>
            </div>

            <div className="flex flex-col rounded-lg bg-slate-100/70 backdrop-blur-2xl p-4 w-full h-[30vh] min-h-[200px]">
              <p className="text-black text-2xl text-start">Github Organisation's</p>
              {/* i need to implement a fetch backend api request to get details of the github user and his organisations :)*/}
            </div>
            
            <div className="flex flex-col rounded-lg bg-slate-100/70 backdrop-blur-2xl p-4 w-full h-[20vh] min-h-200px]">
                <p className="text-black text-2xl text-start">
                  Github Commits
                </p>
                <div>
                  {/* i need to implement a fetch backend api request to get details of the github user and his commits :)*/}
                </div>
            </div>

          </div>

          {/* Right Side Card */}
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <div className="flex flex-col rounded-lg bg-slate-100/70 backdrop-blur-2xl p-4 w-full h-[40vh] min-h-[300px]">
              <p className="text-black text-2xl text-start">Project TimeLine</p>
            </div>
            <div className="flex flex-col rounded-lg bg-slate-100/70 backdrop-blur-2xl p-4 w-full h-[20vh] min-h-[250px]">
                <p className="text-black text-lg text-start">Spotify</p>
                <div className="flex h-[30px] w-full gap-4 p-2">
                  <Music className="bg-black rounded-md w-[30px] h-[30px]"/>
                  <p className="text-black text-2xl text-center">Now Playing</p>
                </div>
                <div>
                  {/* i need to implement spotify api and write a frontend logic to fetch details :) */}
                </div>
            </div>
          </div>

          </div>

      </div>

    </section>
  );
}
