import {
  education,
  experience,
  profile,
  skills,
  summary,
} from "@/data/resume";
import { getFeaturedProjects } from "@/data/projects";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/** JSON Resume open standard: https://jsonresume.org */
export function GET() {
  const projects = getFeaturedProjects();
  const ghUser = profile.github.replace(/\/+$/, "").split("/").pop();

  const resume = {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: profile.name,
      label: profile.title,
      email: profile.email,
      phone: profile.phone,
      url: profile.website,
      summary,
      location: {
        city: "Pasig",
        region: "Metro Manila",
        countryCode: "PH",
      },
      profiles: [
        { network: "GitHub", username: ghUser, url: profile.github },
      ],
    },
    work: experience.map((j) => ({
      name: j.company,
      position: j.role,
      startDate: j.start,
      ...(j.end && j.end !== "Present" ? { endDate: j.end } : {}),
      ...(j.url ? { url: j.url } : {}),
      highlights: j.bullets,
    })),
    education: education.map((e) => ({
      institution: e.institution,
      studyType: e.credential,
      ...(e.start ? { startDate: e.start } : {}),
      ...(e.end ? { endDate: e.end } : {}),
    })),
    skills: skills.map((g) => ({ name: g.label, keywords: g.items })),
    projects: projects.map((p) => ({
      name: p.name,
      description: p.tagline,
      highlights: [p.story.result],
      keywords: p.tech,
      ...(p.href ? { url: p.href } : {}),
    })),
    meta: {
      canonical: `${SITE.url}/resume.json`,
      version: "1.0.0",
    },
  };

  return Response.json(resume, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
