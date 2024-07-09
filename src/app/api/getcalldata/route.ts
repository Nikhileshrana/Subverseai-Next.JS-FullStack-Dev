import { NextRequest , NextResponse } from "next/server";
import dbConnect from '../../lib/dbConnect';
import Usercall from '../../models/Usercall';


export async function POST(req: NextRequest, res: NextResponse) {
 try
 {
    await dbConnect();
    const data = await Usercall.find({});
    console.log(data);

    return NextResponse.json(data);
 }
 catch(e)
 {
    return NextResponse.json("Error in fetching data from getcalldata API");
 }
  
}