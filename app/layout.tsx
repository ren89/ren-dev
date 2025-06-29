import { FC, ReactNode } from "react";
import "../styles/globals.css";
import { getUser } from "@/hooks/useUser";
import { logout } from "./auth/actions";

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
