import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tidy Titans — уборка как семейный квест",
  description:
    "Превратите хаос дома в пиксельный квест. Tidy Titans — семейная игра про уборку, где чистота = победа.",
  metadataBase: new URL("https://tidytitans.ru"),
  openGraph: {
    title: "Tidy Titans",
    description: "Семейный квест-уборка. Чистый дом — уровень пройден.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--fg)]">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
