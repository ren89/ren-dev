import { FC, ReactNode } from "react";
import "../styles/globals.css";

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/newpage">New Page</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
