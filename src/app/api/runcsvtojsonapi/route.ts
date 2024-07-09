//This API is used to import data from CSV to MongoDB Database. This is Developed by Nikhilesh Rana. https://www.nikhileshrana.tech

import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";
import dbConnect from '../../lib/dbConnect';
import Usercall from '../../models/Usercall';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=NTwjP_ztQ3jKh3TkH5Davk-SdxMdqfdr7CBzEB-VfXkaABzG1dsGTad0qhdqZ8-Sp0dYjKZh-SAHw5GO6vRwi_M9n7Y74gXOm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnK6CqSIS2RFH3BTLd_Ept4sXdR9_oLa-35ATC6ByTVo3zcmqUnrgU8kY7OuuBcRss_FxaIVCJHafwghPfdcWuOroXoRe8FkOi9z9Jw9Md8uu&lib=MMBgbiU6hO1hq2gQ9dDx3m4cSD5YnuDq6");

        await dbConnect();

        for (let i = 1; i < response.data.data.length; i++) {
            try {
                await Usercall.create({
                    Call_ID: response.data.data[i].Call_ID,
                    Customer_ID: response.data.data[i].Customer_ID,
                    Agent_Name: response.data.data[i].Agent_Name,
                    Call_Recording_URL: response.data.data[i].Call_Recording_URL,
                    Usecase: response.data.data[i].Usecase,
                });






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




                // console.log("Data inserted successfully for row : ",i);
            }
            catch (e) {
                console.log("Data Already Present", i)
            }
        }

        return NextResponse.json({ message: "Google Sheets Data Saved to Database." });
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Error Occurred" });
    }
}
