//this is data page
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";





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
    Call_Completion_Status: string;
    Issue_Resolved_Status: string;
}

interface Userdata {
    Issue_Resolved_Status: any;
    Call_ID: number;
    Agent_Name: string;
    Customer_ID: string;
    Usecase: string;
    Call_Recording_URL: string;
    Analysis: AnalysisItem;

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
        setuserdata(response.data);
        // console.log(response.data);
    };


    const fetchmyanalysis = async (Call_ID: string) => {
        setIsLoading(true);
        const response = await axios.post("/api/getcallanalysisdata", { Call_ID: Call_ID });
        setApisummary(response.data.jsonconvertedsummary.summary);
        setApitranscript(response.data.transcriptWithSpeakers);
        setApianalysis(response.data.jsonconvertedanalysis);
        setIsLoading(false);
        // console.log(response.data);
    };


    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div></div>
            )}



            <div className="p-2 flex justify-between px-5">
                <Link href="/Admin">
                    <Button variant="outline">Back</Button>
                </Link>

                <Button className=" bg-blue-400 hover:bg-blue-500" onClick={getuserdatafromapi}>Load Data</Button>
            </div>

            <Table className="h-[60vh]">
                <TableCaption>To See Data Click on Top Right Button. :) </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Call ID</TableHead>
                        <TableHead className="text-center">Agent Name</TableHead>
                        <TableHead className="text-center">Customer ID</TableHead>
                        <TableHead className="text-center">Usecase</TableHead>
                        <TableHead className="text-center">Issue Resolution</TableHead>
                        <TableHead className="text-center">Customer Sentiment</TableHead>
                        <TableHead className="text-center">Customer Responsiveness</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {userdata.map((customer) => (
                        <TableRow key={customer.Call_ID}>
                            <TableCell className="font-medium text-center">{customer.Call_ID}</TableCell>
                            <TableCell className="font-medium text-center">
                                <Popover>
                                    <PopoverTrigger><Button className="w-[9vw]" variant="default">{customer.Agent_Name}</Button></PopoverTrigger>
                                    <PopoverContent className="flex-col justify-between">
                                        <div className="flex bg-zinc-700 justify-between my-2 px-2 py-1  rounded-xl">
                                            <div className="self-center font-semibold">Agent Empathy</div>
                                            <div className={getTextColor(customer.Analysis.Agent_Empathy.score)} >{customer.Analysis.Agent_Empathy.score}/10</div>
                                        </div>
                                        <div className="flex bg-zinc-700 justify-between my-2 px-2 py-1  rounded-xl">
                                            <div className="self-center font-semibold">Responsiveness</div>
                                            <div className={getTextColor(customer.Analysis.Agent_Promptness_and_Responsiveness.score)}>{customer.Analysis.Agent_Promptness_and_Responsiveness.score}/10</div>
                                        </div>
                                        <div className="flex bg-zinc-700 justify-between my-2 px-2 py-1  rounded-xl">
                                            <div className="self-center font-semibold">Agent Knowledge</div>
                                            <div className={getTextColor(customer.Analysis.Agent_Knowledge.score)}>{customer.Analysis.Agent_Knowledge.score}/10</div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell className="text-center">{customer.Customer_ID}</TableCell>
                            <TableCell className="text-center">{customer.Usecase}</TableCell>
                            <TableCell className="text-center">{customer.Analysis.Issue_Resolved_Status}</TableCell>
                            <TableCell className="text-center">{customer.Analysis.Customer_Sentiment.score}</TableCell>
                            <TableCell className="text-center">{customer.Analysis.Agent_Promptness_and_Responsiveness.score}</TableCell>





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
                                                            <div className="flex flex-col gap-6 bg-[#27272A] text-black w-[97%] p-4 rounded-2xl ">
                                                                <div className="border p-3 rounded-xl bg-zinc-700">
                                                                    <div className="flex justify-between">
                                                                    <span className="font-bold text-xl text-white">Customer Sentiment Analysis</span><span className={getTextColor(apianalysis.Customer_Sentiment.score)}>{apianalysis.Customer_Sentiment.score}/10</span>
                                                                    </div>
                                                                    <div className="border-2 border-white font-semibold w-fit px-5 py-1 rounded-xl text-[#27272A] bg-slate-300">{apianalysis.Customer_Sentiment.detail}</div>
                                                                </div>

                                                                <div className="border p-3 rounded-xl bg-zinc-700">
                                                                    <div className="flex justify-between">
                                                                    <span className="font-bold text-xl text-white">Customer Intent Analysis</span> <span className={getTextColor(apianalysis.Customer_Intent.score)}>{apianalysis.Customer_Intent.score}/10</span>
                                                                    </div>
                                                                    <div className="border-2 border-white font-semibold w-fit px-5 py-1 rounded-xl text-[#27272A] bg-slate-300">{apianalysis.Customer_Intent.detail}</div>
                                                                </div>

                                                                <div className="border p-3 rounded-xl bg-zinc-700">
                                                                    <div className="flex justify-between">
                                                                    <span className="font-bold text-xl text-white">Agent Empathy</span> <span className={getTextColor(apianalysis.Agent_Empathy.score)}>{apianalysis.Agent_Empathy.score}/10</span>
                                                                    </div>
                                                                    <div className="border-2 border-white font-semibold w-fit px-5 py-1 rounded-xl text-[#27272A] bg-slate-300">{apianalysis.Agent_Empathy.detail}</div>
                                                                </div>

                                                                <div className="border p-3 rounded-xl bg-zinc-700">
                                                                    <div className="flex justify-between">
                                                                    <span className="font-bold text-xl text-white">Agent Promptness and Responsiveness</span> <span className={getTextColor(apianalysis.Agent_Promptness_and_Responsiveness.score)}>{apianalysis.Agent_Promptness_and_Responsiveness.score}/10</span>
                                                                    </div>
                                                                    <div className="border-2 border-white font-semibold w-fit px-5 py-1 rounded-xl text-[#27272A] bg-slate-300">{apianalysis.Agent_Promptness_and_Responsiveness.detail}</div>
                                                                </div>

                                                                <div className="border p-3 rounded-xl bg-zinc-700">
                                                                    <div className="flex justify-between">
                                                                    <span className="font-bold text-xl text-white">Agent Knowledge</span><span className={getTextColor(apianalysis.Agent_Knowledge.score)}>{apianalysis.Agent_Knowledge.score}/10</span>
                                                                    </div>
                                                                    <div className="border-2 border-white font-semibold w-fit px-5 py-1 rounded-xl text-[#27272A] bg-slate-300">{apianalysis.Agent_Knowledge.detail}</div>
                                                                </div>

                                                                <div className="border p-3 rounded-xl bg-zinc-700">
                                                                    <div className="flex justify-between">
                                                                    <span className="font-bold text-xl text-white">Call Flow Optimization</span> <span className={getTextColor(apianalysis.Call_Flow_Optimization.score)}>{apianalysis.Call_Flow_Optimization.score}/10</span>
                                                                    </div>
                                                                    <div className="border-2 border-white font-semibold w-fit px-5 py-1 rounded-xl text-[#27272A] bg-slate-300">{apianalysis.Call_Flow_Optimization.detail}</div>
                                                                </div>

                                                                <div className="border p-3 rounded-xl bg-zinc-700 flex justify-between">
                                                                    <div className="font-bold text-xl text-white">Call Completion Status </div>
                                                                    <div className="font-bold p-2 bg-slate-300 text-[#27272A] rounded-2xl"> {apianalysis.Call_Completion_Status}</div>
                                                                </div>
     
                                                                <div className="border p-3 rounded-xl bg-zinc-700 flex justify-between">
                                                                    <div className="font-bold text-xl text-white">Issue Resolved Status </div>
                                                                    <div className="font-bold p-2 bg-slate-300 text-[#27272A] rounded-2xl">{apianalysis.Issue_Resolved_Status}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

<br /><br /><br />
                                                    <div className="flex flex-col gap-6 bg-[#27272A] text-white w-[97%] p-4 rounded-2xl ">
                                                        <h3 className="text-2xl font-bold text-white">Summary</h3>
                                                        {apisummary.map((item, index) => (
                                                            <div className="border rounded-2xl p-2 bg-zinc-700  font-semibold" key={index}>
                                                                {item}
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





const getTextColor = (score:string) => {
    if (Number(score) > 7) {
        return "text-white p-2 bg-green-600 font-semibold rounded-2xl";
    } else if (Number(score) >= 4 && Number(score) <= 7) {
        return "text-white p-2 bg-yellow-500 font-semibold rounded-2xl";
    } else {
        return "text-white p-2 bg-red-500 font-semibold rounded-2xl";
    }
};