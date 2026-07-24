import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

// Body / UI text - high legibility at small sizes.
export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Display / headings - geometric, bold-modern character.
export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

// Code / eyebrow labels - technical accent.
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
