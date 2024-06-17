"use client";
import Image from "next/image";
import { HeroHighlight, Highlight } from "@/app/components/ui/hero-highlight";
import { FlipWords } from "@/app/components/ui/flip-words";
import { ContainerScroll } from "@/app/components/ui/container-scroll-animation";
import { SparklesCore } from "@/app/components/ui/sparkles";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { HoverEffect } from "@/app/components/ui/card-hover-effect";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/app/components/ui/glowing-stars";
import { MultiStepLoader as Loader } from "@/app/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { LampContainer } from "@/app/components/ui/lamp";
import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
import { link } from "fs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card"





type LoadingState = { text: string; };

export default function LandingPage() {

  const words = ["-25%", "+35%", "+30%", "+70%" , "24x7"];
  const slang = ["Wait Time", "Performance", "Resolution Rate", "Savings" ,"Service"];

  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Array<LoadingState>>([]);

  const buttonTrigger = (states: Array<LoadingState>) => {
    setLoadingStates(states);
    setLoading(true);
  };

  const buttontriggernikhs1 = () => {
    const states: Array<LoadingState> = [
      { text: "Call summary" },
      { text: "Customer intent and sentiment analysis" },
      { text: "Agent performance" },
      { text: "Custom dashboards" },
      { text: "Actionable insights" },
      { text: "Call completion status" },
      { text: "Issue resolution status" },
    ];
    buttonTrigger(states);
  };

  const buttontriggernikhs2 = () => {
    const states: Array<LoadingState> = [
      { text: "RT speech detection" },
      { text: "Instant agent prompts" },
      { text: "Customer intent and sentiment detection" },
      { text: "Ticket categorization" },
      { text: "Automate call notes, reminders, follow ups" },
      { text: "Performance analytics" },
    ];
    buttonTrigger(states);
  };

  const buttontriggernikhs3 = () => {
    const states: Array<LoadingState> = [
      { text: "Conversational AI" },
      { text: "Auto-language switch" },
      { text: "Custom voices" },
      { text: "Call transfer to agents" },
      { text: "Automate ticket handling, reminders" },
      { text: "Ultra-low latency" },
      { text: "Scalable integration" },
    ];
    buttonTrigger(states);
  };








  const projects = [
    {
      title: "High performance tech-stack",
      description:"Cutting-edge STT, LLMs, and TTS models to ensure the most accurate results"
    },
    {
      title: "On-Prem or Private Cloud Deploymen",
      description:"APIs with data encryption - On-premise for hosting + Cloud for computing"
    },
    {
      title: "Seamless and scalable integration",
      description:"Works with most communications platforms, telephony services, CRMs, KMS, ERPs - Custom AI models, seamless integration with the company database",
    },
    {
      title: "State-of-the-Art Encryption",
      description:"End-to-end data encryption for all voice and text data - Protocols for data at rest + in transit (**AES-256, TLS 1.3**) - Robust Security Measures **RBAC, MFA, firewalls, IDS**"
    },
    {
      title: "Data Privacy",
      description:
        "No data retention policy beyond the necessary processing time",
    },
    {
      title: "Servers",
      description:
        "Dont Worry, we have got you covered with our 99.9% uptime guarantee",
    },
  ];









  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];




  return (
    <>


      <HeroHighlight className="flex flex-col-reverse sm:flex-row">
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
          className="text-2xl relative top-0  md:top-[6rem] sm:w-[60%] px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-left mx-auto "
        >
          Enhance Customer Engagement with
          {" "}
          <Highlight className="text-black dark:text-white">
            state-of-the-art
          </Highlight>
          {" "}
          conversational AI solutions
        </motion.h1>

        <div className="w-auto">
          <Image
            src="/hero.svg"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </HeroHighlight>

      <div className="h-fit flex justify-center items-center w-full px-[4vw] dark:bg-black">
        <div className="w-full relative bottom-[3.5rem] sm:bottom-[10rem] text-2xl  sm:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          {" "}
          <FlipWords words={words} />
          <FlipWords words={slang} /> <br />
          {" "}
        </div>
      </div>






     






      <div className="h-fit w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md py-20">
        <h1 className="md:text-7xl text-6xl lg:text-9xl font-bold text-center text-white relative z-20">
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




      <div className="px-4">
        <Loader loadingStates={loadingStates} loading={loading} duration={1000} />
        {loading && (
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        )}
        <div className="cursor-pointer flex flex-col lg:flex-row  gap-5 justify-around dark:bg-black">
          <div onClick={buttontriggernikhs1} className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard className="bg-black">
              <GlowingStarsTitle>Call Analytics & Insight</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  A technology that builds models on decision-making and optimizes CX strategies.
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] hover:bg-gray-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 text-[white] stroke-2"
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

          <div onClick={buttontriggernikhs2} className=" cursor-pointer flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard className="bg-black">
              <GlowingStarsTitle>Agent Copilot</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Productivity tools to empower your agents and improve their performance
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] hover:bg-gray-500 flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 text-[white] stroke-2"
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

          <div onClick={buttontriggernikhs3} className="cursor-pointer flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard className="bg-black">
              <GlowingStarsTitle>AI-Powered Voicebot</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Human-like conversations to enhance user experience and reduce operational costs
                </GlowingStarsDescription>
                <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] hover:bg-gray-500 flex items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 text-[white] stroke-2"
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




  



  





















