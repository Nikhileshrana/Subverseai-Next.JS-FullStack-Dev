import { NextRequest, NextResponse } from "next/server";
import dbConnect from '../../lib/dbConnect';
import Usercall from '../../models/Usercall';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        await dbConnect();
        const data = await Usercall.find({}).select('Call_ID Customer_ID Agent_Name Call Call_Recording_URL Usecase Analysis');

        // Convert Analysis field from string to JSON
        const modifiedData = data.map(item => {
            const analysisJson = JSON.parse(item.Analysis);
            return {
                ...item.toObject(), // Convert Mongoose document to plain JavaScript object
                Analysis: analysisJson
            };
        });


        console.log(modifiedData);
        
        return NextResponse.json(modifiedData);
    } catch (e) {
        return NextResponse.json({ error: "Error in fetching data from getcalldata API" });
    }
}
