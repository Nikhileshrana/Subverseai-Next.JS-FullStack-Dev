"use client"
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  return (
    <footer className="bg-[#F1F5F9] dark:bg-[black] py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
          <Image className="h-[3rem] w-[7rem]" src="/subverseai.svg" width="500" height="500"  alt="LOGO"/>
          </div>
          <p className="text-[#64748B] dark:text-[#94A3B8] max-w-md">
            Enhance Customer Engagement with state-of-the-art conversational AI solutions
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#FFFFFF]"
              prefetch={false}
            >
              <svg
                className="h-6 w-6"
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
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              
            </Link>
            <Link
              href="#"
              className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#FFFFFF]"
              prefetch={false}
            >

              <svg
                className="h-6 w-6"
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
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
          </div>
          <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">
            © 2024 42Apeironanta Technologies Pvt Ltd (SubVerse AI), Inc. All Rights Reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8 md:mt-0">
          <div className="space-y-2">
            <h3 className="text-[#334155] dark:text-[#94A3B8] font-bold">Navigation</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#FFFFFF]"
                  prefetch={false}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/Request-Demo"
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#FFFFFF]"
                  prefetch={false}
                >
                  Request a Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#FFFFFF]"
                  prefetch={false}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-[#334155] dark:text-[#94A3B8] font-bold">Legal</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/Privacy-Policy"
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#FFFFFF]"
                  prefetch={false}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/Terms-of-Service"
                  className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#334155] dark:hover:text-[#FFFFFF]"
                  prefetch={false}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}


