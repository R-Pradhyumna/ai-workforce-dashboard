import { ThemeProvider } from "next-themes";
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

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    default: "AI Workforce Dashboard",
    template: "%s | AI Workforce Dashboard",
  },
  description:
    "Monitor AI token usage, track operational costs, and analyze workforce productivity with real-time analytics.",
  keywords: [
    "AI dashboard",
    "analytics dashboard",
    "token usage tracking",
    "AI cost monitoring",
    "workforce analytics",
  ],
  authors: [{ name: "Your Name" }],
  metadataBase: new URL("http://localhost:3000"), // change when deployed
  openGraph: {
    title: "AI Workforce Dashboard",
    description:
      "Real-time analytics for AI usage, cost tracking, and workforce insights.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Workforce Dashboard",
    description: "Real-time analytics for AI usage and cost monitoring.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
