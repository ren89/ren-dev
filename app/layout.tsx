import { FC, ReactNode } from "react";
import "../styles/globals.css";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-900">
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
