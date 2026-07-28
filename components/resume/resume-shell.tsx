"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
      a.download = "Reniel-Avellano-Resume.pdf";
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
    <Tabs
      value={view}
      onValueChange={(v) => change(v as View)}
      className="container-page py-16 sm:py-24"
    >
      <div className="mb-10 flex flex-col items-center justify-center gap-4 print:hidden sm:flex-row">
        <TabsList
          aria-label="Resume view"
          className="h-auto rounded-full border border-border bg-card p-1"
        >
          <TabsTrigger
            value="resume"
            className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            Résumé
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="rounded-full px-4 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            Client profile
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            shape="pill"
            onClick={downloadPdf}
            disabled={downloading}
            className="px-5"
          >
            <Download className="size-4" aria-hidden="true" />
            {downloading ? "Preparing…" : "Download PDF"}
          </Button>
          <Button
            asChild
            variant="outline"
            shape="pill"
            className="text-muted-foreground hover:text-foreground"
          >
            <a
              href="/resume.json"
              download="ren-avellano.resume.json"
              onClick={() => track("resume_download", { format: "json" })}
            >
              JSON Resume
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            shape="pill"
            className="text-muted-foreground hover:text-foreground"
          >
            <a
              href="/contact.vcf"
              download="ren-avellano.vcf"
              onClick={() => track("resume_download", { format: "vcard" })}
            >
              Save contact
            </a>
          </Button>
        </div>
      </div>

      <TabsContent value="resume" className="mt-0">
        <ResumeView />
      </TabsContent>
      <TabsContent value="profile" className="mt-0">
        <ClientProfileView />
      </TabsContent>
    </Tabs>
  );
}
