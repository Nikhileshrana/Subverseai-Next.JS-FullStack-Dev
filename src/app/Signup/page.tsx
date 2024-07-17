"use client";
import Image from "next/image"
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Loading from "@/app/components/Loading";

export default function SignupForm() {
  const router = useRouter()

  const [isLoading, setisLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("")

  const signup = async () => {
    try {
      setisLoading(true);
      const response = await axios.post('/api/signup', { name, email, username, password , phone });
      console.log(response.data);

      if(response.data.data=="User Successfully Created. Please Login")
        {
          router.push('/Login')
        }
      setisLoading(false);

      toast(`Hi , ${name}`, {
        description: response.data.data,
        action: {
          label: "Okay",
          onClick: () => console.log("Undo"),
        }
      });

      // Clear the form values
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      setPhone("");

    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <>

{isLoading ? (
                <Loading />
            ) : (
                <div></div>
            )}

            
      <Toaster position="top-center" />
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] px-5">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Signup</h1>
              <p className="text-balance text-muted-foreground">
                Enter your details below to Signup
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="95994XXXXX"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button onClick={signup} type="submit" className="w-full">
                Signup
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Have an account?{" "}
              <Link href="/Login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/Demo.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </>
  )
}
