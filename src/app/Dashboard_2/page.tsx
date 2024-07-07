"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

interface TranscriptItem {
  transcript: string;
  start: number;
  speaker: number;
}

interface ApiAnalysis {
  [key: string]: {
    value: string;
  };
}

interface AnalysisItem {
  value: string;
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("overview");
  const [audioUrl, setAudioUrl] = useState("");
  const [usecase, setUsecase] = useState("");

  const [apianalysis, setApianalysis] = useState<AnalysisItem[]>([]);
  const [apisummary, setApisummary] = useState<string[]>([]);
  const [apitranscript, setApitranscript] = useState<TranscriptItem[]>([]);

  const runcsvtojsonapi = async () => {
    await axios.post("/api/runcsvtojsonapi");
  };

  useEffect(() => {
    runcsvtojsonapi();
  }, []);

  const aitsacapi = async () => {
    try {
      console.log(audioUrl);
      console.log(usecase);
      const response = await axios.post('/api/aitsacapi', { audioUrl, usecase });

      setApitranscript(response.data.transcriptWithSpeakers);
      setApisummary(response.data.jsonconvertedsummary.summary);
      setApianalysis(response.data.jsonconvertedanalysis);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
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
                  onClick={() => setActiveTab("analytics")}
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
                  Analytics
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

            {activeTab === "analytics" && (
              <div className="grid gap-6">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Call Center and Analytics</CardTitle>
                    <CardDescription>Detailed analytics and insights for your business.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/Data">Enter Analytics</Link>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="grid gap-6">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Upload Data</CardTitle>
                    <CardDescription>Upload a URL to analyze and get insights.</CardDescription>
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
                      <Button onClick={aitsacapi}>Submit</Button>
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
                      Analysis:
                      {apianalysis.map((item, index) => (
                        <div key={index}>
                          <br />
                          {item.toString()}
                          <br />
                        </div>
                      ))}
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

