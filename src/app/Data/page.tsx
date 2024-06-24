"use client"
import { Button } from "@/components/ui/button"
import customerlist from "@/data/customerlist.json";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"





export default function data() {
return (
        <>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Call ID</TableHead>
                        <TableHead >Category</TableHead>
                        <TableHead className="text-center">Agent Name</TableHead>
                        <TableHead className="text-center">Customer ID</TableHead>
                        <TableHead className="text-center">Customer Sentiment</TableHead>
                        <TableHead className="text-center">Call Completion Status</TableHead>
                        <TableHead className="text-center">Issue Resolved Status</TableHead>
                    </TableRow>
                </TableHeader>



                <TableBody>
                    {customerlist.map((customer) => (
                        <TableRow key={customer.CallID}>
                            <TableCell className="font-medium">{customer.CallID}</TableCell>
                            <TableCell>{customer.Category}</TableCell>
                            <TableCell>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="w-full text-center" variant="outline">{customer.AgentName}</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="font-medium leading-none">Agent Info</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    <p>Agent Empathy - {customer.AgentEmpathy}</p>
                                                    <p>Agent Performance -{customer.AgentPerformance}</p>
                                                </p>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                            <TableCell className="text-center">{customer.CustomerID}</TableCell>
                            <TableCell className="text-center">{customer.CustomerSentiment}</TableCell>
                            <TableCell className="text-center">{customer.CallCompletionStatus}</TableCell>
                            <TableCell className="text-center">{customer.IssueResolvedStatus}</TableCell>



                            <TableCell>

                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Button variant="outline">View More</Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <div className="mx-auto w-full h-screen max-w-sm">
                                            <DrawerHeader>
                                                <DrawerTitle>Move Goal</DrawerTitle>
                                                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                                            </DrawerHeader>
                                            <div>
                                                <p>Customer ID - {customer.CustomerID}</p>
                                            </div>
                                            <DrawerFooter>
                                                <Button>Submit</Button>
                                                <DrawerClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </div>
                                    </DrawerContent>
                                </Drawer>


                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </>

    )
}