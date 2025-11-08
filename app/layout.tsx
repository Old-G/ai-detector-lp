import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Content Detector - Detect AI-Generated Text with 98% Accuracy",
  description:
    "Advanced AI detection technology that identifies ChatGPT, GPT-4, Claude, and other AI-generated text. Trusted by educators, content creators, and businesses worldwide.",
  keywords: [
    "AI detector",
    "AI content detection",
    "ChatGPT detector",
    "GPT-4 detector",
    "Claude detector",
    "AI text detection",
  ],
  authors: [{ name: "AI Content Detector" }],
  openGraph: {
    title: "AI Content Detector - Detect AI-Generated Text",
    description:
      "Advanced AI detection technology with 98% accuracy. Identify ChatGPT, GPT-4, and Claude generated content instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
