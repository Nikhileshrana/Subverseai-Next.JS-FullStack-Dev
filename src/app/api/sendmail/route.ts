import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

async function sendEmail(body: { email: any; message: any; phone: any; name: any; company: any;}) {
    const transporter = nodemailer.createTransport({
        host: 'mail.subverseai.com', // SMTP server
  port: 465, // SMTP port
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.EMAIL_USER, // Email username
    pass: process.env.EMAIL_PASS, // Email password
  },
    });

    

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `SubverseAI - REQUEST DEMO - ${body.email} Sent you a message`,
        text: `${body.name} sent you from ${body.phone} a message quotted -> ${body.message} `,
    };

    const contactmailoptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `SubverseAI - CONTACT - ${body.email} Sent you a message`,
        text: `Hi , ${body.name} sent you a message quotted ----> ${body.message} `,
    };

    const mailtouser = {
        from: process.env.EMAIL_USER,
        to: body.email,
        subject: `SUBVERSEAI`,
        text: `Hi , ${body.name} . Thanks for contacting SubverseAI - We will get back to you soon!`,
    };



    // Send email and return the result
    if (body.company=="" || body.company=="undefined" || body.company==null) {
        try {
            const info = await transporter.sendMail(contactmailoptions);
            await transporter.sendMail(mailtouser);
            console.log('Email sent: ' + info.response);
            return info;
        } catch (error) {
            console.error('Error sending email: ', error);
            throw error;
        }
    }
    else
    {
        try {
            
            const info = await transporter.sendMail(mailOptions);
            await transporter.sendMail(mailtouser);
            console.log('Email sent: ' + info.response);
            return info;
        } catch (error) {
            console.error('Error sending email: ', error);
            throw error;
        }
    }
    
}

// API route handler
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const email = body.email;
        const message = body.message;
        const phone = body.phone;
        const name = body.name;
        const company = body.company;

        // Call the sendEmail function and get the result
        const info = await sendEmail(body);
        
        // Return a success response
        return NextResponse.json({ success: true, message: 'Email sent successfully!', info });
    } catch (error) {
        // Return an error response
        return NextResponse.json({ success: false, message: 'Failed to send email', error });
    }
}
