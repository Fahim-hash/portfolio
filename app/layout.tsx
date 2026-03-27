import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🚀 SEO & Metadata Setup
export const metadata: Metadata = {
  title: "Syed Fahim Muddasir | Creative Designer & Web Developer",
  description: "Official portfolio of Syed Fahim Muddasir. Media Department Lead at Ta'tuf Foundation (ODF) and Founder of RelaxStudio. Specialized in cinematic visual identities and automated digital tools.",
  keywords: ["Syed Fahim Muddasir", "Creative Designer Dhaka", "Next.js Developer Bangladesh", "RelaxStudio Founder", "ODF Media Lead", "WLFSC Topper"],
  authors: [{ name: "Syed Fahim Muddasir" }],
  icons: {
    icon: "/icon.png", // Tomar personal icon file-er nam exact eita rakho
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Syed Fahim Muddasir",
    description: "Creative Lead & Full-stack Developer",
    url: "https://syedfahimmuddasir.bro.bd",
    siteName: "Syed Fahim Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🧠 Structured Data (Google-ke bujhanor jonno je tumi ODF-e kaaj koro)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Syed Fahim Muddasir",
    "alternateName": "Syed Fahim",
    "url": "https://syedfahimmuddasir.bro.bd",
    "jobTitle": "Media Department Lead",
    "worksFor": {
      "@type": "Organization",
      "name": "Ta'tuf Foundation (ODF)"
    },
    "knowsAbout": ["Graphic Design", "Web Development", "Cinematic Branding", "Python Automation"],
    "sameAs": [
      "https://www.facebook.com/your-profile", // Tomar FB link dao
      "https://github.com/your-username"      // Tomar GitHub link dao
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Crawler-er jonno script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-purple-500/30">
        {children}
      </body>
    </html>
  );
}
