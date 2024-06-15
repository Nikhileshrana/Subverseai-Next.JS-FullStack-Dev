"use client";
import Script from "next/script";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link"
import Cookies from 'js-cookie';
import { Toaster, toast } from "sonner";
import Header from "@/app/components/Header";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const [amount, setAmount] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Fetch initial state from cookies
    setName(Cookies.get('name') || "");
    setEmail(Cookies.get('email') || "");
    setPhone(Cookies.get('phone') || "");
  }, []);

  const initiatePayment = async () => {
    if (!email) {
      console.log("Please Login First");
      toast("No Login Detected.", {
        description: "Details Not Found. Login ~ !",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        }
      });
      return;
    }

    try {
      const response = await axios.post("/api/pay", { amount, currency: "INR" });
      const orderDetails = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderDetails.amount,
        currency: "INR",
        name: "SUBVERSEAI",
        description: "SUBVERSEAI CREDITS TOPUP",
        image: "data:image/jpeg;base64,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",
        order_id: orderDetails.id,
        handler: async function (response: any) {
          await fetch("/api/postpayment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              razorpay_payment_link_status: response.razorpay_payment_link_status,
            })
          });

          // Log message on the frontend
          setMessage("Payment successful");

          toast(`Hi , ${name}`, {
            description: "Payment successful",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            }
          });
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        notes: {
          email,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("There was an error initiating the payment. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

      <Toaster position="top-center" />

      <div className="flex flex-col h-auto">
        <main className="flex-1">

          <section className="bg-gray-100 dark:bg-[#09090B] py-20 md:py-32 lg:py-1 px-6 md:px-8 lg:px-10 min-h-screen">
            <Link className="px-[3.5vw]" href="/Dashboard"><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg></Link>
            <div className="max-w-2xl mx-auto space-y-10">
              <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Top Up Your Credits</h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400">
                  Choose the amount of credits you want to add to your account.
                </p>
              </div>
              <Card className="bg-white dark:bg-[#09090B] rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle>Credit Top Up</CardTitle>
                  <span>{email}</span>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">₹100</div>
                      <div className="text-2xl font-bold">100 Credits</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">₹500</div>
                      <div className="text-2xl font-bold">500 Credits</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">₹1000</div>
                      <div className="text-2xl font-bold">1000 Credits</div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="credits">Custom Amount</Label>
                    <div className="flex items-center">
                      <Input id="credits" type="number" placeholder="Enter Amount in ₹" onChange={(e) => setAmount(Number(e.target.value) || 0)} className="flex-1" />
                      <div className="text-2xl font-bold ml-4">
                        {amount} Credits
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="w-full" onClick={initiatePayment}>Top Up</Button>
                  <Link href="/Transactions"><Button className="w-full">View Transactions</Button></Link>
                </CardFooter>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
