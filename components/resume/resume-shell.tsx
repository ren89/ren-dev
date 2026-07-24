"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { ResumeView } from "./resume-view";
import { ClientProfileView } from "./client-profile-view";

type View = "resume" | "profile";

export function ResumeShell() {
  const [view, setView] = useState<View>("resume");

  // Allow ?view=profile to deep-link a specific view.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("view");
    if (p === "profile" || p === "resume") setView(p);
  }, []);

  const change = (v: View) => {
    setView(v);
    const url = new URL(window.location.href);
    if (v === "resume") url.searchParams.delete("view");
    else url.searchParams.set("view", v);
    window.history.replaceState(null, "", url);
  };

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mb-10 flex justify-center print:hidden">
        <div
          role="tablist"
          aria-label="Resume view"
          className="inline-flex rounded-full border border-border bg-card p-1"
        >
          <TabButton active={view === "resume"} onClick={() => change("resume")}>
            Résumé
          </TabButton>
          <TabButton
            active={view === "profile"}
            onClick={() => change("profile")}
          >
            Client profile
          </TabButton>
        </div>
      </div>

      {view === "resume" ? <ResumeView /> : <ClientProfileView />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
