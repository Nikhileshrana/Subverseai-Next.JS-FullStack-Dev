# Website Documentation

# 1. Introduction
## Purpose
This website converts data from Google Sheets into audio transcriptions and processes them to generate analysis and summaries for Better organization of data. Making it a SAAS Platform.

## Overview
Users can upload their Google Sheets data containing `CALL_ID`, `CUSTOMER_ID`, `AGENT_NAME`, `Usecase` and `CALL_REC_URL`.The website processes this data, converting audio recordings into transcriptions, analyzing the content, and generating summaries.

# 2. Getting Started
## Prerequisites
- Google account
- Deepgram API key
- Groq API key
- MongoDB URL
- NEXT_PUBLIC_RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- COMPANY_NAME

## UI Library
- Acertinity UI
- ShadCN

## Installation
1. Clone the repository: ## git clone https://github.com/Nikhileshrana/Subverseai-Next.JS-FullStack-Dev.git
2. Install dependencies: `npm install`
3. Run Code as Developer:  `npm run dev`
4. Run Code as Production:  `npm run build , npm run start`
5. Set up environment variables:
   ```plaintext
   MONGODB_URI=<your-google-sheets-api-key>
   DEEPGRAM_API_KEY=<your-deepgram-api-key>
   GROQ_API_KEY=<your-groq-api-key>
   EMAIL_USER=<Email of user for Request Demo/Contact>
   EMAIL_PASS=<Email Password Setup for Request Demo/Contact>
   ```


# User Creation and Info Storage
- User's Info Stored in Browser Cookie using jscookie Module of NPM after Successful Login.
- User's is then Pushed using `router.push` to the dashboard page depending upon the type of user. That is , if the users `email === info@subverseai.com` user is pushed to Admin panel which only Allows `email === info@subverseai.com` in React Routing.
- If `email != info@subverseai.com` then user is pushed to normal Dashboard for Viewing THE Global Data.
- We can change the Dashboard Routing based on the cookie.email and applying condition to every email and then routing it to its Dashboard. Its not Dynamic Because of the Intial Requirement of the Company.


# Database Setup
Total 3 Database Schema is Defined. 
1. paymenthistories
2. usercalls
3. userinformation

## 1. paymenthistories
- date
- email
- amount
- razorpay_payment_id
- razorpay_order_id

## 2. usercalls
- Call_ID
- Customer_ID
- Agent_Name
- Call_Recording_URL
- Usecase
- Transcript
- Summary
- Analysis

## 3. userinformations
- name
- email
- username
- phone
- password
- credits






# API Documentation

# /Signup
- Endpoint URL : `/api/signup`
- Method : `POST`
- Parameters : `name, email, username, password , phone`
- Response : `response.data`

# /Login
- Endpoint URL : `/api/login`
- Method : `POST`
- Parameters : `email, password`
- Response : `response.data`

# /Admin
- Endpoint URL : `/api/savecsvtodb`
- Method : `POST`
- Parameters : `{}`
- Response : `response.data.message`

# /Dashboard
- Endpoint URL : `/api/getcredits`
- Method : `POST`
- Parameters : `email`
- Response : `response.data.credits`

# /Data

### For Fetching User Info Data Only
- Endpoint URL : `/api/getcalldata`
- Method : `POST`
- Parameters : `{}`
- Response : `response.data`

### For Fetching Current User Transcription + Summary + Analysis Data from DB
- Endpoint URL : `/api/getcallanalysisdata`
- Method : `POST`
- Parameters : `{Call_ID: Call_ID}`
- Response -
   1. Summary : `response.data.jsonconvertedsummary.summary`
   2. Transcription : `response.data.transcriptWithSpeakers`
   3. Analysis : `response.data.jsonconvertedanalysis`


# Call Data Processing Script (/api/savecsvtodb)
## Features
- Data Retrieval: `Fetches call data from a Google Sheets API.`
- Database Connection: `Establishes a connection to the database.`
- Duplicate Check: `Checks for existing records in the database to avoid duplicates.`
- Audio Transcription: `Uses the Deepgram API to transcribe call recordings.`
- Call Analysis: `Generates a summary and analysis of the call.`
- Data Insertion: `Inserts the processed data into the database.`

## Function and Parameters 
1. fetchDataFromGoogleSheets : `Fetches call data from a Google Sheets API.` , Endpoint : `https://script.googleusercontent.com/macros/echo?user_content_key=NTwjP_ztQ3jKh3TkH5Davk-SdxMdqfdr7CBzEB-VfXkaABzG1dsGTad0qhdqZ8-Sp0dYjKZh-SAHw5GO6vRwi_M9n7Y74gXOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnK6CqSIS2RFH3BTLd_Ept4sXdR9_oLa-35ATC6ByTVo3zcmqUnrgU8kY7OuuBcRss_FxaIVCJHafwghPfdcWuOroXoRe8FkOi9z9Jw9Md8uu&lib=MMBgbiU6hO1hq2gQ9dDx3m4cSD5YnuDq6`
2. dbConnect : `Establishes a connection to the MongoDB database.`
3. processCallData : `Processes the call data by checking for duplicates, transcribing audio, generating summaries and analyses, and inserting data into the database.` , Parameters :  `data` An array of call data retrieved from the Google Sheets API.
4. transcribeAudio : `Transcribes audio from a given URL using the Deepgram API.` , Parameters : `audioUrl` The URL of the audio file to be transcribed.
5. getCallAnalysis : Generates a summary and analysis of the call based on the transcript. Parameters : `systemPromptFile` : The filename of the system prompt for generating the call analysis. `transcriptWithSpeakers` : The transcript of the call with speaker information.

6. convertsummarytojson :  `Converts the call summary to JSON format.` , Parameters : `callSummary` : The summary of the call.

























