//This API is used to import data from CSV to MongoDB Database. This is Developed by Nikhilesh Rana. https://www.nikhileshrana.tech

import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";
import dbConnect from '../../lib/dbConnect';
import Usercall from '../../models/Usercall';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const response = await axios.get("https://script.google.com/macros/s/AKfycbyHDYksdux_LFORTnWOulkY1t1mVsRAiPtmBXDid_GVBA9Gvnd4iJodg9PANQgTEfZ3rA/exec");

        await dbConnect();

        for(let i=1;i<response.data.data.length;i++)
        {
            try{
            await Usercall.create({ 
                Call_ID : response.data.data[i].Call_ID,
                Customer_ID : response.data.data[i].Customer_ID,
                Agent_Name : response.data.data[i].Agent_Name,
                Call_Recording_URL : response.data.data[i].Call_Recording_URL,
              });

            console.log("Data inserted successfully for row : ",i);
            }
            catch(e)
            {
                console.log("Data Already Present",i)
            }
        }

        return NextResponse.json({ message: "Data Imported to Database Successfully" });
    }
    catch (e) 
    {
        return NextResponse.json({ data: "Error Occurred" });
    }
}
