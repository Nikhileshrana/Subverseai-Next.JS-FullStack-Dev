import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const { createClient } = require("@deepgram/sdk");
import Groq from "groq-sdk";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPromptFolder = path.join(process.cwd(), 'src/system_prompts');

interface ChatCompletionMessageParam {
  role: 'system' | 'user' | 'assistant';
  content: string;
}








const getSystemPrompt = (filename: string): ChatCompletionMessageParam[] => {
  const systemPrompt: ChatCompletionMessageParam[] = [];
  const filePath = path.join(systemPromptFolder, filename);

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

  const analysisQuery = "There could be ASR and speaker recognition errors. I'm looking to analyze conversations for call center analytics. Perform Customer Sentiment Analysis, Customer Intent Analysis, Agent Empathy, Agent Promptness and Responsiveness, Agent Knowledge, Call Flow Optimization, Call Completion Status, and Issue Resolved Status. Output should be in JSON format without headings. For ratings, use numbers like 8 instead of formats like 8/10. The JSON structure should follow this format: { Customer_Sentiment: {score, detail}, Customer_Intent: {score, detail}, Agent_Empathy: {score, detail}, Agent_Promptness_and_Responsiveness: {score, detail}, Agent_Knowledge: {score, detail}, Call_Flow_Optimization: {score, detail}, Call_Completion_Status: {score, detail}, Issue_Resolved_Status: {score, detail} }. Ensure each metric includes a score and a detail. Remove the heading and just provide the JSON";
  const callAnalysis = await llmResponse(analysisQuery, conversationHistory);



  // console.log(callAnalysis);

  return [callSummary, callAnalysis];


  
};






function convertsummarytojson(summary: string): { summary: string[] } {
  const points = summary.trim().split("\n* ");
  points.shift();

  const conversation: { summary: string[] } = { summary: [] };

  points.forEach(point => {
    conversation.summary.push(point.trim());
  });

  return conversation;
}










export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  let audioUrl = body.audioUrl;
  let usecase = body.usecase;

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
      console.error('Error during transcription:', error);
      return NextResponse.json({ error: 'Error occurred during transcription' });
    }






    const transcriptWithSpeakers = result.results.utterances;
    const [callSummary, callAnalysis] = await getCallAnalysis(systemPromptFile, transcriptWithSpeakers);

    const jsonconvertedsummary = convertsummarytojson(callSummary);
    const jsonconvertedanalysis = JSON.parse(callAnalysis)

    
    // console.log(jsonconvertedanalysis);





    return NextResponse.json({ transcriptWithSpeakers, jsonconvertedsummary, jsonconvertedanalysis });

  } catch (error) {
    console.error('Error during transcription:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}