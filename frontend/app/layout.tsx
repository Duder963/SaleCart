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
                <div className="sticky top-0 z-20 flex gap-2 px-6 py-4 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700/60 shadow-lg shadow-black/40 place-content-between items-center w-screen">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold">
                        <Link href="/" className="text-green-400 hover:text-green-300 transition-colors duration-200 drop-shadow-[0_0_12px_rgba(74,222,128,0.35)]">
                            SaleCart
                        </Link>
                    </h1>
                    <nav className="flex gap-6">
                        <Link href={"/credits"} className="text-slate-300 hover:text-white font-semibold text-lg transition-colors duration-200 border-b-2 border-transparent hover:border-green-400 pb-0.5">
                            Credits
                        </Link>
                        <Link href={"/contact"} className="text-slate-300 hover:text-white font-semibold text-lg transition-colors duration-200 border-b-2 border-transparent hover:border-green-400 pb-0.5">
                            Contact
                        </Link>
                    </nav>
                </div>
                {children}
            </body>
        </html>
    );
}
