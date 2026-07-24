"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { ResumeView } from "./resume-view";
import { ClientProfileView } from "./client-profile-view";

type View = "resume" | "profile";

export function ResumeShell() {
  const [view, setView] = useState<View>("resume");
  const [downloading, setDownloading] = useState(false);

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

  const downloadPdf = async () => {
    setDownloading(true);
    try {
      // Loaded on demand so react-pdf stays out of the initial bundle.
      const [{ pdf }, { ResumeDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./resume-pdf"),
      ]);
      const blob = await pdf(<ResumeDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Ren-Avellano-Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      track("resume_download", { format: "pdf" });
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mb-10 flex flex-col items-center justify-center gap-4 print:hidden sm:flex-row">
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

        <button
          type="button"
          onClick={downloadPdf}
          disabled={downloading}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-input px-5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
        >
          <Download className="size-4" aria-hidden="true" />
          {downloading ? "Preparing…" : "Download PDF"}
        </button>
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
