import { Lora } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/commandPalette";
import NavBar from "@/components/navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Let Him Cook",
  description:
    "A collection of recipes for myself, my family, and my close friends.",
};

const lora = Lora({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={lora.className}>
      <body className="bg-background text-foreground">
        <TooltipProvider delayDuration={100}>
          <CommandMenu />
          <NavBar />
          <main className="flex justify-center max-w-2xl flex-col mx-auto py-8 px-4 md:px-0">
            {children}
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
