import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notehub",
  description: "You can read, write, and save your notes by category",
  openGraph: {
      title: 'Notehub',
      description: "You can read, write, and save your notes by category",
      url: "https://notehub.com/",
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "Notehub",
        },
      ],
      type: 'website',
    },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
         <TanStackProvider>
         <Header />
          {children}
          {modal}
          <Footer />
          </TanStackProvider>
      </body>
    </html>
  );
};