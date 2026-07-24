import type { Metadata } from "next";

import { ResumeShell } from "@/components/resume/resume-shell";

export const metadata: Metadata = {
  title: "Résumé - Ren Avellano",
  description:
    "Résumé and client profile for Ren Avellano, full-stack web developer: experience, skills, education, and selected projects.",
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "profile",
    url: "/resume",
    title: "Résumé - Ren Avellano",
    description:
      "Résumé and client profile for Ren Avellano, full-stack web developer.",
  },
};

export default function ResumePage() {
  return <ResumeShell />;
}
