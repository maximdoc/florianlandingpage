import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import ThemeProvider from "../components/ThemeProvider";
import BootstrapClient from "../components/BootstrapClient";
import BodyAttributeHandler from "../components/BodyAttributeHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workflow App - Transform Your Workflow",
  description: "Transform your workflow and double your productivity with our all-in-one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
