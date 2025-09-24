import type { Metadata } from "next";
import { Geist, Geist_Mono, Aoboshi_One } from "next/font/google";
import "./globals.css";
import { Provider } from "./providers";
import { ChatProvider } from "@/contexts/chat-context";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const aoboshiOne = Aoboshi_One({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guidelynn",
  description:
    "An AI powered career counselor that helps you find the right job for you",
  openGraph: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${aoboshiOne.variable} antialiased`}>
        <Provider>
          <ChatProvider>{children}</ChatProvider>
        </Provider>
      </body>
    </html>
  );
}
