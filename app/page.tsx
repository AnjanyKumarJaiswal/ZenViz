'use client'

import {Navbar} from '../components/navbar';
import { useState, useEffect } from 'react';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion";

export default function Home() {
  const router = useRouter()

  const trymeclick = () =>{
    router.push("/auth/login")
  }

  const learnmoreclick = () => {
    router.push("/#features")
  }

  const zenvizSentence = [
  { text: 'Q', className: "text-zinc-300" },
  { text: '.', className: "text-zinc-300" },
  { text: 'What', className: "text-zinc-300" },
  { text: 'can', className: "text-zinc-300" },
  { text: 'you', className: "text-zinc-300" },
  { text: 'do', className: "text-zinc-300" },
  { text: 'with', className: "text-zinc-300" },
  { text: 'ZenViz', className: "text-zinc-300" },
  { text: '?', className: "text-zinc-300" },
  { text: '.', className: "text-zinc-300" },
  { text: '.', className: "text-zinc-300" },
  { text: '.', className: "text-zinc-300" },
];
const zenvizfeatures = [
  { 
    text: 'Visualize',
    className: "text-zinc-300"
   },
  { 
    text: 'Learn Git',
    className: "text-zinc-300"
   },
  { 
    text: "Explore Repo's",
    className: "text-zinc-300"
   },
  { 
    text: 'Understand Code',
    className: "text-zinc-300"
   },
  { 
    text: 'Deploy Apps',
    className: "text-zinc-300"
   },
  { 
    text: 'Vibe to Music',
    className: "text-zinc-300"
   }
]


  return (
    <>
    <main className='scroll-smooth'>
    <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover">
      <div className='flex flex-col items-center  w-full h-screen bg-blend-overlay'>
        <motion.div
        initial={{opacity: 0, y: -50}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1.25}}
        className='w-full'>
          <Navbar/>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col font-satoshi p-4 sm:p-6 lg:p-8 w-full max-w-4xl mt-24 justify-center items-center text-center"
          >
            <p className="text-5xl sm:text-7xl lg:text-8xl text-slate-200">
              ZenViz
            </p>

            <motion.p 
            initial={{opacity: 0, x: -100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1.25}} 
            className="mt-4 text-lg sm:text-xl lg:text-2xl text-zinc-500 font-bold max-w-2xl">
              See code. Feel flow. Master real-world development and deployment.
            </motion.p>

            <div className="flex flex-wrap gap-4 justify-center items-center mt-6">
              <motion.button
               initial={{opacity: 0, x: -200}}
               animate={{opacity: 1, x: 0}}
               transition={{duration: 0.95}}
               className="text-slate-100 cursor-pointer w-40 h-12 rounded-xl bg-blue-600" onClick={trymeclick}>
                Try ZenViz
              </motion.button>
              <motion.button 
              initial={{opacity: 0, x: 200}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.95}}
              onClick={learnmoreclick}
              className="text-zinc-900 cursor-pointer w-40 h-12 rounded-xl bg-slate-200">
                Learn more →
              </motion.button>
            </div>

            <motion.p 
            initial={{opacity: 0, x: 100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1.25}}
            className="mt-6 text-base sm:text-lg lg:text-2xl text-slate-400 max-w-4xl">
              An immersive Git/Github-powered learning experience that helps you visualize, build, deploy, and grow — the way real developers do it.
            </motion.p>
          </motion.div>
      </div>
      </section>

      <section id='features' className="bg-black bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col w-full h-screen font-satoshi">
          <motion.div 
          initial={{opacity: 0, x: -100}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 1}}
          className='flex flex-col p-4 w-full h-[200px]'>
            <TypewriterEffectSmooth words={[...zenvizSentence, ...zenvizfeatures]}/>
          </motion.div>
        </div>
      </section>

      <section id='solutions' className="bg-[url('/images/light_mist.jpg')] bg-center bg-no-repeat bg-cover">
        <div className='flex flex-col w-full h-screen'>

        </div>
      </section>
      </main>
    </>
  );
}