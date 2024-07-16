"use client"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import Cookies from 'js-cookie'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Loading from "@/app/components/Loading";

export default function Login() {

  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginresponse , setLoginresponse] = useState("");
  const [isLoading, setisLoading] = useState(false);
  

  if(Cookies.get('email')=="" || Cookies.get('email')==undefined || Cookies.get('email')==null)
    {
      console.log("User needs to Login");
    }
    else
    {
      router.push('/Dashboard', { scroll: false });
    }

  const submit =async()=>
  {
    try 
    {

      setisLoading(true);
      const response = await axios.post('/api/login', { email, password });
      setLoginresponse(response.data);
      setisLoading(false);
      
      if(response.data.userdata){
      // console.log(response.data.userdata);
      Cookies.set('username', response.data.userdata.username, { expires: 1, path: '/' });
      Cookies.set('name', response.data.userdata.name, { expires: 1, path: '/' });
      Cookies.set('email', response.data.userdata.email, { expires: 1, path: '/' });
      Cookies.set('phone', response.data.userdata.phone, { expires: 1, path: '/' });


        if (response.data.userdata.email == "info@subverseai.com") {
          router.push('/Admin', { scroll: false });
        }
        else{ router.push('/Dashboard', { scroll: false }); }
      
      //Save cookies here Bitch
      }
      else
      {
        console.log("Wrong Credentials !");
        toast("Wrong Credentials !", {
          description: "You have entered wrong login Credentials",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          }
        });
      }
      
    } 
    catch (error) 
    {
      console.error("Error during login:", error);
    }
  }



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
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <Button onClick={submit} type="submit" className="w-full">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/Signup" className="underline">
              Signup
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
