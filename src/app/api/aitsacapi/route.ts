import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const { createClient } = require("@deepgram/sdk");
import Groq from "groq-sdk";


const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPromptFolder = 'system_prompts';

interface ChatCompletionMessageParam {
  role: 'system' | 'user' | 'assistant';
  content: string;
}






const getSystemPrompt = (filename: string): ChatCompletionMessageParam[] => {
  const systemPrompt: ChatCompletionMessageParam[] = [];
  const filePath = path.join(process.cwd(), filename);

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  fileContent.split('\n').forEach(line => {
    const parts = line.trim().split('=');
    if (parts.length === 2) {
      const [key, value] = parts;
      systemPrompt.push({ role: "system", content: value });
    }
  });

  return systemPrompt;
};







const llmResponse = async (query: string, conversationHistory: ChatCompletionMessageParam[]) => {
  const response = await groq.chat.completions.create({
    messages: conversationHistory.concat({ role: "user", content: query }),
    model: "llama3-8b-8192",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
  });


  try {
    return response.choices[0]?.message?.content || '{}';
  } catch (error) {
    console.error('Failed to parse LLM response as JSON:', error);
    return response.choices[0]?.message?.content || '';
  }
};











const getCallAnalysis = async (systemPromptFile: string, transcriptWithSpeakers: any) => {
  const systemPrompt = getSystemPrompt(systemPromptFile);
  const conversationHistory: ChatCompletionMessageParam[] = [...systemPrompt];

  transcriptWithSpeakers.forEach((utterance: any) => {
    const role: 'user' | 'assistant' = utterance.speaker === 0 ? "user" : "assistant";
    conversationHistory.push({ role, content: utterance.transcript });
  });

  const summaryQuery = "There could be ASR and speaker recognition errors. Assume the call is getting transferred to the supervisor. Please write a conversation summary with bullet points wherever applicable, for the supervisor to get an overall understanding of conversation so far.";
  const callSummary = await llmResponse(summaryQuery, conversationHistory);

  const analysisQuery = "There could be ASR and speaker recognition errors. I want to make use of call center analytics on this conversation. Please perform Customer Sentiment Analysis, Customer Intent Analysis, Agent Empathy, Agent Promptness and Responsiveness, Agent Knowledge, Call Flow Optimization, Call Completion Status, Issue Resolved Status, and Quality Assurance - one sentence explanation per criterion is enough. Highlight important specific instances wherever required during this analysis. Give rating out of 10 or Boolean values as applicable and write ratings in front of each evaluation criterion title.";
  const callAnalysis = await llmResponse(analysisQuery, conversationHistory);

  return [callSummary, callAnalysis];
};







export async function POST(req: NextRequest, res: NextResponse) {


  const body = await req.json();

  let audioUrl = body.audioUrl;
  let usecase = body.usecase;

  const systemPromptFile = `${systemPromptFolder}/${usecase}.txt`;

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
      console.error('Error during transcription:', error);
      return NextResponse.json({ error: 'Error occurred during transcription' });
    }

    const transcriptWithSpeakers = result.results.utterances;
    const [callSummary, callAnalysis] = await getCallAnalysis(systemPromptFile, transcriptWithSpeakers);



    const jsonconvertedsummary = convertsummarytojson(callSummary);
    // console.log(jsonconvertedsummary);






    interface Analysis {
      [key: string]: {
        value: string;
        rating?: string;
        status?: string;
      };
    }

    interface AnalysisResult {
      analysis: Analysis;
    }

    const convertAnalysisToJson = (text: string): string[] => {
      const analysisArray: string[] = [];
      const lines = text.trim().split('\n').filter(line => line.trim() !== '');
    
      lines.forEach(line => {
        if (line.includes(':')) {
          const [key, ...valueParts] = line.split(': ');
          const value = valueParts.join(': ');  // Handles cases where the value contains a colon
          if (value) {
            analysisArray.push(`${key.trim()}: ${value.trim()}`);
          }
        }
      });
    
      return analysisArray;
    };







    const jsonconvertedanalysis = convertAnalysisToJson(callAnalysis);

    
    console.log(jsonconvertedanalysis);
    console.log(transcriptWithSpeakers);
    console.log(jsonconvertedsummary);
    
    return NextResponse.json({transcriptWithSpeakers , jsonconvertedsummary , jsonconvertedanalysis });

  } catch (error) {
    console.error('Error during transcription:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}








function convertsummarytojson(summary: string): { summary: string[] } {
  // Split the summary into individual bullet points
  const points = summary.trim().split("\n* ");
  points.shift(); // Remove the first element (empty string)

  // Create an object to store the summary array
  const conversation: { summary: string[] } = { summary: [] };

  // Loop through each bullet point and push into the summary array
  points.forEach(point => {
    conversation.summary.push(point.trim());
  });

  return conversation;
}