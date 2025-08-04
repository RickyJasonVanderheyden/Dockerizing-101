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
  title: "FocusFlow - Master Your Productivity",
  description: "FocusFlow helps you stay organized, focused, and productive with intelligent task management, time tracking, and goal setting features designed for modern professionals.",
  keywords: "productivity, task management, time tracking, focus, workflow, organization",
  authors: [{ name: "FocusFlow Team" }],
  openGraph: {
    title: "FocusFlow - Master Your Productivity",
    description: "Transform your workflow with intelligent productivity tools",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
