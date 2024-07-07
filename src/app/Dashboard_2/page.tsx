"use client"
import { ClassAttributes, HTMLAttributes, JSX, SetStateAction, SVGProps, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"
import axios from "axios";

export default function Component() {
  const [activeTab, setActiveTab] = useState("overview");
  const [audioUrl, setAudioUrl] = useState("");
  const [usecase, setUsecase] = useState("");

  const [apitranscript, setapitranscript] = useState([]);

  interface ApiAnalysis {
    [key: string]: {
      value: string;
    };
  }



  interface AnalysisItem {
    value: string;
  }
  
  const [apianalysis, setapianalysis] = useState([]);
  const [apisummary, setapisummary] = useState([]);

  const runcsvtojsonapi = async () => {
    await axios.post("/api/runcsvtojsonapi");
  }

  useEffect(() => {
    runcsvtojsonapi();
  }, []);






  const aitsacapi = async () => {
    try {
      console.log(audioUrl);
      console.log(usecase);
      const response = await axios.post('/api/aitsacapi', { audioUrl, usecase });

      await setapitranscript(response.data.transcriptWithSpeakers);
      await setapisummary(response.data.jsonconvertedsummary.summary);
      await setapianalysis(response.data.jsonconvertedanalysis);

      console.log(response.data.transcriptWithSpeakers);
      console.log(response.data.jsonconvertedsummary.summary);
      console.log(response.data.jsonconvertedanalysis);
      
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
                <Package2Icon className="h-6 w-6" />
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
                  <HomeIcon className="h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setActiveTab("analytics")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >
                  <LineChartIcon className="h-4 w-4" />
                  Analytics
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={() => setActiveTab("upload")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
                >
                  <UploadIcon className="h-4 w-4" />
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
                    <LineChart className="text-black aspect-[10/4]" />
                  </CardContent>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardDescription>Page Views</CardDescription>
                    <CardTitle>12,345</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LabelledpieChart className="text-black aspect-[10/3]" />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Visitors</CardDescription>
                    <CardTitle>Top Referrers</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center">
                      <div>google.com</div>
                      <div className="font-semibold ml-auto">3K</div>
                    </div>
                    <div className="flex items-center">
                      <div>twitter.com</div>
                      <div className="font-semibold ml-auto">1.2K</div>
                    </div>
                    <div className="flex items-center">
                      <div>youtube.com</div>
                      <div className="font-semibold ml-auto">1.1K</div>
                    </div>
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
                      <input className="w-full h-full text-4xl p-5" type="text" placeholder="URL of AUDIO CALL REC" onChange={(e) => { setAudioUrl(e.target.value) }} />
                    </div>

                    <div className="flex justify-between">

                      <select className="px-5 py-3 rounded-lg " onChange={(e) => { setUsecase(e.target.value) }} name="usecase" id="usecase">
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
                      Summary :
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
                      Analysis :
                      {apianalysis.map((item, index) => (
                        <div key={index}>
                          <br />
                          {item}
                          <br />
                        </div>
                      ))}
                    </div>




                    <br /><br /><br /><br /><br />




                    <div>
                      Transcript :
                      {apitranscript.map((item, index) => (
                        <div key={index}>
                          <br />
                          {item.transcript}
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
  )
}




function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LabelledpieChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        activeOuterRadiusOffset={2}
        borderWidth={1}
        arcLinkLabelsThickness={1}
        enableArcLabels={false}
        colors={["#2563eb"]}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function LineChart(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function LineChartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
  )
}


function Package2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
  )
}


function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
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
  )
}