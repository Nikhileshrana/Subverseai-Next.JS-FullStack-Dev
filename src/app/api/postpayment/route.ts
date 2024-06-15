import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import dbConnect from "@/app/lib/dbConnect";
import UserInformation from '@/app/models/UserInformation';
import Paymenthistory from '@/app/models/Paymenthistory';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest) {
  await dbConnect();

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json() as {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };

  // Verify the signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    try {
      // Fetch payment details from Razorpay
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

      // Extract the amount and other details if needed
      const { amount, currency, notes } = paymentDetails as {
        amount: number;
        currency: string;
        notes: { [key: string]: any };
      };

      // Log the notes for debugging
      console.log("Payment Notes:", notes);

      // Extract email from the notes field
      const email = notes.email;

      // Fetch the user from the database using their email
      const user = await UserInformation.findOne({ email });

      // Get the current date
      const date = new Date();

      // Save payment history
      await Paymenthistory.create({ 
        date: date.toISOString(),
        email: email,
        amount:amount,
        razorpay_payment_id,
        razorpay_order_id
      });


      if (user) {
        // Update the user's credits
        user.credits += amount / 100; // Assuming the amount is in paise and you want to add the equivalent in rupees

        // Save the updated user information
        await user.save();

        return NextResponse.json({ success: true, amount, currency });
      } else {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }
    } catch (error) {
      console.error("Error fetching payment details or updating user:", error);
      return NextResponse.json({ success: false, error: 'Error fetching payment details or updating user' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
  }
}
