"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { UrlObject } from 'url'

export default function page(props: { heading: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; descriptions: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; link: string | UrlObject }) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{props.heading}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{props.descriptions}</p>
                    <Link href={props.link}><Button variant="outline" className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800">
                        View Product
                    </Button>
                    </Link>
                </CardContent>
            </Card>
        </>
    )
}