import dbConnect from '../../lib/dbConnect';
import UserInformation from '../../models/UserInformation';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
    
  await dbConnect();
  

  try
  {
    const body = await req.json();
    const user = await UserInformation.findOne({ 
      email: body.email
    });
    console.log(user.credits);
      return NextResponse.json({ credits : user.credits });

  }
  catch(error)
  {
    return NextResponse.json({data:"Invalid Email. Please try again."});
  }


  
  }