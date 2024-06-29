"use client";
import { useState, useRef, ClassAttributes, HTMLAttributes, JSX } from "react";
import { Button } from "@/components/ui/button";
import customerlist from "@/data/customerlist.json";
import transcriptData from "@/data/transcript.json";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress"
import Link from "next/link";

interface Utterance {
    start: number;
    end: number;
    confidence: number;
    punctuated_word: string;
    speaker: number;
    speaker_confidence: number;
}

interface TranscriptData {
    transcript: string;
    confidence: number;
}

interface Customer {
    CallID: number;
    Category: string;
    AgentName: string;
    CustomerID: string;
    CustomerSentiment: string;
    CallCompletionStatus: string;
    IssueResolvedStatus: string;
    call_rec: string; // Assuming this is the audio URL
}

export default function Data() {
    const [showAudio, setShowAudio] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Function to handle playing audio from a specific time
    const playFromSpecificTime = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            audioRef.current.play();
        }
    };


    return (
        <>
        <div className="p-2 text-right px-5"><Link href="/Dashboard_2"><Button variant="outline">Back</Button></Link></div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Call ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-center">Agent Name</TableHead>
                        <TableHead className="text-center">Customer ID</TableHead>
                        <TableHead className="text-center">Customer Sentiment</TableHead>
                        <TableHead className="text-center">Call Completion Status</TableHead>
                        <TableHead className="text-center">Issue Resolved Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customerlist.map((customer) => (
                        <TableRow key={customer.CallID}>
                            <TableCell className="font-medium">{customer.CallID}</TableCell>
                            <TableCell>{customer.Category}</TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="w-full text-center" variant="outline">{customer.AgentName}</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Agent Info</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    <p>Agent Empathy - {customer.AgentEmpathy}</p>
                                                    <p>Agent Performance - {customer.AgentPerformance}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell className="text-center">{customer.CustomerID}</TableCell>
                            <TableCell className="text-center">{customer.CustomerSentiment}</TableCell>
                            <TableCell className="text-center">{customer.CallCompletionStatus}</TableCell>
                            <TableCell className="text-center">{customer.IssueResolvedStatus}</TableCell>
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
                                                        src={customer.call_rec}
                                                        controls
                                                        className="w-full"
                                                        ref={audioRef}
                                                    />
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-bold">Transcript</h3>
                                                        <p className="mt-2 text-muted-foreground  h-40">
                                                            {transcriptData.results.utterances.map((utterance,index) => (
                                                                <span key={index}>
                                                                    <span
                                                                        className="cursor-pointer"
                                                                        onClick={() => {
                                                                            setCurrentTime(utterance.start);
                                                                            playFromSpecificTime(utterance.start);
                                                                        }}
                                                                    >
                                                                        {utterance.transcript}
                                                                        
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
                                                        {transcriptData.results.utterances.map((utterances, index) => (
                                                            <span key={index}>
                                                                {utterances.speaker === 1 ? (
                                                                    <span >
                                                                        <br />
                                                                        <span className="text-red-500">Customer: </span> {utterances.transcript}
                                                                        <br />
                                                                        <span> Confidence: <Progress value={(utterances.confidence)*100} /></span>
                                                                        <br />
                                                                    </span>
                                                                    
                                                                ) : (
                                                                    <span >
                                                                        <br />
                                                                        <span className="text-blue-500">Agent: </span> {utterances.transcript}
                                                                        <br />
                                                                    </span>
                                                                )}
                                                            </span>
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