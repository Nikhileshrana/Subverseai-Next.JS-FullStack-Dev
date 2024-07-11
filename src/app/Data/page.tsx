"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Loading from "@/app/components/Loading";
import axios from "axios";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

interface TranscriptItem {
    transcript: string;
    start: number;
    speaker: number;
}

interface AnalysisItem {
    Customer_Sentiment: {
        score: string;
        detail: string;
    };
    Customer_Intent: {
        score: string;
        detail: string;
    };
    Agent_Empathy: {
        score: string;
        detail: string;
    };
    Agent_Promptness_and_Responsiveness: {
        score: string;
        detail: string;
    };
    Agent_Knowledge: {
        score: string;
        detail: string;
    };
    Call_Flow_Optimization: {
        score: string;
        detail: string;
    };
    Call_Completion_Status: {
        score: string;
        detail: string;
    };
    Issue_Resolved_Status: {
        score: string;
        detail: string;
    };
}

interface Userdata {
    Call_ID: number;
    Agent_Name: string;
    Customer_ID: string;
    Usecase: string;
    Call_Recording_URL: string;
}


export default function Data() {
    const [showAudio, setShowAudio] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userdata, setuserdata] = useState<Userdata[]>([]);
    const [apianalysis, setApianalysis] = useState<AnalysisItem>();
    const [apisummary, setApisummary] = useState<string[]>([]);
    const [apitranscript, setApitranscript] = useState<TranscriptItem[]>([]);

    // Function to handle playing audio from a specific time
    const playFromSpecificTime = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            audioRef.current.play();
        }
    };



    const getuserdatafromapi = async () => {
        setIsLoading(true);
        const response = await axios.post("/api/getcalldata");
        setIsLoading(false);
        setuserdata(response.data.data);
        
        console.log(response.data.Analysis);

        
    };


    const fetchmyanalysis = async (Call_ID :string) => {
        setIsLoading(true);
        const response = await axios.post("/api/getcallanalysisdata" , {Call_ID: Call_ID});

        setApisummary(response.data.jsonconvertedsummary.summary);
        setApitranscript(response.data.transcriptWithSpeakers);
        setApianalysis(response.data.jsonconvertedanalysis);

        console.log(response.data);
        setIsLoading(false);
    };


    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div></div>
            )}



            <div className="p-2 flex justify-between px-5">
                <Link href="/Dashboard_2">
                    <Button variant="outline">Back</Button>
                </Link>

                <Button className=" bg-blue-400 hover:bg-blue-500" onClick={getuserdatafromapi}>Click to get User Data</Button>
            </div>

            <Table className="h-[60vh]">
                <TableCaption>To See Data Click on Top Right Button. :)</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Call ID</TableHead>
                        <TableHead>Agent Name</TableHead>
                        <TableHead className="text-center">Customer ID</TableHead>
                        <TableHead className="text-center">Usecase</TableHead>
                        {/* <TableHead className="text-center">Issue Resolution</TableHead>
                        <TableHead className="text-center">Customer Sentiment</TableHead>
                        <TableHead className="text-center">Customer Responsiveness</TableHead> */}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userdata.map((customer) => (
                        <TableRow key={customer.Call_ID}>
                            <TableCell className="font-medium">{customer.Call_ID}</TableCell>
                            <TableCell className="font-medium">{customer.Agent_Name}</TableCell>
                            <TableCell className="text-center">{customer.Customer_ID}</TableCell>
                            <TableCell className="text-center">{customer.Usecase}</TableCell>


                            


                            <TableCell>
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Button variant="outline" onClick={() => { fetchmyanalysis(customer.Call_ID.toString()); }}>View More</Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <div className="grid grid-cols-[40%_1fr] h-screen w-full bg-white text-white">
                                            <div className="bg-muted p-6 flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-bold">SubverseAI</h2>
                                                </div>
                                                <div className="flex-1 overflow-auto">
                                                    <audio
                                                        src={customer.Call_Recording_URL}
                                                        controls
                                                        className="w-full"
                                                        ref={audioRef}
                                                    />
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-bold">Transcript</h3>
                                                        <p className="mt-2 text-muted-foreground h-[75vh] overflow-auto">
                                                            {apitranscript.map((call, index) => (
                                                                <span key={index}>
                                                                    <span
                                                                        className="cursor-pointer"
                                                                        onClick={() => {
                                                                            setCurrentTime(call.start);
                                                                            playFromSpecificTime(call.start);
                                                                        }}
                                                                    >
                                                                        {call.speaker === 1 ? (
                                                                            <>
                                                                                <br />
                                                                                <span className="text-red-500">Customer: </span> {call.transcript}
                                                                                <br />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <br />
                                                                                <span className="text-blue-500">Agent: </span> {call.transcript}
                                                                                <br />
                                                                            </>
                                                                        )}
                                                                    </span>{" "}
                                                                </span>
                                                            ))}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="h-screen bg-background p-6 flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-bold">Analysis</h2>
                                                    <DrawerClose asChild>
                                                        <Button onClick={() => {
                                                            setIsLoading(true);
                                                            setApianalysis(undefined);
                                                            setApisummary([]);
                                                            setApitranscript([]);
                                                            setIsLoading(false);
                                                        }
                                                        } variant="outline">Back</Button>
                                                    </DrawerClose>
                                                </div>
                                                <div className="flex-1 overflow-auto">

                                                    <div>
                                                        {apianalysis && (
                                                            <div>
                                                                <div>
                                                                    <div>Customer Sentiment Analysis: <span className="text-red-600">{apianalysis.Customer_Sentiment.score}/10</span></div>
                                                                    <div>{apianalysis.Customer_Sentiment.detail}</div>
                                                                </div>
<br />
                                                                <div>
                                                                    <div>Customer Intent Analysis: {apianalysis.Customer_Intent.score}/10</div>
                                                                    <div>{apianalysis.Customer_Intent.detail}</div>
                                                                </div>
<br />
                                                                <div>
                                                                    <div>Agent Empathy: {apianalysis.Agent_Empathy.score}/10</div>
                                                                    <div>{apianalysis.Agent_Empathy.detail}</div>
                                                                </div>
<br />
                                                                <div>
                                                                    <div>Agent Promptness and Responsiveness: {apianalysis.Agent_Promptness_and_Responsiveness.score}/10</div>
                                                                    <div>{apianalysis.Agent_Promptness_and_Responsiveness.detail}</div>
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <div>Agent Knowledge: {apianalysis.Agent_Knowledge.score}/10</div>
                                                                    <div>{apianalysis.Agent_Knowledge.detail}</div>
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <div>Call Flow Optimization: {apianalysis.Call_Flow_Optimization.score}/10</div>
                                                                    <div>{apianalysis.Call_Flow_Optimization.detail}</div>
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <div>Call Completion Status: {apianalysis.Call_Completion_Status.score}/10</div>
                                                                    <div>{apianalysis.Call_Completion_Status.detail}</div>
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <div>Issue Resolved Status: {apianalysis.Issue_Resolved_Status.score}/10</div>
                                                                    <div>{apianalysis.Issue_Resolved_Status.detail}</div>
                                                                </div>
                                                                <br /><br /><br />

                                                            </div>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <h3 className="text-lg font-bold">Summary</h3>
                                                        {apisummary.map((item, index) => (
                                                            <div key={index}>
                                                                <br />
                                                                {item}
                                                                <br />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DrawerContent>
                                </Drawer>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
