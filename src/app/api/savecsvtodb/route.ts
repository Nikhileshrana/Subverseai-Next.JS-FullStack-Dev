import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/app/lib/dbConnect";
import Usercall from '@/app/models/Usercall';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
const { createClient } = require("@deepgram/sdk");
import Groq from "groq-sdk";

// Initialize clients with environment variables
const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPromptFolder = path.join(process.cwd(), 'src/system_prompts');

interface ChatCompletionMessageParam {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Function to read and parse system prompts from files
const getSystemPrompt = (filename: string): ChatCompletionMessageParam[] => {
  const systemPrompt: ChatCompletionMessageParam[] = [];
  const filePath = path.join(systemPromptFolder, filename);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    fileContent.split('\n').forEach(line => {
      const parts = line.trim().split('=');
      if (parts.length === 2) {
        const [key, value] = parts;
        systemPrompt.push({ role: "system", content: value });
      }
    });
  } catch (error) {
    console.error(`Failed to read system prompt file: ${filename}`, error);
  }

  return systemPrompt;
};

// Function to interact with the LLM API and get responses
const llmResponse = async (query: string, conversationHistory: ChatCompletionMessageParam[]) => {
  try {
    const response = await groq.chat.completions.create({
      messages: conversationHistory.concat({ role: "user", content: query }),
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    return response.choices[0]?.message?.content || '{}';
  } catch (error) {
    console.error('Failed to get LLM response:', error);
    return '{}';
  }
};

// Function to perform call analysis
const getCallAnalysis = async (systemPromptFile: string, transcriptWithSpeakers: any) => {
  const systemPrompt = getSystemPrompt(systemPromptFile);
  const conversationHistory: ChatCompletionMessageParam[] = [...systemPrompt];

  transcriptWithSpeakers.forEach((utterance: any) => {
    const role: 'user' | 'assistant' = utterance.speaker === 0 ? "user" : "assistant";
    conversationHistory.push({ role, content: utterance.transcript });
  });

  const summaryQuery = "There could be ASR and speaker recognition errors. Assume the call is getting transferred to the supervisor. Please write a conversation summary with bullet points wherever applicable, for the supervisor to get an overall understanding of conversation so far.";
  const callSummary = await llmResponse(summaryQuery, conversationHistory);

  const analysisQuery = "There could be ASR and speaker recognition errors. I'm looking to analyze conversations for call center analytics. Perform Customer Sentiment Analysis, Customer Intent Analysis, Agent Empathy, Agent Promptness and Responsiveness, Agent Knowledge, Call Flow Optimization, Call Completion Status value as Completed or Not Completed only, Issue Resolved Status value as Resolved or Not Resolved only. Output should be in JSON format without headings. For ratings, use numbers like 8 instead of formats like 8/10. The JSON structure should follow this format: { Customer_Sentiment: {score, detail}, Customer_Intent: {score, detail}, Agent_Empathy: {score, detail}, Agent_Promptness_and_Responsiveness: {score, detail}, Agent_Knowledge: {score, detail}, Call_Flow_Optimization: {score, detail}, Call_Completion_Status , Issue_Resolved_Status }. Ensure each metric includes a score and a detail. Remove the heading and just provide the JSON ";
  const callAnalysis = await llmResponse(analysisQuery, conversationHistory);

  return [callSummary, callAnalysis];
};

// Function to convert summary to JSON format
function convertsummarytojson(summary: string): { summary: string[] } {
  const points = summary.trim().split("\n* ");
  points.shift();

  const conversation: { summary: string[] } = { summary: [] };

  points.forEach(point => {
    conversation.summary.push(point.trim());
  });

  return conversation;
}

// Function to process a batch of calls
const processBatch = async (calls: string | any[], batchStart: number, batchSize: number) => {
  await dbConnect();
  for (let i = batchStart; i < batchStart + batchSize && i < calls.length; i++) {
    const callID = calls[i].Call_ID;

    // Check if the record already exists in the database
    const existingRecord = await Usercall.findOne({ Call_ID: callID });

    if (existingRecord) {
      console.log(`Record already exists for Call_ID: ${callID}`);
      continue; // Skip this entry if it already exists
    }

    const usecase = calls[i].Usecase;
    const audioUrl = calls[i].Call_Recording_URL;
    const systemPromptFile = `${usecase}.txt`;

    try {
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        { url: audioUrl },
        {
          model: "nova-2",
          utterances: true,
          language: "en-IN",
          detect_language: true,
          diarize: true,
          punctuate: true,
          smart_format: true,
          numerals: true,
          paragraphs: true,
        }
      );

      if (error) {
        console.error('Error during transcription: URL / Usecase Incorrect');
        continue;
      }

      const transcriptWithSpeakers = result.results.utterances.map((utterance: any) => ({
        speaker: utterance.speaker,
        start: utterance.start,
        transcript: utterance.transcript
      }));

      const [callSummary, callAnalysis] = await getCallAnalysis(systemPromptFile, transcriptWithSpeakers);

      const jsonconvertedsummary = convertsummarytojson(callSummary);
      const jsonconvertedanalysis = JSON.parse(callAnalysis);

      try {
        await Usercall.create({
          Call_ID: callID,
          Customer_ID: calls[i].Customer_ID,
          Agent_Name: calls[i].Agent_Name,
          Call_Recording_URL: calls[i].Call_Recording_URL,
          Usecase: calls[i].Usecase,
          Transcript: JSON.stringify(transcriptWithSpeakers),
          Summary: JSON.stringify(jsonconvertedsummary),
          Analysis: JSON.stringify(jsonconvertedanalysis),
        });

        console.log("Data inserted successfully for row:", i);
      } catch (dbError) {
        console.error('Database error for row:', i, dbError);
      }
    } catch (transcriptionError) {
      console.error('Error during transcription:', i, transcriptionError);
    }
  }
};

// Main handler for the POST request
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=NTwjP_ztQ3jKh3TkH5Davk-SdxMdqfdr7CBzEB-VfXkaABzG1dsGTad0qhdqZ8-Sp0dYjKZh-SAHw5GO6vRwi_M9n7Y74gXOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnK6CqSIS2RFH3BTLd_Ept4sXdR9_oLa-35ATC6ByTVo3zcmqUnrgU8kY7OuuBcRss_FxaIVCJHafwghPfdcWuOroXoRe8FkOi9z9Jw9Md8uu&lib=MMBgbiU6hO1hq2gQ9dDx3m4cSD5YnuDq6");

    const batchSize = 10; // Define the size of each batch
    for (let i = 0; i < response.data.data.length; i += batchSize) {
      await processBatch(response.data.data, i, batchSize);
    }

    return NextResponse.json({ message: "Data Inserted Successfully" });
  } catch (axiosError) {
    console.error('Axios error:', axiosError);
    return NextResponse.json({ error: 'Failed to fetch data' });
  }
}
