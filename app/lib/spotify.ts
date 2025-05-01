"use client";

import { useState , useEffect } from "react";
import axios from "axios";

export const spotifyAuthorization = () =>{
    const [spotifyConnected , setSpotifyConnected] = useState(false)
    const [SpotifyisConnecting , setSpotifyisConnecting] = useState(false)

    const authorizeWindow = async () => {
        
        try{
            setSpotifyisConnecting(true)
            const response = await axios.post("http://localhost:5000/auth/authorize")
            const authUrl = response?.data

            const newSpotifyWindow =  window.open(authUrl,'Spotify Authorization', 'width=600 , height=600')
            


        } catch(e){
            setSpotifyisConnecting(false)
            return {"error": e}
        }
    }

    const authorizeWindowClose = async ()=>{
        
    }
}