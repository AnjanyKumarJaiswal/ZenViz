import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
// import HydrationGate from "@/components/globalLoader";
import GlobalLoader from "@/components/globalLoader";
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
      <head>
        {/* ✅ Preload Satoshi fonts */}
        <link
          rel="preload"
          href="/fonts/Satoshi-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Satoshi-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* <HydrationGate> */}
        <GlobalLoader/>
        {children}
        <SpeedInsights/>
        {/* </HydrationGate> */}
      </body>
    </html>
  );
}
