'use client'

import {Navbar} from '../components/navbar';
import { useState, useEffect } from 'react';

export default function Home() {

  const [userAuthenticated, setUserAuthenticated] = useState("")

  return (
    <>
    <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover">
      <div className='flex flex-row justify-center font-poppins w-full h-screen bg-blend-overlay'>
        <Navbar/>
      </div>
    </section>
    </>
  );
}