import dbConnect from '../../lib/dbConnect';
import UserInformation from '../../models/UserInformation';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) 
{
  try
  {
    await dbConnect();
    console.log("Database is Connected");

    const body = await req.json();
    console.log(body);

    await UserInformation.create({ 
      name:  body.name, 
      email: body.email, 
      username: body.username, 
      password: body.password,
      phone: body.phone,
      credits: 500,
    });


    return NextResponse.json({ data: "User Successfully Created. Please Login"});
  }
  catch(error){console.log(error);
    return NextResponse.json({data:"Not Valid!. Please try again with different Username or Email."});
  }
}