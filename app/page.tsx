'use client';

import {Navbar} from '../components/navbar';
import { useState, useEffect , useCallback } from 'react';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion";
import { cn } from "@/lib/utils";
import { InitialSentenceTyper } from '@/components/InitialSentenceTyper';

interface Word {
  text: string;
  className: string;
}

// Move these arrays outside the component
const zenvizSentence: Word[] = [
  { text: 'Q', className: "text-zinc-100 font-bold" },
  { text: '.', className: "text-zinc-100 font-bold" },
  { text: 'What ', className: "text-zinc-100 font-bold" },
  { text: 'can ', className: "text-zinc-100 font-bold" },
  { text: 'you ', className: "text-zinc-100 font-bold" },
  { text: 'do ', className: "text-zinc-100 font-bold" },
  { text: 'with ', className: "text-zinc-100 font-bold" },
  { text: 'ZenViz ', className: "text-zinc-500 font-bold" },
  { text: '?', className: "text-zinc-100 font-bold" },
  { text: '.', className: "text-zinc-100 font-bold" },
  { text: '.', className: "text-zinc-100 font-bold" },
  { text: '.', className: "text-zinc-100 font-bold" },
];

const zenvizfeatures: Word[] = [
  { text: 'Visualize', className: "text-blue-400" },
  { text: 'Learn Git', className: "text-green-400" },
  { text: "Explore Repo's", className: "text-purple-400" },
  { text: 'Understand Code', className: "text-orange-400" },
  { text: 'Deploy Apps', className: "text-red-400" },
  { text: 'Vibe to Music', className: "text-pink-400" }
];

export default function Home() {
  const router = useRouter();

  const trymeclick = () => {
    router.push("/auth/login");
  };

  const learnmoreclick = () => {
    router.push("/#features");
  };

  const INITIAL_SENTENCE_CHAR_DELAY_MS = 150;
  const TYPING_SPEED_MS = 60;
  const PAUSE_AFTER_FEATURE_MS = 4000;
  const PAUSE_AFTER_INITIAL_MS = 500;

  const [isInitialSentenceComplete, setIsInitialSentenceComplete] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const handleInitialSentenceComplete = useCallback(() => {
    setIsInitialSentenceComplete(true);
  }, []);

  useEffect(() => {
    if (!isInitialSentenceComplete || zenvizfeatures.length === 0) {
      return;
    }
    const currentFeatureText = zenvizfeatures[currentFeatureIndex].text;
    const currentFeatureLength = currentFeatureText.length + 1;
    const estimatedFeatureTypingTime = currentFeatureLength * TYPING_SPEED_MS;
    const cycleDelay = estimatedFeatureTypingTime + PAUSE_AFTER_FEATURE_MS;
    const featureCycleTimer = setTimeout(() => {
      setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % zenvizfeatures.length);
    }, cycleDelay);
    return () => clearTimeout(featureCycleTimer);
  }, [isInitialSentenceComplete, currentFeatureIndex]);

  const cursorClass = "inline-block w-[3px] h-[0.8em] bg-zinc-300 -mb-[0.1em] ml-px";


  return (
    <>
    <main className='scroll-smooth'>

      {/* Home SEction */}
      <section className="hero bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover">
        <div className='flex flex-col items-center w-full h-screen bg-blend-overlay'>
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
            className="flex flex-col font-satoshi p-4 sm:p-6 lg:p-8 w-full max-w-4xl mt-16 md:mt-24 justify-center items-center text-center"
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
                className="text-slate-100 cursor-pointer w-36 sm:w-40 h-12 rounded-xl bg-blue-600 text-sm sm:text-base" onClick={trymeclick}>
                Try ZenViz
              </motion.button>
              <motion.button
                initial={{opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.95}}
                onClick={learnmoreclick}
                className="text-zinc-900 cursor-pointer w-36 sm:w-40 h-12 rounded-xl bg-slate-200 text-sm sm:text-base">
                Learn more →
              </motion.button>
            </div>
            <motion.p
              initial={{opacity: 0, x: 100}}
              animate={{opacity: 1, x: 0}}
              transition={{duration: 1.25}}
              className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl">
              An immersive Git/Github-powered learning experience that helps you visualize, build, deploy, and grow — the way real developers do it.
            </motion.p>
          </motion.div>
        </div>
      </section>


      {/* Features Section */}
      <section id='features' className="features bg-black bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col justify-center items-center w-full min-h-screen font-satoshi p-4 sm:p-6 md:p-8">
          <motion.div
            initial={{opacity: 0, x: -100}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 1}}
            className='flex flex-col w-full max-w-5xl'
          >
            <div className={cn(
              "flex flex-wrap items-baseline justify-center text-center",
              "font-satoshi",
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            )}>
              {!isInitialSentenceComplete && (
                <InitialSentenceTyper
                  zenvizSentence={zenvizSentence}
                  onComplete={handleInitialSentenceComplete}
                  charDelayMs={INITIAL_SENTENCE_CHAR_DELAY_MS}
                  cursorClassProp={cursorClass}
                  pauseAfterInitialMs={PAUSE_AFTER_INITIAL_MS}
                />
              )}

              {isInitialSentenceComplete && (
                <>
                  <div className="flex space-x-1 my-1 md:my-2">
                    {zenvizSentence.map((word, idx) => (
                      <div key={`initial-word-${idx}`} className={cn(word.className, "whitespace-nowrap")}>
                        {word.text }
                      </div>
                    ))}
                  </div>

                  {zenvizfeatures.length > 0 && (
                    <TypewriterEffectSmooth
                      key={`feature-${currentFeatureIndex}`}
                      words={[zenvizfeatures[currentFeatureIndex]]}
                      className="!my-1 md:!my-2 !ml-2 sm:!ml-3 inline-flex"
                    />
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Solution Section */}
      <section id='solutions' className="solutions bg-[url('/images/light_mist.jpg')] bg-center bg-no-repeat bg-cover">
        <div className='flex flex-col w-full h-screen'>
        </div>
      </section>


      <section className='footer'>

      </section>


    </main>
    </>
  );
}