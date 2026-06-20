import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.thecinewars.com"),
  icons: {
  icon: "/icon.png",
  apple: "/icon.png",
},

  alternates: {
  canonical: "/",
},

  title: {
    default: "CineWars - Movie Box Office Predictions & Fan Debates",
    template: "%s | CineWars",
  },

  description:
    "Predict movie box office collections, join fan debates, compare opinions, and prove who understands cinema best. By Fans. For Fans.",

  keywords: [
    "movie box office prediction",
    "box office collection prediction",
    "movie debates",
    "bollywood box office",
    "south indian movies",
    "movie fans community",
    "CineWars",
    "movie predictions",
    "film collection prediction",
  ],

  authors: [{ name: "CineWars" }],
  creator: "CineWars",
  publisher: "CineWars",

  openGraph: {
    title: "CineWars - Movie Box Office Predictions & Fan Debates",
    description:
      "Predict movie box office collections, join fan debates, and settle the biggest movie battles.",
    url: "https://www.thecinewars.com",
    siteName: "CineWars",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CineWars",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CineWars - Movie Box Office Predictions & Fan Debates",
    description:
      "Predict collections. Debate with fans. Track accuracy.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "CineWars",
        url: "https://www.thecinewars.com",
        description:
          "CineWars is a movie box office prediction platform where fans predict collections, debate movies, and track prediction accuracy.",
      }),
    }}
  />

  {children}
</body>
    </html>
  );
}