// Keep first: global styles must load before any other stylesheet.
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Forum } from "next/font/google";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { siteConfig } from "@/data/site";

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  variable: "--next-forum",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--next-dm-sans",
  display: "swap",
});

const shareImage = {
  url: "/images/hero-slider-1.jpg",
  width: 1880,
  height: 950,
  alt: siteConfig.title,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
    url: "/",
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [shareImage.url],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#161719",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${forum.variable} ${dmSans.variable}`}>
      {/* id="top" is the target of the back-to-top button */}
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Preloader />
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
