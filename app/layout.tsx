import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Item Price Calculator",
  description: "Dynamic Interest Rate & Price Checker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="my" suppressHydrationWarning>
      <body className="antialiased pb-20 md:pb-0 md:pt-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
