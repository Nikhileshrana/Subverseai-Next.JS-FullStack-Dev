# Website Documentation

## 1. Introduction
### Purpose
This website converts data from Google Sheets into audio transcriptions and processes them to generate analysis and summaries.

### Overview
Users can upload their Google Sheets data containing `CALL_ID`, `CUSTOMER_ID`, `AGENT_NAME`, and `CALL_REC_URL`. The website processes this data, converting audio recordings into transcriptions, analyzing the content, and generating summaries.

## 2. Getting Started
### Prerequisites
- Google account
- Deepgram API key
- Groq API key
- MongoDB URL
- NEXT_PUBLIC_RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET
- COMPANY_NAME

### UI Library
- Acertinity UI
- ShadCN

### Installation
1. Clone the repository: `git clone <repository-url>`
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
### API Documentation

## /Signup
- Endpoint URL : `/api/signup`
- Method : `POST`
- Parameters : `name, email, username, password , phone`
- Response : `response.data`

## /Login
- Endpoint URL : `/api/login`
- Method : `POST`
- Parameters : `email, password`
- Response : `response.data`

## /Admin
- Endpoint URL : `/api/savecsvtodb`
- Method : `POST`
- Parameters : `{}`
- Response : `response.data.message`

## /Dashboard
- Endpoint URL : `/api/getcredits`
- Method : `POST`
- Parameters : `email`
- Response : `response.data.credits`


