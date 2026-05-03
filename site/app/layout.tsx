import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/footer/footer";
import Menu from "@/components/menu/menu";

const IRANSANS = localFont({
  src: "../public/fonts/IRANSansWeb.ttf",
  // variable: "--font-geist-sans",
  // weight: "100 900",
});

export const metadata: Metadata = {
  title: "محصولات SBN",
  description:
    "خرید بهترین محصولات دندانپزشکی SBN، شامل خمیر دندان‌های حرفه‌ای برای دندان‌های سالم و سفیدتر.",
  keywords:
    "محصولات SBN, خمیر دندان SBN, خمیر دندان SBN Dental, اس بی ان, SBN Dental, SBN Toothpaste, خمیردندان اس بی ان دنتال, خمیردندان اس بی ان",
  icons: {
    icon: "/images/LOGO.svg",
  },
  openGraph: {
    title: "محصولات دندانپزشکی SBN",
    description: "بهترین محصولات دندانپزشکی با کیفیت بالا از برند SBN",
    url: "https://sbn-dental.com",
    images: [
      {
        url: "/images/LOGO.svg",
        alt: "محصولات SBN",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={IRANSANS.className}>
        <header>
          <Menu />
        </header>
        {children}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
