import type { ReactElement } from "react";

/** Shared size + card layout for generated OG/Twitter images (next/og). */
export const OG_SIZE = { width: 1200, height: 630 };

export function OgCard({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#0a0a0b",
        backgroundImage:
          "radial-gradient(600px circle at 15% 0%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(600px circle at 100% 100%, rgba(236,72,153,0.30), transparent 55%)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: "0.12em",
          color: "#c084fc",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 60 : 76,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.05,
            maxWidth: "1000px",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 30,
              color: "#a1a1aa",
              maxWidth: "950px",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", fontSize: 26, color: "#d4d4d8" }}>
        ren<span style={{ color: "#c084fc", padding: "0 3px" }}>-</span>dev
        <span style={{ color: "#52525b", padding: "0 10px" }}>·</span>
        Ren Avellano
      </div>
    </div>
  );
}
