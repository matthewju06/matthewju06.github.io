import type { Metadata, Viewport } from "next";
import { Archivo_Black, Bodoni_Moda, Figtree, Newsreader } from "next/font/google";
import "./globals.css";

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const mark = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});

const script = Bodoni_Moda({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bodoni",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Matthew Ju",
  description:
    "Computer Science and Statistics student at UIUC. Backend systems, data tools, and software engineering.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mark.variable} ${script.variable}`}>
      <body className="bg-room font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
