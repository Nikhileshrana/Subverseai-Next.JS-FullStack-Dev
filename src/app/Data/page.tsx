"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import customerlist from "@/data/customerlist.json";
import transcriptData from "@/data/transcript.json";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import axios from "axios";


interface Utterance {
    start: number;
    confidence: number;
    speaker: number;
    transcript: string;
}

interface TranscriptData {
    transcript: string;
    confidence: number;
    results: {
        utterances: Utterance[];
    };
}

interface Userdata {
    Call_ID: number;
    Agent_Name: string;
    Customer_ID: string;
    Usecase: string;
    Call_Recording_URL : string
}

export default function Data() {
    const [showAudio, setShowAudio] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [newAnalysis, setNewAnalysis] = useState<any>(null);

    // Parse JSON analysis on component mount
    useEffect(() => {
        const analysis = `{
            "customerSentimentAnalysis": 8,
            "customerSentimentSummary": "The customer, Rishi, seemed satisfied with the conversation, asking questions and engaging with the agent. However, there were no explicit expressions of satisfaction or delight.",
            "customerIntentAnalysis": "INQUIRY",
            "customerIntentSummary": "Rishi's intent was to inquire about the Nebula 24 mobile phone, its features, and financing options.",
            "agentPerformanceAnalysis": 9,
            "agentPerformanceSummary": "The agent, Puja, was knowledgeable about the product and provided clear, concise answers to Rishi's questions. She actively listened to Rishi's concerns and addressed them promptly. However, there were some instances where Puja could have probed deeper to understand Rishi's needs better.",
            "callFlowOptimization": 8,
            "callFlowSummary": "The conversation flowed smoothly, with Puja guiding Rishi through the product features and financing options. However, there were some instances where Puja could have summarized the discussion or provided a clear summary of the next steps.",
            "callCompletionStatus": "COMPLETE",
            "issueResolvedStatus": "RESOLVED",
            "qualityAssurance": 8.5,
            "qualityAssuranceSummary": "The conversation was well-structured, and Puja demonstrated product knowledge and customer service skills. However, there were some opportunities for Puja to ask more open-ended questions to understand Rishi's needs better.",
            "specificInstances": [
              "Puja could have asked more open-ended questions to understand Rishi's needs better, such as 'What do you plan to use the phone for?' or 'How important is camera quality to you?'",
              "Puja could have summarized the discussion and provided a clear summary of the next steps, such as 'Just to confirm, you'd like to proceed with the 0% interest EMI plan with ICICI Bank, correct?'",
              "Puja demonstrated excellent product knowledge, such as when explaining the features of the Nebula 24 mobile phone."
            ]
          }`;

        setNewAnalysis(JSON.parse(analysis));
    }, []);

    // Function to handle playing audio from a specific time
    const playFromSpecificTime = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            audioRef.current.play();
        }
    };


    const [userdata, setuserdata] = useState<Userdata[]>([]);
    const getuserdatafromapi = async () =>
    {
        const response = await axios.post("/api/getcalldata");
        await setuserdata(response.data);
        console.log(response.data);
    }



    return (
        <>

<Button onClick={getuserdatafromapi}>Click to get User Data</Button>

            <div className="p-2 text-left px-5">
                <Link href="/Dashboard_2">
                    <Button variant="outline">Back</Button>
                </Link>
            </div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Call ID</TableHead>
                        <TableHead>Agent Name</TableHead>
                        <TableHead className="text-center">Customer ID</TableHead>
                        <TableHead className="text-center">Usecase</TableHead>
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
                                        <Button variant="outline">View More</Button>
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
                                                            {transcriptData.results.utterances.map((utterance, index) => (
                                                                <span key={index}>
                                                                    <span
                                                                        className="cursor-pointer"
                                                                        onClick={() => {
                                                                            setCurrentTime(utterance.start);
                                                                            playFromSpecificTime(utterance.start);
                                                                        }}
                                                                    >
                                                                        {utterance.speaker === 1 ? (
                                                                            <>
                                                                                <br />
                                                                                <span className="text-red-500">Customer: </span> {utterance.transcript}
                                                                                <br />
                                                                                <span>Confidence: <Progress className="w-40 border-2 border-orange-800" value={utterance.confidence * 100} /></span>
                                                                                <br />
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <br />
                                                                                <span className="text-blue-500">Agent: </span> {utterance.transcript}
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
                                            <div className="bg-background p-6 flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-xl font-bold">Analysis</h2>
                                                    <DrawerClose asChild>
                                                        <Button variant="outline">Back</Button>
                                                    </DrawerClose>
                                                </div>
                                                <div className="flex-1 overflow-auto">
                                                    <div className="h-40 text-gray-500">
                                                        {newAnalysis && (
                                                            <>
                                                                <h2>Customer Sentiment Analysis: {newAnalysis.customerSentimentAnalysis}</h2>
                                                                {newAnalysis.customerSentimentAnalysis > 7 ? (
                                                                    <svg width="40" height="40px" viewBox="0 0 36.00 36.00" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#2fdd2c" cx="18" cy="18" r="18"></circle></g></svg>) : newAnalysis.customerSentimentAnalysis > 4 ? (
                                                                        <svg width="40px" height="40px" viewBox="0 0 36.00 36.00" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#2c99dd" cx="18" cy="18" r="18"></circle></g></svg>) : (
                                                                    <svg width="40px" height="40px" viewBox="0 0 36.00 36.00" xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img"  preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle fill="#DD2E44" cx="18" cy="18" r="18"></circle></g></svg>
                                                                )}

                                                                <li>{newAnalysis.customerSentimentSummary}</li>
                                                                <li>Agent Performance: {newAnalysis.agentPerformanceAnalysis}</li>
                                                                <li>{newAnalysis.agentPerformanceSummary}</li>
                                                                <li>Call Flow Optimization: {newAnalysis.callFlowOptimization}</li>
                                                                <li>{newAnalysis.callFlowSummary}</li>
                                                                <li>Quality Assurance: {newAnalysis.qualityAssurance}</li>
                                                                <li>{newAnalysis.qualityAssuranceSummary}</li>
                                                                <li>Specific Instances:</li>
                                                                <ul>
                                                                    {newAnalysis.specificInstances.map((instance: string, index: number) => (
                                                                        <li key={index}>{instance}</li>
                                                                    ))}
                                                                </ul>

                                                            </>
                                                        )}
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
