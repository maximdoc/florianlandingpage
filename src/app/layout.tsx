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
  // Create an inline script to detect and apply theme before page render
  const themeDetectionScript = `
    (function() {
      try {
        let theme = localStorage.getItem('theme');
        if (!theme) {
          // If theme is not in localStorage, check system preference
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          theme = systemPrefersDark ? 'dark' : 'light';
        }
        // Apply theme immediately to prevent flash
        document.documentElement.setAttribute('data-bs-theme', theme === 'system' 
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme
        );
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeDetectionScript }} />
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
