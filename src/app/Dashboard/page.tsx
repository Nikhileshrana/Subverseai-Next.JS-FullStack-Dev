"use client"

import axios from "axios"
import Cookies from 'js-cookie';
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Header from "@/app/components/Header"
import Product from "@/app/components/Product"
import { useRouter } from 'next/navigation';


export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [credits, setCredits] = useState("XXX");
  const [phone, setPhone] = useState("");

      if(Cookies.get('email')=="" || Cookies.get('email')==undefined || Cookies.get('email')==null)
        {
          router.push("/Login");
        }
        else
        {
          console.log("Logged in");
        }


  useEffect(() => {
    setName(Cookies.get('name') || "");
    setUsername(Cookies.get('username') || "");
    setEmail(Cookies.get('email') || "");
    setPhone(Cookies.get('phone') || "");


  }, []);

  const getcredits = async () => {
    const response = await axios.post('/api/getcredits', { email });
    setCredits(response.data.credits);
  }

  return (

    <>
      <Header />
      <div className="flex flex-col h-max">
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6 md:p-8 lg:p-10">
         
         





        <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Credits</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="text-4xl font-bold">{credits}</div>
              <Button variant="outline" onClick={getcredits} className="bg-gray-800 hover:bg-blue-700 text-white w-full hover:text-white">
                View Credits</Button>
            </CardContent>
          </Card>
          
         
         
          <Card className="bg-black text-white">
            <CardHeader>
              <CardTitle>Stufff</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center w-full gap-2">
              <Button onClick={() => { window.location.href = "/Pay"; }} className="bg-gray-800 hover:bg-blue-700 text-white">Add Credits</Button>
                <svg
                  className="w-10 h-10 text-gray-400"
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
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>

            </CardContent>
            <CardContent className="flex  items-center justify-between">
             <div className='w-full h-[7vh]'> <Link href="/Transactions"><Button variant="outline" className="bg-gray-800 h-full w-full hover:bg-blue-700 text-white hover:text-white">View All Transactions</Button></Link>
          </div>
            </CardContent>

          </Card>

          
          
          
          
         
          
          
          {/* <section className="col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              <Product heading={"Add Subtitles"} descriptions={"Now reach a global audience! SubVerseAI seamlessly works with 50+ languages and adds English subtitles to your videos."} link={"/Product"} />
              <Product heading={"Voicebot"} descriptions={"Now move beyond chatbot! Conversational AI Voicebot helps you across multiple needs: Call centers, Sales pitch, Hiring interviews, etc."} link={"/Product"} />
              <Product heading={"Dubbing"} descriptions={"Create multilingual content with just a click! Choose from 10+ humanlike voices or add your own voice for different languages."} link={"/Product"} />
              <Product heading={"Video Summary"} descriptions={"Long video? With SubVerseAI, you will never miss an insight. Summarize any YouTube video to identify the important ideas and facts."} link={"/Product"} />


            </div>
          </section> */}
          
        </main>

        
        <div className="h-10 w-full p-5 ">
          <Button className="w-full" onClick={()=>{router.push("/Data");}}>Go to Global Data</Button>
          </div>
      </div>
    </>
  )
}
