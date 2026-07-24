import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import {
  education,
  experience,
  profile,
  skills,
  summary,
  updatedAt,
} from "@/data/resume";
import { getFeaturedProjects } from "@/data/projects";

const C = {
  text: "#18181b",
  muted: "#52525b",
  brand: "#6d28d9",
  border: "#e4e4e7",
  faint: "#a1a1aa",
};

const stripProto = (u: string) => u.replace(/^https?:\/\//, "");

const s = StyleSheet.create({
  page: {
    paddingHorizontal: 44,
    paddingTop: 40,
    paddingBottom: 54,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.5,
    color: C.text,
  },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22 },
  title: { fontSize: 11, color: C.muted, marginTop: 2 },
  contact: { fontSize: 8.5, color: C.muted, marginTop: 7 },
  link: { color: C.brand, textDecoration: "none" },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: C.brand,
    letterSpacing: 1.2,
    marginTop: 16,
    marginBottom: 7,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: C.border,
    textTransform: "uppercase",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  itemTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  itemMeta: { fontSize: 8.5, color: C.faint },
  muted: { color: C.muted },
  bulletRow: { flexDirection: "row", marginTop: 3, paddingRight: 8 },
  bulletDot: { color: C.brand, marginRight: 6 },
  bulletText: { flex: 1 },
  block: { marginBottom: 9 },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillLabel: { fontFamily: "Helvetica-Bold", width: 96 },
  skillItems: { flex: 1, color: C.muted },
  tech: { fontSize: 8, color: C.faint, marginTop: 2 },
  footer: {
    position: "absolute",
    bottom: 26,
    left: 44,
    right: 44,
    fontSize: 7.5,
    color: C.faint,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 8,
  },
});

export function ResumeDocument() {
  const projects = getFeaturedProjects();

  return (
    <Document
      title={`${profile.name} - Résumé`}
      author={profile.name}
      creator={stripProto(profile.website)}
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <Text style={s.name}>{profile.name}</Text>
        <Text style={s.title}>{profile.title}</Text>
        <Text style={s.contact}>
          {profile.location} · <Link src={`mailto:${profile.email}`} style={s.link}>{profile.email}</Link>
          {profile.phone ? ` · ${profile.phone}` : ""} ·{" "}
          <Link src={profile.website} style={s.link}>{stripProto(profile.website)}</Link> ·{" "}
          <Link src={profile.github} style={s.link}>{stripProto(profile.github)}</Link>
        </Text>

        {/* Summary */}
        <Text style={s.sectionTitle}>Summary</Text>
        <Text>{summary}</Text>

        {/* Experience */}
        <Text style={s.sectionTitle}>Experience</Text>
        {experience.map((job) => (
          <View key={`${job.company}-${job.start}`} style={s.block}>
            <View style={s.rowBetween}>
              <Text style={s.itemTitle}>
                {job.role} <Text style={s.muted}>· {job.company}</Text>
              </Text>
              <Text style={s.itemMeta}>
                {job.start} - {job.end}
              </Text>
            </View>
            {job.bullets.map((b, i) => (
              <View key={i} style={s.bulletRow}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Skills */}
        <Text style={s.sectionTitle}>Skills</Text>
        {skills.map((g) => (
          <View key={g.label} style={s.skillRow}>
            <Text style={s.skillLabel}>{g.label}</Text>
            <Text style={s.skillItems}>{g.items.join(", ")}</Text>
          </View>
        ))}

        {/* Education */}
        <Text style={s.sectionTitle}>Education</Text>
        {education.map((e) => (
          <View key={e.institution} style={[s.rowBetween, s.block]}>
            <View>
              <Text style={s.itemTitle}>{e.credential}</Text>
              <Text style={s.muted}>{e.institution}</Text>
            </View>
            {(e.start || e.end) && (
              <Text style={s.itemMeta}>
                {e.start} - {e.end}
              </Text>
            )}
          </View>
        ))}

        {/* Selected Projects */}
        <Text style={s.sectionTitle}>Selected Projects</Text>
        {projects.map((p) => (
          <View key={p.slug} style={s.block}>
            <View style={s.rowBetween}>
              <Text style={s.itemTitle}>
                {p.name} <Text style={s.muted}>· {p.context}</Text>
              </Text>
              <Text style={s.itemMeta}>{p.year}</Text>
            </View>
            <Text>{p.story.result}</Text>
            <Text style={s.tech}>{p.tech.join(" · ")}</Text>
          </View>
        ))}

        {/* Footer on every page */}
        <Text style={s.footer} fixed>
          Generated from {stripProto(profile.website)} · Updated {updatedAt}
        </Text>
      </Page>
    </Document>
  );
}
