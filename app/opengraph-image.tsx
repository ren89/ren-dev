import { ImageResponse } from "next/og";

export const alt = "Ren Avellano - Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
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
          fontSize: 30,
          letterSpacing: "0.15em",
          color: "#a1a1aa",
          textTransform: "uppercase",
        }}
      >
        ren<span style={{ color: "#c084fc", padding: "0 4px" }}>-</span>dev
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#fafafa",
            lineHeight: 1.05,
            maxWidth: "900px",
          }}
        >
          From idea to launched product - built end to end.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            color: "#a1a1aa",
          }}
        >
          Ren Avellano · Full-stack developer
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "14px",
          fontSize: 26,
          color: "#d4d4d8",
        }}
      >
        <span>React</span>
        <span style={{ color: "#52525b" }}>·</span>
        <span>Next.js</span>
        <span style={{ color: "#52525b" }}>·</span>
        <span>TypeScript</span>
        <span style={{ color: "#52525b" }}>·</span>
        <span>Supabase</span>
      </div>
    </div>,
    { ...size },
  );
}
