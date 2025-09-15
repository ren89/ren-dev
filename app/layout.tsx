import { FC, ReactNode } from "react";
import "../styles/globals.css";
import { getUser } from "@/hooks/useUser";
import { logout } from "./auth/actions";
export const metadata = {
  title: "Ren Avellano | Frontend Developer",
  description:
    "Frontend developer in the Philippines building fast, modern UIs with React, Next.js, and TypeScript. Open to freelance and full-time work.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Portfolio",
    "Freelance Frontend Developer",
    "Web Developer Philippines",
  ],
  authors: [{ name: "Ren Avellano", url: "https://yourdomain.com" }],
  creator: "Ren Avellano",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Ren Avellano | Frontend Developer",
    description:
      "See my work in React, Next.js, and TypeScript. Available for freelance and full-time opportunities.",
    url: "https://yourdomain.com",
    siteName: "Ren Avellano Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ren Avellano - Frontend Developer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ren Avellano | Frontend Developer",
    description:
      "Building clean UIs with React, Next.js, and TypeScript. View my portfolio.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const user = await getUser();
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-900">
        <header className=" bg-teal-400/10  text-center">
          {user && (
            <form>
              <button
                className="cursor-pointer"
                type="submit"
                formAction={logout}
              >
                <p className="text-teal-300">
                  logged in as <b>{user.email}</b>
                </p>
                <p className="text-teal-300">click to logout</p>
              </button>
            </form>
          )}
        </header>
        <main className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
