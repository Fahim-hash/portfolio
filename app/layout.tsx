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
  title: "Syed Fahim Muddasir | Creative Designer",
  description: "Official Portfolio of Syed Fahim Muddasir. Media Department Lead at Ta'atuf Foundation and Founder of RelaxStudio. Specialized in cinematic visual identities.",
  keywords: [
    "Syed Fahim Muddasir", 
    "Creative Designer Dhaka", 
    "RelaxStudio Founder", 
    "ODF Media Lead", 
    "WLFSC Topper", 
    "Cinematic Branding",
    "Visual Identity Expert"
  ],
  authors: [{ name: "Syed Fahim Muddasir" }],
  icons: {
    icon: "/icon.png", 
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Syed Fahim Muddasir | Creative Designer",
    description: "Specializing in cinematic visual identities and automated digital tools.",
    url: "https://syedfahimmuddasir.bro.bd",
    siteName: "Fahim's Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "Syed Fahim Muddasir Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Fahim Muddasir | Creative Designer",
    description: "Founder of RelaxStudio & Media Lead at Ta'atuf Foundation.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🧠 Structured Data (Google-ke Authoritative information deyar jonno)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Syed Fahim Muddasir",
    "url": "https://syedfahimmuddasir.bro.bd",
    "image": "https://syedfahimmuddasir.bro.bd/profile.jpg",
    "jobTitle": "Creative Designer & Media Department Lead",
    "brand": {
      "@type": "Brand",
      "name": "RelaxStudio"
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "Ta'atuf Foundation"
      },
      {
        "@type": "Organization",
        "name": "Omni Diplomatic Forum"
      }
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Willes Little Flower School & College"
    },
    "knowsAbout": ["Graphic Design", "Cinematic Branding", "Motion Graphics", "UI/UX Design"],
    "sameAs": [
      "https://www.facebook.com/syedfahim.muddasir",
      "https://instagram.com/mr_relax_bro",
      "https://www.behance.net/fahimmuddasir",
      "https://wa.me/01855941177"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* JSON-LD for Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#050505] text-white selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
