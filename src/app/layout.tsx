import { Geist, Geist_Mono } from "next/font/google";
import BackgroundIntroPanel from "@/components/background-intro-panel";
import "./globals.css";
import { Metadata } from "next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BIZN",
    description: "AI 기반 기업 뉴스 요약 서비스",
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    icons: {
        icon: "/logo.svg",
        shortcut: "/logo.svg",
        apple: "/logo.svg",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">

            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
            >
                <BackgroundIntroPanel />
                <div className="mobile-container relative">
                    <div className="mobile-padding">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
