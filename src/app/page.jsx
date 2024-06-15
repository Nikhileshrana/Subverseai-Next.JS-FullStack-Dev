"use client";
import Image from "next/image";
import { HeroHighlight, Highlight } from "@/app/components/ui/hero-highlight";
import { FlipWords } from "@/app/components/ui/flip-words";
import { ContainerScroll } from "@/app/components/ui/container-scroll-animation";
import { SparklesCore } from "@/app/components/ui/sparkles";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/app/components/ui/glowing-stars";
import { MultiStepLoader as Loader } from "@/app/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

export default function LandingPage() {

  const words = ["25%", "35%", "30%", "24x7"];
  const slang = ["Less Wait Time", "Improved Performance", "High Resolution Rate", "Service"];



  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState([]);

  const buttonTrigger = (states) => {
    setLoadingStates(states);
    setLoading(true);
  };

  const buttontriggernikhs1 = () => {
    const states = [
      { text: "Buying a condo for me" },
      { text: "1" },
      { text: "2" },
      { text: "3" },
    ];
    buttonTrigger(states);
  };

  const buttontriggernikhs2 = () => {
    const states = [
      { text: "Buying a condo for mine" },
      { text: "2" },
      { text: "3" },
      { text: "4" },
    ];
    buttonTrigger(states);
  };

  const buttontriggernikhs3 = () => {
    const states = [
      { text: "Buying a condo for not me" },
      { text: "1" },
      { text: "2" },
      { text: "3" },
    ];
    buttonTrigger(states);
  };




  return (
    <>


      <HeroHighlight className="flex flex-col-reverse w-full sm:flex-row">
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl relative top-0  md:top-[6rem] w-[60%] px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Enhance Customer Engagement with
          {" "}
          <Highlight className="text-black dark:text-white">
            state-of-the-art
          </Highlight>
          {" "}
          conversational AI solutions
        </motion.h1>

        <div className="w-[40%]" >
          <Image
            src="/hero.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </HeroHighlight>

      <div className="h-fit p-2 flex justify-center items-center px-4 w-full dark:bg-black">
        <div className="text-2xl  sm:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Make
          <FlipWords words={words} />
          <FlipWords words={slang} /> <br />
          With SUBVERSEAI
        </div>
      </div>








      <div className="flex flex-col overflow-hidden dark:bg-black">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Scroll Animations
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/Demo.jpg`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>






      <div className="h-fit w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          SubverseAI
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>





      <div>
        <Loader loadingStates={loadingStates} loading={loading} duration={1000} />
        {loading && (
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        )}
        <div className="flex flex-col lg:flex-row mx-5 gap-5 justify-around dark:bg-black">
          <div onClick={buttontriggernikhs1} className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
              <GlowingStarsTitle>Call Analytics & Insight</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  A technology that builds models on decision-making and optimizes CX strategies.
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 text-white stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
          </div>

          <div onClick={buttontriggernikhs2} className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
              <GlowingStarsTitle>Agent Support (Copilot)</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Productivity tools to empower your agents and improve their performance
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[gray] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 text-white stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
          </div>

          <div onClick={buttontriggernikhs3} className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
              <GlowingStarsTitle>AI-Powered Voicebot</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Human-like conversations to enhance user experience and reduce operational costs
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 text-white stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </GlowingStarsBackgroundCard>
          </div>
        </div>
      </div>

















    </>
  );
}




