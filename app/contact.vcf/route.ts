import { profile, summary } from "@/data/resume";

export const dynamic = "force-static";

/** Escape commas, semicolons and backslashes per vCard text rules. */
const esc = (v: string) => v.replace(/([\\,;])/g, "\\$1").replace(/\n/g, "\\n");

export function GET() {
  const [given, ...rest] = profile.name.split(" ");
  const family = rest.join(" ");
  const tel = profile.phone?.replace(/\s+/g, "") ?? "";

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${family};${given};;;`,
    `FN:${profile.name}`,
    `TITLE:${esc(profile.title)}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    tel ? `TEL;TYPE=CELL:${tel}` : "",
    `URL:${profile.website}`,
    `URL:${profile.github}`,
    "ADR;TYPE=HOME:;;Pasig;Metro Manila;;;Philippines",
    `NOTE:${esc(summary)}`,
    "END:VCARD",
  ].filter(Boolean);

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ren-avellano.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
