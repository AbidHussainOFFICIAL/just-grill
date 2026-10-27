import type { Metadata, Viewport } from "next";
import { DM_Sans, Forum } from "next/font/google";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { Topbar } from "@/components/layout/Topbar";
import { siteConfig } from "@/data/site";
import "./globals.css";

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-forum",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${forum.variable} ${dmSans.variable}`}>
      {/* id="top" is the target of the back-to-top button */}
      <body id="top">
        <Preloader />
        {/* Topbar must stay a sibling before Header: it slides away via a :has() rule */}
        <Topbar />
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
