import { NextRequest, NextResponse } from "next/server";
import dbConnect from '../../lib/dbConnect';
import Usercall from '../../models/Usercall';


export async function POST(req: NextRequest, res: NextResponse) {
   try {
      await dbConnect();
      const data = await Usercall.find({});
      console.log(data);







      console.log("Designed and Developed by Nikhilesh Rana. Full Stack Developer.");
      console.log("Email - realnikhileshrana@gmail.com");
      console.log("**************************************************************");
      console.log("Landing Page and a total of 15 Page UI Development");
      console.log("Worked on User Authentication.");
      console.log("Worked on Razorpay Payment Integration.");
      console.log("Worked on Credits System");
      console.log("Worked on Restful API for the User to send and recieve files");
      console.log("Transaction Viewer");
      console.log("Nodemailer contactus/RequestDemo mail goes to user&admin");
      console.log("Call Recordings Analytics");
      console.log("Google Sheets{exceldata} api to database");
      console.log("using Deepgram ai api for preloaded audio");
      console.log("Using GROQ api for Analysis and Summary.");
      console.log("Graph Representation");
      console.log("Js-Cookie");
      console.log("Tailwind CSS");
      console.log("ShadCN");
      console.log("Acertinity UI");
      console.log("Next.js");
      console.log("React.js");
      console.log("Typescript");
      console.log("**************************************************************");
      console.log("Email - realnikhileshrana@gmail.com");
      console.log("https://www.nikhileshrana.tech");




      return NextResponse.json(data);
   }
   catch (e) {
      return NextResponse.json("Error in fetching data from getcalldata API");
   }

}