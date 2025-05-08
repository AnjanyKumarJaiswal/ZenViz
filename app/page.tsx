'use client'

import { Navbar } from '../components/navbar'; 
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {

  const router = useRouter()

  const trymeclick = () =>{
    router.push("/auth/login")
  }

  const learnmoreclick = () => {
    router.push("/#features")
  }

  const zenvizSentence = ['Q','.','What', 'can', 'you', 'do', 'with', 'ZenViz','?','.','.','.']
  const words = ['Visualize', 'Learn Git', "Explore Repo's", 'Understand Code', 'Deploy Apps', 'Vibe to Music'];

  const [displayedWords, setDisplayedWords] = useState<string[]>([])
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typingBase' | 'actionTyping' | 'actionDeleting'>('typingBase')

  const [actionIndex, setActionIndex] = useState(0)
  const [actionCharIndex, setActionCharIndex] = useState(0)
  const [actionText, setActionText] = useState('')

  const [blink, setBlink] = useState(true)
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink(prev => !prev), 500)
    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (phase !== 'typingBase') return

    if (wordIndex < zenvizSentence.length) {
      const timeout = setTimeout(() => {
        setDisplayedWords(prev => [...prev, zenvizSentence[wordIndex]])
        setWordIndex(prev => prev + 1)
      }, 400)
      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => setPhase('actionTyping'), 1000)
    }
  }, [wordIndex, phase])

  useEffect(() => {
    if (phase !== 'actionTyping') return
    const currentAction = words[actionIndex]
    if (actionCharIndex < currentAction.length) {
      const timeout = setTimeout(() => {
        setActionText(currentAction.substring(0, actionCharIndex + 1))
        setActionCharIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => setPhase('actionDeleting'), 1000)
    }
  }, [actionCharIndex, phase, actionIndex])


  useEffect(() => {
    if (phase !== 'actionDeleting') return
    if (actionCharIndex > 0) {
      const timeout = setTimeout(() => {
        setActionText(words[actionIndex].substring(0, actionCharIndex - 1))
        setActionCharIndex(prev => prev - 1)
      }, 40)
      return () => clearTimeout(timeout)
    } else {
      setActionIndex(prev => (prev + 1) % words.length)
      setPhase('actionTyping')
    }
  }, [actionCharIndex, phase, actionIndex])


  return (
    <>
    <section className="bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover">
      <div className='flex flex-col items-center  w-full h-screen bg-blend-overlay'>
        <div className='w-full'>
          <Navbar/>
        </div>

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
              id="features"
              initial={{opacity: 0, x: 200}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 0.95}}
              // onClick={learnmoreclick}
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
          className='flex flex-row p-4 w-full h-[200px]'>
            <div className="text-zinc-400 text-6xl font-bold flex flex-wrap gap-2 p-6">
              {displayedWords.map((word, idx) => (
                <span key={idx}>{word}</span>
              ))}
            </div>
            {phase !== 'typingBase' && (
              <div className="text-zinc-400 text-6xl font-semibold mt-4 h-12">
                {actionText}
                <span className="text-zinc-500">{blink ? '|' : ' '}</span>
              </div>
            )}
            </motion.div>
        </div>
    </section>

      {/* Solutions */}
      <section className="bg-[url('/images/light_mist.jpg')] bg-center bg-no-repeat bg-cover">
        <div className='flex flex-col w-full h-screen'>
            
        </div>
      </section>

    </>
  );
}
