import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jash Doshi | Creative Developer",
  description: "Building smooth, immersive web experiences with motion, performance, and attention to detail.",
  keywords: ["creative developer", "web developer", "portfolio", "motion design", "frontend"],
  authors: [{ name: "Jash Doshi" }],
  openGraph: {
    title: "Jash Doshi | Creative Developer",
    description: "Building smooth, immersive web experiences",
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
