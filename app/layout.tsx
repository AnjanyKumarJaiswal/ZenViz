import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import GlobalLoader from "@/components/globalLoader";
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
        <GlobalLoader/>
        {children}
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  );
}
