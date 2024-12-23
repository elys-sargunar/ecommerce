import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {cn} from "@/lib/utils" 

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecommerce MVP",
  description: "NextJS / Tailwind / Prisma MVP application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("bg-background min-h-screen font-sans antialiased", 
        geistSans.variable)}>{children}</body>
    </html>
  );
}
