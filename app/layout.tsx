import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import ClientWrapper from "@/components/ClientWrapper";
import { Toaster } from "@/components/ui/sonner";

/* fonts used if needed  reimport them
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});
const electrolize = Electrolize({
  subsets: ["latin"],
  weight: ["400"], // Electrolize only comes in 400 weight
  variable: "--font-electrolize",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const spacegrotestk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-spacegrotestk",
});

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-chakra",
});
*/
// Selected Font
const exo = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-exo",
});

export const metadata: Metadata = {
  title: "AIsemble - Create and Manage AI Agent Teams",
  description:
    "Build custom AI agent teams that communicate, collaborate, and solve complex problems together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientWrapper>
      <html lang="en">
        <body className={exo.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClientWrapper>
  );
}
