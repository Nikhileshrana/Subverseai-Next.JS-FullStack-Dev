"use client";
import Image from "next/image";
import { HeroHighlight, Highlight } from "@/app/components/ui/hero-highlight";
import { FlipWords } from "@/app/components/ui/flip-words";
import { ContainerScroll } from "@/app/components/ui/container-scroll-animation";
import { SparklesCore } from "@/app/components/ui/sparkles";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { HoverEffect } from "@/app/components/ui/card-hover-effect";
import { MultiStepLoader as Loader } from "@/app/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { LampContainer } from "@/app/components/ui/lamp";
import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
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

  const words = ["+45%", "+70%", "-25%", "+35%", "+30%", "24x7"];
  const slang = ["Higher-CSAT-Score", "Cost-savings-for-contact-centers", "Less-customer-waiting-time", "Improved-agent-productivity", "Higher-first-contact-resolution-rate", "Uninterrupted-service"];

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
      description: "Cutting-edge STT, LLMs, and TTS models to ensure the most accurate results"
    },
    {
      title: "On-Prem or Private Cloud Deployment",
      description: "APIs with data encryption; On-premise for hosting + Cloud for computing"
    },
    {
      title: "Seamless and scalable integration",
      description: "Custom AI models + most CRMs, KMS, ERPs, and communication platforms",
    },
    {
      title: "State-of-the-Art Encryption",
      description: "E2E encryption (AES-256, TLS 1.3) for all types of data, with RBAC, MFA, and firewalls."
    },
    {
      title: "Data Privacy Policy",
      description:
        "No data retention policy beyond the necessary processing time.",
    },
    {
      title: "24/7 Support and Monitoring",
      description:
        "Rest assured, our servers have 99.9% uptime to ensure your continuous operations",
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



  console.log("Designed and Developed by Nikhilesh Rana. Full Stack Developer.");
  console.log("Email - realnikhileshrana@gmail.com");
  console.log("**************************************************************");
  console.log("Landing Page and a total of 15 Page UI Development");
  console.log("Worked on User Authentication.");
  console.log("Worked on Razorpay Payment Integration.");
  console.log("Worked on Credits System");
  console.log("Worked on Restful API for the User to send and recieve files");
  console.log("Transaction Viewer");
  console.log("Nodemailer contactus/RequestDemo mail goes to user&admin");
  console.log("Call Recordings Analytics");
  console.log("Google Sheets{exceldata} api to database");
  console.log("using Deepgram ai api for preloaded audio");
  console.log("Using GROQ api for Analysis and Summary.");
  console.log("Graph Representation");
  console.log("Js-Cookie");
  console.log("Tailwind CSS");
  console.log("ShadCN");
  console.log("Acertinity UI");
  console.log("Next.js");
  console.log("React.js");
  console.log("Typescript");
  console.log("**************************************************************");
  console.log("Email - realnikhileshrana@gmail.com");
  console.log("nikhileshrana.tech");

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
        <div className="w-full relative bottom-[2rem] sm:bottom-[10rem] text-1xl  sm:text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          {" "}
          <FlipWords words={words} />
          <FlipWords words={slang} /> <br />
          {" "}
        </div>
      </div>









      <div className="bg-black py-20"></div>




      <div className="h-fit w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-4xl text-3xl lg:text-6xl md:py-5 font-bold text-center text-white relative z-20">
          Explore the future of customer engagement
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








      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-black px-10 sm:px-[7rem]">
        <div onClick={buttontriggernikhs1} className="bg-gray-950 border rounded-lg overflow-hidden cursor-pointer">
          <Image className="w-full h-auto object-cover px-20 py-8 sm:px-24 sm:py-10" src="/predictive-chart.png" alt="AI-Powered Voicebot" height={300} width={500} />
          <div className="p-4 flex justify-between items-end">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">Call Analytics & Insight</h3>
              <p className="text-gray-400 mt-2">
                Gain actionable insights from your call data with Call Analytics. Monitor performance, identify trends, and improve customer service and efficiency.
              </p>
            </div>
            <svg
              className="h-4 w-[7rem] ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        <div onClick={buttontriggernikhs2} className="bg-gray-950 border rounded-lg overflow-hidden cursor-pointer">
          <Image className="w-full h-auto object-cover px-20 py-8 sm:px-24 sm:py-10" src="/customer-service.png" alt="AI-Powered Voicebot" height={300} width={500} />
          <div className="p-4 flex justify-between items-end">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">Agent Copilot</h3>
              <p className="text-gray-400 mt-2">
                Empower your agents with our AI-driven Agent Copilot, providing real-time support and guidance to enhance productivity and ensure high-quality interactions.
              </p>
            </div>
            <svg
              className="h-4 w-[7rem] ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>

        <div onClick={buttontriggernikhs3} className="bg-gray-950 border rounded-lg overflow-hidden cursor-pointer">
          <Image className="w-full h-auto object-cover px-20 py-8 sm:px-24 sm:py-10" src="/live-chat.png" alt="AI-Powered Voicebot" height={300} width={300} />
          <div className="p-4 flex justify-between items-end">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">AI-Powered Voicebot</h3>
              <p className="text-gray-400 mt-2">
                Our AI-powered Voicebot automates customer interactions with natural, human-like conversations, reducing wait times and enhancing user experiences.
              </p>
            </div>
            <svg
              className="h-4 w-[7rem] ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>







      <Loader loadingStates={loadingStates} loading={loading} duration={1000} />
      {loading && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}









      <div className="bg-black h-16"></div>


      <LampContainer className="h-[17rem] w-[100%]">
        <></>
      </LampContainer>



      <div className="md:text-4xl text-3xl lg:text-6xl py-8 md:py-5 font-bold text-center bg-black">Transform Your Business with Our AI-Driven Platform</div>

      <div className="w-full h-fit mx-auto bg-black px-4  md:px-6  lg:px-8 md:py-8">
        <Carousel className="rounded-lg overflow-hidden">
          <CarouselContent>
            <CarouselItem>
              <div className="grid md:grid-cols-[30%_70%] gap-6 w-[100%] ">
                <img
                  src="/Automate_ticket_management.jpg"
                  alt="Carousel Image 1"
                  width={800}
                  height={500}
                  className="w-full h-[300px] md:h-[300px] object-cover"
                />
                <div className="space-y-4 w-full">
                  <h3 className="text-2xl md:text-4xl font-bold">Automate ticket management</h3>
                  <ul className="flex flex-col gap-5 md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <li>Improve service TAT with our streamlined processes.</li>
                    <li>Auto issue categorization, call notes and schedule follow-ups.</li>
                    <li>Send reminders via WhatsApp or Email effortlessly.</li>
                  </ul>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid md:grid-cols-[30%_70%] gap-6 w-[100%] ">
                <img
                  src="/E2E customer view.png"
                  alt="Carousel Image 1"
                  width={800}
                  height={500}
                  className="w-full h-[300px] md:h-[300px] object-cover"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-4xl font-bold">E2E customer view</h3>
                  <ul className="flex flex-col gap-5 md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <li>Access comprehensive insights from all previous interactions across all platforms.</li>
                    <li>Gain customer-level insights including sentiment trends and feedback.</li>
                    <li>Enhance customer loyalty with detailed, actionable insights.</li>
                  </ul>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid md:grid-cols-[30%_70%] gap-6 w-[100%] ">
                <img
                  src="/Upsell  Cross sell opportunity.jpg"
                  alt="Carousel Image 1"
                  width={800}
                  height={500}
                  className="w-full h-[300px] md:h-[300px] object-cover"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-4xl font-bold">Upsell / Cross-sell opportunity.</h3>
                  <ul className="flex flex-col gap-5 md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <li>Unlock more value with deep customer insights and advanced analytics.</li>
                    <li>Expand reach by automating outbound calls efficiently.</li>
                  </ul>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid md:grid-cols-[30%_70%] gap-6 w-[100%] ">
                <img
                  src="/Multimodal communication.png"
                  alt="Carousel Image 2"
                  width={800}
                  height={500}
                  className="w-full h-[300px] md:h-[300px] object-cover"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-4xl font-bold">Multimodal communication</h3>

                  <ul className="flex flex-col gap-5 md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <li>Auto-reply to WhatsApp texts, voice messages, and emails in multiple Indian languages.</li>
                    <li>Voicebots to automate routine and follow-up calls, enhancing customer loyalty.</li>
                  </ul>

                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="grid md:grid-cols-[30%_70%] gap-6 w-[100%] ">
                <img
                  src="/Agent empowerment.png"
                  alt="Carousel Image 3"
                  width={800}
                  height={500}
                  className="w-full h-[300px] md:h-[300px] object-cover"
                />
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-4xl font-bold">Agent empowerment</h3>

                  <ul className="flex flex-col gap-5 md:text-3xl w-[90vw] sm:w-auto text-gray-500 dark:text-gray-400">
                    <li>Custom dashboards with agent overview and relevant trends.</li>
                    <li>Integrate with your L&D module for customized, need-based training.</li>
                  </ul>

                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-gray-900/50 hover:bg-gray-900/70 text-gray-50 rounded-full p-2 cursor-pointer transition-colors" />
          <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-gray-900/50 hover:bg-gray-900/70 text-gray-50 rounded-full p-2 cursor-pointer transition-colors" />
        </Carousel>
      </div>












































      {/* Tablet Preview */}

      {/* 
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
      </div> */}

      {/* Tablet Preview Ends here */}









      <div className="bg-black py-20"></div>







      <div className="w-full mx-auto px-1 sm:px-4 bg-black">
        <div className="block text-center py-10 font-bold text-3xl sm:text-6xl sm:px-20">Scalable Voice AI solutions with Robust Data Security</div>
        <HoverEffect className="bg-black sm:px-20" items={projects} />
      </div>














      {/* Infinite Scroll for Reviews Section */}


      {/* <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div> */}

      {/* infinite scroll section Ends here */}






      <div className="bg-black py-20"></div>

    </>
  );
}




