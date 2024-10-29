import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "FinMan",
  description: "Finance Manager made using Next.js",
  icons: [
    { rel: "icon", url: "/favicon.svg" },
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", url: "/favicon-48.ico" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <ClerkProvider>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </ClerkProvider>
    </html>
  );
}
