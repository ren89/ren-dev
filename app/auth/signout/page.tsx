import { useEffect } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LogoutRoute() {
  const supabase = await createClient();

  useEffect(() => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error.message);
      } else {
        console.log("Logged out successfully");

        redirect("/login");
      }
    };

    logout();
  }, [redirect]);

  return null; // No UI needed for this route
}
