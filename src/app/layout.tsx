import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "Track and manage your expenses effortlessly with our Next.js powered website. Stay organized, set budgets, and gain insights into your spending habits.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} selection:bg-primary selection:text-primary-foreground`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false} color="hsl(225 60% 30%)" />
            {children}
            <Toaster visibleToasts={3} />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
