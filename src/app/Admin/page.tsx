"use client"
import { Suspense } from 'react'
import { useState, useEffect } from "react";
import { toast } from "sonner"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Toaster } from "@/components/ui/sonner"
import Loading from "@/app/components/Loading"
import { set } from 'mongoose';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface TranscriptItem {
  transcript: string;
  start: number;
  speaker: number;
}

interface AnalysisItem {
  Customer_Sentiment: {
    score: string,
    detail: string
  },
  Customer_Intent: {
    score: string,
    detail: string    
  },
  Agent_Empathy: {
    score: string,
    detail: string
  },
  Agent_Promptness_and_Responsiveness: {
    score: string,
    detail: string
  },
  Agent_Knowledge: {
    score: string,
    detail: string  
  },
  Call_Flow_Optimization: {
    score: string,
    detail: string
  },
  Call_Completion_Status: { 
    score: string,
    detail: string
  },
  Issue_Resolved_Status: { 
    score: string,
    detail: string
  }
}


export default function Component() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [audioUrl, setAudioUrl] = useState("");
  const [usecase, setUsecase] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [apianalysis, setApianalysis] = useState<AnalysisItem>();
  const [apisummary, setApisummary] = useState<string[]>([]);
  const [apitranscript, setApitranscript] = useState<TranscriptItem[]>([]);




  if(Cookies.get('username')=="admin")
    {
      router.push("/Admin");
    }
    else
    {
      router.push("/Login");
    }


  const runcsvtojsonapi = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/savecsvtodb");
    toast(response.data.message);
    setIsLoading(false);
  };

  const aitsacapi = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/aitsacapi', { audioUrl, usecase });

      setIsLoading(false);
      setApisummary(response.data.jsonconvertedsummary.summary);
      setApitranscript(response.data.transcriptWithSpeakers);
      setApianalysis(response.data.jsonconvertedanalysis);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  const deleteCookies = () => {
    Cookies.remove('name');
    Cookies.remove('username');
    Cookies.remove('email');
    Cookies.remove('phone');
    router.push('/Login');
  };



  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
            <div></div>
      )}

    <Toaster />
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <svg
                  className="h-6 w-6"
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
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                  <path d="M12 3v6" />
                </svg>
                <span className="">SubverseAI Analytics</span>
               
              </Link>
              

             


            </div>
            
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Button
                  variant={"ghost"}
                  onClick={() => setActiveTab("overview")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >

                  <svg
                    className="h-4 w-4"
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
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Overview
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={()=>{router.push('/Data', { scroll: false })}}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >
                  <svg
                    className="h-4 w-4"
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
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                  Call Analysis
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setActiveTab("upload")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >
                  <svg
                    className="h-4 w-4"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" x2="12" y1="3" y2="15" />
                  </svg>
                  Upload
                </Button>
              </nav>
            </div>
          </div>
        </div>



        <div className="flex flex-col">
        <Link className='flex justify-end mx-5' onClick={deleteCookies} href="Login">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <svg
              className="h-5 w-5"
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span className="sr-only">Logout</span>
          </Button>
          </Link>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8 xl:p-10">
            {activeTab === "overview" && (
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 text-black">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardDescription>Visitors</CardDescription>
                    <CardTitle>3,456</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>Graph</div>
                  </CardContent>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardDescription>Page Views</CardDescription>
                    <CardTitle>12,345</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>Graph</div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="grid gap-6">

                <Card className="flex flex-col">
                  <CardHeader className="flex-row justify-between">
                    
                    <div>
                    <CardTitle>Upload Data</CardTitle>
                    <CardDescription>Upload a URL to analyze and get insights.</CardDescription>
                    </div>

                    <div className="flex gap-2 flex-col md:flex-row justify-around">
                      <Link href="https://docs.google.com/spreadsheets/d/1dAGnPNpNVZ2S7qjZQcYBRqFhwsXtHlgfllRAi18HFsk/edit?gid=0#gid=0"><Button>Upload Data Manually / .CSV</Button></Link>
                      
                        <Button onClick={runcsvtojsonapi}>Save Google Sheet Data to DB</Button>

                    </div>
                    
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md border-muted-foreground/20 hover:border-primary transition-colors">
                      <input
                        className="w-full h-full text-4xl p-5"
                        type="text"
                        placeholder="URL of AUDIO CALL REC"
                        onChange={(e) => setAudioUrl(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between">
                      <select
                        className="px-5 py-3 rounded-lg"
                        onChange={(e) => setUsecase(e.target.value)}
                        name="usecase"
                        id="usecase"
                      >
                        <option value="0">Select</option>
                        <option value="Bank_Service">Bank Service</option>
                        <option value="Credit_Card_Sales">Credit Card Sales</option>
                        <option value="Ecommerce_Sales">Ecommerce Sales</option>
                        <option value="Hotel_Booking">Hotel Booking</option>
                        <option value="Insurance_Sales">Insurance Sales</option>
                        <option value="Payments_Service">Payments Service</option>
                      </select>
                      
                        <Button onClick={aitsacapi}>Test Now</Button>
                    
                    </div>
                  </CardContent>

                  <CardContent>
                    <div>
                      Summary:
                      {apisummary.map((item, index) => (
                        <div key={index}>
                          <br />
                          {item}
                          <br />
                        </div>
                      ))}
                    </div>

                    <br /><br /><br /><br /><br />

                    

                    <div>
                      <h3>Analysis:</h3>
                      {apianalysis && (
                        <div>
                          <p>Customer Sentiment Analysis: {apianalysis.Customer_Sentiment.score} - {apianalysis.Customer_Sentiment.detail}</p>
                          <p>Customer Intent Analysis: {apianalysis.Customer_Intent.score} - {apianalysis.Customer_Intent.detail}</p>
                          <p>Agent Empathy: {apianalysis.Agent_Empathy.score} - {apianalysis.Agent_Empathy.detail}</p>
                          <p>Agent Promptness and Responsiveness: {apianalysis.Agent_Promptness_and_Responsiveness.score} - {apianalysis.Agent_Promptness_and_Responsiveness.detail}</p>
                          <p>Agent Knowledge: {apianalysis.Agent_Knowledge.score} - {apianalysis.Agent_Knowledge.detail}</p>
                          <p>Call Flow Optimization: {apianalysis.Call_Flow_Optimization.score} - {apianalysis.Call_Flow_Optimization.detail}</p>
                          <p>Call Completion Status: {apianalysis.Call_Completion_Status.score} - {apianalysis.Call_Completion_Status.detail}</p>
                          <p>Issue Resolved Status: {apianalysis.Issue_Resolved_Status.score} - {apianalysis.Issue_Resolved_Status.detail}</p>
                        </div>
                      )}
                    </div>




                    <br /><br /><br /><br /><br />

                    <div>
                      Transcript:
                      {apitranscript.map((item, index) => (
                        <div key={index}>
                          Start Timing: {item.start}
                          <br />
                          {item.speaker === 0 ? (
                            <div>
                              <span className="text-orange-700">Agent: </span>
                              {item.transcript}
                            </div>
                          ) : (
                            <div>
                              <span className="text-blue-600">Customer: </span>
                              {item.transcript}
                            </div>
                          )}
                          <br />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}