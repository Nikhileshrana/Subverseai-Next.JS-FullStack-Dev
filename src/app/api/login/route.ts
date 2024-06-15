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

    if (user.password===body.password) {
      console.log("User: ", user);
      return NextResponse.json({ data: "User Successfully Logged In",userdata:user});
    }
    else {
      return NextResponse.json({ data: "Login Failed - Invalid Password. Please try again."});
    }

  }
  catch(error)
  {
    return NextResponse.json({data:"Invalid Email. Please try again."});
  }


  
  }