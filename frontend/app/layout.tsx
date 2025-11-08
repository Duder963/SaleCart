'use client'

import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="sticky top-0 flex gap-2 py-4 px-40 pd-8 bg-slate-800 place-content-between w-screen mx-auto">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center text-green-500 font-bold">
                        {/* next/link doesn't reload page on click */}
                        <Link href="/">SaleCart</Link>
                    </h1>
                    <div className="flex gap-4 [&_p]:font-bold [&_p]:text-xl">
                        <Link href={"/credits"}><p>Credits</p></Link>
                        <Link href={"/contact"}><p>Contact</p></Link>
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
}
