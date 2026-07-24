import { FC, ReactNode } from "react";

import { fontDisplay, fontMono, fontSans } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "../styles/globals.css";

export const metadata = {
  title: "Ren Avellano | Full-Stack Developer",
  description:
    "Full-stack developer in the Philippines building fast, modern web apps with React, Next.js, and TypeScript. Open to freelance and full-time work.",
  keywords: [
    "Full-Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Portfolio",
    "Web Developer Philippines",
  ],
  creator: "Ren Avellano",
  robots: { index: true, follow: true, nocache: false },
};

// Runs before paint to set the theme class, preventing a light/dark flash.
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
