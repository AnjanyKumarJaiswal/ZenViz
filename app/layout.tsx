import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import {Analytics} from "@vercel/analytics/next"
import "./globals.css";


export const metadata: Metadata = {
  title: "ZenViz",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  );
}
