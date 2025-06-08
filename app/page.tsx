'use client';

import {Navbar} from '../components/navbar';
import { useState, useEffect , useCallback } from 'react';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { useRouter } from 'next/navigation';
// import {motion} from "framer-motion";
import { cn } from "@/lib/utils";
import { InitialSentenceTyper } from '@/components/InitialSentenceTyper';
import Footer from "@/components/footer";
import { InfiniteScrollText } from '@/components/InfiniteScrollText';
import {
  Brain,
  GitBranch,
  ShieldCheck,
  Rocket,
  GraduationCap,
  BarChart3,
} from "lucide-react";


interface Word {
  text: string;
  className: string;
}

// Move these arrays outside the component
const zenvizSentence: Word[] = [
  { text: 'Q', className: "text-zinc-100 font-bold" },
  { text: '. ', className: "text-zinc-100 font-bold" },
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
  const [showFeatureTypewriter, setShowFeatureTypewriter] = useState(false);
  const [showInfiniteScroll, setShowInfiniteScroll] = useState(false);

  const handleInitialSentenceComplete = useCallback(() => {
    setIsInitialSentenceComplete(true);
    setTimeout(() => {
      setShowFeatureTypewriter(true);
    }, 1000); 
  }, []);

  useEffect(() => {
    if (!showFeatureTypewriter || zenvizfeatures.length === 0) {
      return;
    }
    
    const currentFeatureText = zenvizfeatures[currentFeatureIndex].text;
    const currentFeatureLength = currentFeatureText.length + 1;
    const estimatedFeatureTypingTime = currentFeatureLength * TYPING_SPEED_MS;
    const cycleDelay = estimatedFeatureTypingTime + PAUSE_AFTER_FEATURE_MS;
    
    const featureCycleTimer = setTimeout(() => {
      if (currentFeatureIndex === zenvizfeatures.length - 1) {
        setShowFeatureTypewriter(false);
        setTimeout(() => {
          setShowInfiniteScroll(true);
        }, 1000);
      } else {
        setCurrentFeatureIndex(prevIndex => prevIndex + 1);
      }
    }, cycleDelay);
    
    return () => clearTimeout(featureCycleTimer);
  }, [showFeatureTypewriter, currentFeatureIndex]);

  const cursorClass = "inline-block w-[3px] h-[0.8em] bg-zinc-300 -mb-[0.1em] ml-px";


  return (
    <>
    <main className='scroll-smooth'>

      {/* Home SEction */}
      <section className="hero bg-[url('/images/moon_img.jpg')] bg-center bg-no-repeat bg-cover ">
        <div className='flex flex-col items-center w-full h-screen bg-blend-overlay '>
          <div
            // initial={{opacity: 0, y: -50}}
            // animate={{opacity: 1, y: 0}}
            // transition={{duration: 1.25}}
            className='w-full'>
            <Navbar/>
          </div>
          <div
            // initial={{ opacity: 0, y: 100 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 1.5 }}
            className="flex flex-col font-satoshi p-4 sm:p-6 lg:p-8 w-full max-w-4xl mt-16 md:mt-24 justify-center items-center text-center"
          >
            <p className="text-5xl sm:text-7xl lg:text-8xl text-slate-200">
              ZenViz
            </p>
            <p
              // initial={{opacity: 0, x: -100}}
              // animate={{opacity: 1, x: 0}}
              // transition={{duration: 1.25}}
              className="mt-4 text-lg sm:text-xl lg:text-2xl text-zinc-500 font-bold max-w-2xl">
              See code. Feel flow. Master real-world development and deployment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center mt-6">
              <button
                // initial={{ opacity: 0, x: -200 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.95 }}
                onClick={trymeclick}
                className="group relative overflow-hidden text-slate-100 font-semibold hover:border-3 hover:border-blue-600 cursor-pointer w-36 sm:w-40 h-12 rounded-xl bg-blue-600 text-sm sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0 pointer-events-none"
                ></span>
                <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-blue-600">
                  Try ZenViz
                </span>
              </button>

              <button
                // initial={{ opacity: 0, x: 200 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.95 }}
                onClick={learnmoreclick}
                className="group relative overflow-hidden text-zinc-900 font-semibold hover:border-3 hover:border-slate-100 cursor-pointer w-36 sm:w-40 h-12 rounded-xl bg-slate-200 text-sm sm:text-base"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-black transform scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 z-0 pointer-events-none"
                ></span>
                <span className="relative z-10 transition-colors duration-300 ease-in-out group-hover:text-white">
                  Learn more →
                </span>
              </button>

            </div>
            <p
              // initial={{opacity: 0, x: 100}}
              // animate={{opacity: 1, x: 0}}
              // transition={{duration: 1.25}}
              className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl">
              An immersive Git/Github-powered learning experience that helps you visualize, build, deploy, and grow — the way real developers do it.
            </p>
          </div>
        </div>
      </section>


      {/* this is fucking features section okayyy */}
      <section id="features" className="relative bg-black overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-600/90 to-transparent blur-2xl z-10 pointer-events-none"></div>

        <div className="relative z-20 flex flex-col justify-center items-center w-full min-h-[60vh] sm:min-h-[75vh] md:min-h-screen font-satoshi p-4 sm:p-6 md:p-8">
          <div
            // initial={{ opacity: 0, x: -100 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ duration: 1 }}
            className="flex flex-col w-full max-w-5xl"
          >
            <div
              className={cn(
                "flex flex-wrap items-baseline justify-center text-center",
                "font-satoshi",
                // Smaller base text, more scaling on bigger devices
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
                "leading-tight sm:leading-snug"
              )}
            >
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
                  <div className="flex flex-wrap justify-center space-x-1 sm:space-x-2 my-1 md:my-2 max-w-full">
                    {zenvizSentence.map((word, idx) => (
                      <div
                        key={`initial-word-${idx}`}
                        className={cn(word.className, "whitespace-nowrap text-ellipsis overflow-hidden")}
                      >
                        {word.text}
                      </div>
                    ))}
                  </div>

                  {showFeatureTypewriter && zenvizfeatures.length > 0 && (
                    <TypewriterEffectSmooth
                      key={`feature-${currentFeatureIndex}`}
                      words={[zenvizfeatures[currentFeatureIndex]]}
                      className="!my-1 md:!my-2 !ml-2 sm:!ml-3 inline-flex max-w-full truncate"
                    />
                  )}

                  {showInfiniteScroll && zenvizfeatures.length > 0 && (
                    <InfiniteScrollText words={zenvizfeatures} speed={30} className="mb-16 mt-8 w-full" />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <section id="solutions" className="relative overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/images/bg_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full min-h-[60vh] sm:min-h-[75vh] md:min-h-screen font-satoshi">
          <div className='flex p-8 items-center rounded-xl'>
            <p className='text-5xl font-semibold text-slate-200 0'>ZenViz's Solution</p>
          </div>
          <div className='flex w-[900px] h-[300px] text-center border-2 border-dashed border-blue-400 rounded-2xl p-4 items-center'>
              <p className='text-3xl text-blue-300'>
                ZenViz transforms GitHub repos into interactive learning experiences. With smart visualizations, live vulnerability checks, and code editing, it helps developers truly understand how real-world projects work beyond just reading code.
              </p>
          </div>
        </div>
      </section> */}

      {/* this is solution section okay why the hell do even need the this product */}
      <section
        id="solutions"
        className="solutions relative bg-[url('/images/light_mist.jpg')] bg-center bg-no-repeat bg-cover font-satoshi"
      >
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="relative z-10 flex flex-col gap-4 w-full min-h-[85vh] sm:min-h-screen items-center justify-center">
          <div className="w-full max-w-7xl px-4 py-8 space-y-4 text-white">
            <div className="flex flex-col justify-center items-center">
              <p className="p-2 text-4xl font-semibold">What ZenViz brings You as a Developer?</p>
            </div>

            <div className="grid grid-cols-1 hover:cursor-pointer sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-black/10 backdrop-blur-md border-2 h-[200px] border-blue-300 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <Brain className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-1">Repo Visualizer</h3>
                <p className="text-sm text-zinc-200">
                  Understand code structure visually using Mermaid.js.
                </p>
              </div>

              <div className="bg-black/10 backdrop-blur-md border-2 border-blue-300 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <GitBranch className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-1">Real-World Git</h3>
                <p className="text-sm text-zinc-200">Learn team-based Git workflows like merge and rebase.</p>
              </div>

              <div className="bg-black/10 backdrop-blur-md border-2 border-blue-300 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <ShieldCheck className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-1">Vulnerability Scan</h3>
                <p className="text-sm text-zinc-200">Instantly detect code flaws and insecure patterns.</p>
              </div>

              <div className="bg-black/10 backdrop-blur-md border-2 h-[200px] border-blue-300 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <Rocket className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-1">Deploy Guide</h3>
                <p className="text-sm text-zinc-200">Get step-by-step instructions to deploy your project.</p>
              </div>

              <div className="bg-black/10 backdrop-blur-md border-2 border-blue-300 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <GraduationCap className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-1">GitHub Learning</h3>
                <p className="text-sm text-zinc-200">Dive deeper into Git and GitHub with hands-on examples.</p>
              </div>

              <div className="bg-black/10 backdrop-blur-md border-2 border-blue-300 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
                <BarChart3 className="w-8 h-8 mb-3" />
                <h3 className="text-xl font-semibold mb-1">Code Metrics</h3>
                <p className="text-sm text-zinc-200">Analyze LOC, complexity, and contributors visually.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='about'>
              <Footer/>
      </section>
    </main>
    </>
  );
}