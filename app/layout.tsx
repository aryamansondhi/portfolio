import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Load standard font and code font
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Aryaman Sondhi | The Closer",
  description: "Backend & Systems Engineer. Building Donna, SignalLab, and Enterprise Architecture.",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in /public, or delete this line
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} bg-[#0f172a] text-slate-300 antialiased`}>
        {children}
      </body>
    </html>
  );
}