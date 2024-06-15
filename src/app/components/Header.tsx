"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";

export default function Header() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(Cookies.get('email') || "");
  }, []);

  const deleteCookies = () => {
    Cookies.remove('name');
    Cookies.remove('username');
    Cookies.remove('email');
    Cookies.remove('phone');
    window.location.href = "/Login";
  };

  return (
    <>
      <header className="bg-white text-gray-900 py-4 px-6 md:px-8 lg:px-10 flex items-center justify-between shadow-sm dark:bg-[#09090B] dark:text-gray-50">
        <div className="flex items-center gap-2">
          <Link href="#" prefetch={false}>
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
              <rect width="14" height="8" x="5" y="2" rx="2" />
              <rect width="20" height="8" x="2" y="14" rx="2" />
              <path d="M6 18h2" />
              <path d="M12 18h6" />
            </svg>
            <span className="sr-only">Nikhilesh Rana</span>
          </Link>
          <div className="text-sm font-medium">{email}</div>
        </div>
        <div className="flex items-center gap-4">
          <Link onClick={deleteCookies} href="Login">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <svg
              className="h-5 w-5"
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span className="sr-only">Logout</span>
          </Button>
          </Link>
        </div>
      </header>
    </>
  );
}
