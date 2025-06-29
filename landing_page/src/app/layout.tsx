
import type { Metadata } from "next";
import { Plus_Jakarta_Sans as Jakarta } from "next/font/google";
import "./globals.css";

const jakartaSans = Jakarta({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenSpace",
  description: "GreenSpace is a mobile application designed to help you live more sustainably by connecting you with nature through technology.",
  keywords: [
    "GreenSpace",
    "sustainability",
    "eco-friendly",
    "plant identification",
    "green living",
    "environmental app",
    "nature tracker",
    "React Native app",
    "AI plant scanner",
    "internet computer app",
  ],
  authors: [{ name: "HackToWin", url: "https://greenspace.hacktowin.systems/" }],
  creator: "HackToWin",
  publisher: "HackToWin",
  openGraph: {
    title: "GreenSpace - Connect with Nature Through Technology",
    description:
      "Download GreenSpace and take your first step toward a greener lifestyle. Identify plants, track habits, and receive eco-friendly tips.",
    url: "https://greenspace.hacktowin.systems/",
    siteName: "GreenSpace",
    images: [
      {
        url: "https://greenspace.hacktowin.systems/images/mockup.png",
        width: 1200,
        height: 630,
        alt: "GreenSpace App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "GreenSpace - Live Greener Every Day",
  //   description:
  //     "Join thousands living sustainably with GreenSpace. Discover plants, track eco-habits, and embrace a nature-friendly lifestyle.",
  //   images: ["https://greenspace.hacktowin.systems/images/mockup.png"],
  //   creator: "@HackToWin",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
