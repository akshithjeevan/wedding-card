import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedding of Vishnuraj T. & Josly Merin | Official Digital Invitation",
  description:
    "With great pleasure, we cordially invite you to the wedding of Vishnuraj T. and Josly Merin on Saturday, 21 November 2026 at Chiramel Auditorium, Vaikom.",
  keywords: [
    "Vishnuraj T",
    "Josly Merin",
    "Wedding Invitation",
    "Chiramel Auditorium Vaikom",
    "Kerala Wedding",
  ],
  openGraph: {
    title: "Wedding of Vishnuraj T. & Josly Merin",
    description:
      "Join us in celebrating the wedding of Vishnuraj T. & Josly Merin on 21 November 2026 at Chiramel Auditorium, Vaikom.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Inter:wght@300;400;500;600&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FFF9ED] text-[#2F261F] antialiased paper-texture selection:bg-[#E5C67C] selection:text-[#123D25]">
        {children}
      </body>
    </html>
  );
}
