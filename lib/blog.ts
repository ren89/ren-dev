import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog content system - MDX files in content/blog/*.mdx.
 * Server-only (uses the filesystem). Add a post by dropping in a new .mdx
 * file with frontmatter; no code changes needed.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO (YYYY-MM-DD)
  tags: string[];
  published: boolean;
  cover?: string;
  readingTime: string;
};

export type Post = PostMeta & { content: string };

const isDev = process.env.NODE_ENV === "development";

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function parseFile(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? String(data.date) : "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: data.published ?? false,
    cover: data.cover,
    readingTime: readingTime(content),
    content,
  };
}

function allSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/** Published posts (drafts also shown in dev), newest first. */
export function getAllPosts(): Post[] {
  return allSlugs()
    .map(parseFile)
    .filter((p) => p.published || isDev)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const post = parseFile(slug);
    if (!post.published && !isDev) return null;
    return post;
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) post.tags.forEach((t) => tags.add(t));
  return [...tags].sort();
}
