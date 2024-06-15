"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import Link from "next/link"
import Header from "@/app/components/Header"

export default function Page() {
    const [email, setEmail] = useState<string>("");
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Function to fetch transactions
    const getTransactions = async (userEmail: string) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/gettransactions', { email: userEmail });
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect to set email from cookies and fetch transactions
    useEffect(() => {
        const storedEmail = Cookies.get('email') || "";
        setEmail(storedEmail);

        if (storedEmail) {
            getTransactions(storedEmail);
        }
    }, []); // Empty dependency array to run only once on component mount

    return (
        <>
        <Header />
        
        <main className="flex-1 bg-gray-100 dark:bg-black p-8 md:p-12 md:py-0">
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
            <div className="container max-w-7xl">
                <h1 className="text-2xl font-bold mb-6">Transactions</h1>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700">
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Amount</th>
                                    <th className="px-4 py-2 text-left">Order ID</th>
                                    <th className="px-4 py-2 text-left">Payment ID</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction) => (
                                        <tr key={transaction._id} className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-2">{new Date(transaction.date).toLocaleString()}</td>
                                            <td className="px-4 py-2">₹{(transaction.amount / 100).toFixed(2)}</td>
                                            <td className="px-4 py-2">{transaction.razorpay_order_id}</td>
                                            <td className="px-4 py-2">{transaction.razorpay_payment_id}</td>
                                            <td className="px-4 py-2">
                                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                                    Paid
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-4 py-2" colSpan={5}>No transactions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
        </>
    );
}
