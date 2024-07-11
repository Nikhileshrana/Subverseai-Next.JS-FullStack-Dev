import { NextRequest, NextResponse } from "next/server";
import dbConnect from '../../lib/dbConnect';
import Usercall from '../../models/Usercall';


export async function POST(req: NextRequest, res: NextResponse) {
   try {
      await dbConnect();
      const data = await Usercall.find({}).select('Call_ID Customer_ID Agent_Name Call Call_Recording_URL Usecase Analysis');
      

      const newAnalysis = new Array(data.length);

      for(let i=0 ; i<data.length ; i++)
         {
            newAnalysis[i] = (JSON.parse(data[i].Analysis));
         }

      return NextResponse.json({ data, Analysis: newAnalysis });
   }
   catch (e) {
      return NextResponse.json("Error in fetching data from getcalldata API");
   }

}