<div className="py-20 bg-black"></div>


      <div className="w-full h-fit mx-auto bg-black px-4  md:px-6  lg:px-8 md:py-16 lg:py-20">
      <Carousel className="rounded-lg overflow-hidden">
        <CarouselContent>
        <CarouselItem>
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src="https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-854.jpg?t=st=1718648975~exp=1718652575~hmac=eb29a145fcbdc36b525fd50ff536ad845cb2afa23e02442937e9114c7a913ad5&w=1480"
                alt="Carousel Image 1"
                width={800}
                height={500}
                className="w-full h-[300px] md:h-auto object-cover"
              />
              <div className="space-y-4 ">
                <h3 className="text-2xl md:text-4xl font-bold">Automate ticket management</h3>
                  <p className="md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <br />Improve service TAT with our streamlined processes.
                    <br />Auto issue categorization, call notes and schedule follow-ups.
                    <br />Send reminders via WhatsApp or Email effortlessly.
                  </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src="https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-854.jpg?t=st=1718648975~exp=1718652575~hmac=eb29a145fcbdc36b525fd50ff536ad845cb2afa23e02442937e9114c7a913ad5&w=1480"
                alt="Carousel Image 1"
                width={800}
                height={500}
                className="w-full h-[300px] md:h-auto object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-2xl md:text-4xl font-bold">E2E customer view</h3>
                  <p className="md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <br />Access comprehensive insights from all previous interactions across all platforms.
                    <br />Gain customer-level insights including sentiment trends and feedback.
                    <br />Enhance customer loyalty with detailed, actionable insights.
                  </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src="https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-854.jpg?t=st=1718648975~exp=1718652575~hmac=eb29a145fcbdc36b525fd50ff536ad845cb2afa23e02442937e9114c7a913ad5&w=1480"
                alt="Carousel Image 1"
                width={800}
                height={500}
                className="w-full h-[300px] md:h-auto object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-2xl md:text-4xl font-bold">Upsell / Cross-sell opportunity.</h3>
                  <p className="md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <br />Unlock more value with deep customer insights and advanced analytics.
                    <br />Expand reach by automating outbound calls efficiently.
                  </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src="https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-854.jpg?t=st=1718648975~exp=1718652575~hmac=eb29a145fcbdc36b525fd50ff536ad845cb2afa23e02442937e9114c7a913ad5&w=1480"
                alt="Carousel Image 2"
                width={800}
                height={500}
                className="w-full h-[300px] md:h-auto object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-2xl md:text-4xl font-bold">Multimodal communication</h3>

                  <p className="md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <br />Auto-reply to WhatsApp texts, voice messages, and emails in multiple Indian languages.
                    <br />Voicebots to automate routine and follow-up calls, enhancing customer loyalty.
                  </p>
            
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="grid md:grid-cols-2 gap-6">
              <img
                src="https://img.freepik.com/free-vector/wireframe-robot-ai-artificial-intelligence-robotic-hand-machine-learning-cyber-mind-domination-concept_127544-854.jpg?t=st=1718648975~exp=1718652575~hmac=eb29a145fcbdc36b525fd50ff536ad845cb2afa23e02442937e9114c7a913ad5&w=1480"
                alt="Carousel Image 3"
                width={800}
                height={500}
                className="w-full h-[300px] md:h-auto object-cover"
              />
              <div className="space-y-4">
                <h3 className="text-2xl md:text-4xl font-bold">Agent empowerment</h3>
                
                 <p className="md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                  <br />Custom dashboards with agent overview and relevant trends.
                  <br />Integrate with your L&D module for customized, need-based training.
                 </p>
    
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-gray-900/50 hover:bg-gray-900/70 text-gray-50 rounded-full p-2 cursor-pointer transition-colors" />
        <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-gray-900/50 hover:bg-gray-900/70 text-gray-50 rounded-full p-2 cursor-pointer transition-colors" />
        </Carousel>
        </div>





































      









      <div className="flex flex-col overflow-hidden dark:bg-black">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Unleash the power of <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  SubverseAI
                </span>
              </h1>
            </>
          }
        >
          <Image
            src="/hero.avif"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>









      






    <div className="w-full mx-auto px-1 sm:px-4 bg-black">
      <div className="block text-center py-10 font-bold text-3xl sm:text-6xl sm:px-20">Transform Your Business with Our AI-Driven Platform</div>
      <HoverEffect className="bg-black" items={projects} />
    </div>




  










      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>


    <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Powered By<br /> 42Apeironanta Technologies Pvt Ltd.
        </motion.h1>
      </LampContainer>

    </>
  );
}




