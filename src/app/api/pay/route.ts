import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import shortid from 'shortid';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: shortid.generate(),
    };

    // Create a Promise for order creation
    const orderPromise = instance.orders.create(options);

    // Wait for the order to be created asynchronously
    const order = await orderPromise;

    return NextResponse.json({ success: true, id: order.id, amount: order.amount });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: "Internal Server Error" });
  }
}
