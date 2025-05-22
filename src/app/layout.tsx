import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/section-backgrounds.css";
import ThemeProvider from "../components/ThemeProvider";
import BootstrapClient from "../components/BootstrapClient";
import BodyAttributeHandler from "../components/BodyAttributeHandler";

// Load fonts with subsets to optimize loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Better for performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Better for performance
});

export const metadata: Metadata = {
  title: "SlingRFP - Government Contracting Made Easy",
  description: "Transform your business with efficient government contracting solutions",
};

// Disable static rendering for dynamic content
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical assets */}
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <BootstrapClient />
          <BodyAttributeHandler>
            {children}
          </BodyAttributeHandler>
        </ThemeProvider>
      </body>
    </html>
  );
}
