import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
       <div
          id="loading"
          style={{display:'none'}}
          className="absolute flex justify-center items-center z-20 top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50"
        >
          <span className="bg-white text-black px-4 py-2 rounded-lg font-semibold text-center">
            Loading...
          </span>
        </div>

        {children}
      </body>
    </html>
  );
}
