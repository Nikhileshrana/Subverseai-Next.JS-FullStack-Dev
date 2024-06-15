import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dbConnect";
import Paymenthistory from "@/app/models/Paymenthistory";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {

        console.log("Fetching transactions...");
        const body = await req.json();
        console.log("Request body:", body);
        const transactions = await Paymenthistory.find({ email: body.email });
        return NextResponse.json({ transactions });

    } catch (e) {
        console.error("Error fetching transactions:", e);
        return NextResponse.json({ error: "An error occurred while fetching transactions" }, { status: 500 });
    }
}