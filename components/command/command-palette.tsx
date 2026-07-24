"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Check,
  Copy,
  ExternalLink,
  FileText,
  FolderClosed,
  Hash,
  Moon,
  Sun,
} from "lucide-react";

import { NAV_LINKS, SITE, type NavLink } from "@/lib/site";
import { projects } from "@/data/projects";
import { useTheme } from "@/components/theme/theme-provider";

export type PostLink = { slug: string; title: string };

/** Open the palette from anywhere (e.g. the nav trigger). */
export function openCommandPalette() {
  window.dispatchEvent(new Event("commandpalette:open"));
}

function sectionHref(link: NavLink): string {
  // Always absolute so it works from any route.
  return link.type === "route" ? link.href : `/${link.href}`;
}

export function CommandPalette({ posts }: { posts: PostLink[] }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("commandpalette:open", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("commandpalette:open", onOpen);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable - no-op
    }
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      className="overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl"
    >
      <Command.Input
        placeholder="Search or jump to…"
        className="w-full border-b border-border bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground"
      />
      <Command.List className="max-h-[min(60vh,360px)] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
          No results found.
        </Command.Empty>

        <Command.Group heading="Navigate">
          {NAV_LINKS.map((link) => (
            <Item
              key={link.id}
              onSelect={() => go(sectionHref(link))}
              icon={<Hash className="size-4" />}
            >
              {link.label}
            </Item>
          ))}
        </Command.Group>

        <Command.Group heading="Case studies">
          {projects.map((p) => (
            <Item
              key={p.slug}
              onSelect={() => go(`/work/${p.slug}`)}
              icon={<FolderClosed className="size-4" />}
            >
              {p.name}
            </Item>
          ))}
        </Command.Group>

        {posts.length > 0 && (
          <Command.Group heading="Blog">
            {posts.map((p) => (
              <Item
                key={p.slug}
                onSelect={() => go(`/blog/${p.slug}`)}
                icon={<FileText className="size-4" />}
              >
                {p.title}
              </Item>
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Actions">
          <Item
            onSelect={() => {
              setOpen(false);
              toggleTheme();
            }}
            icon={
              theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )
            }
          >
            Switch to {theme === "dark" ? "light" : "dark"} mode
          </Item>
          <Item
            onSelect={copyEmail}
            icon={
              copied ? (
                <Check className="size-4 text-brand" />
              ) : (
                <Copy className="size-4" />
              )
            }
          >
            {copied ? "Copied!" : `Copy email (${SITE.email})`}
          </Item>
          <Item
            onSelect={() => {
              setOpen(false);
              window.open(SITE.github, "_blank", "noopener,noreferrer");
            }}
            icon={<ExternalLink className="size-4" />}
          >
            Open GitHub
          </Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

function Item({
  children,
  onSelect,
  icon,
}: {
  children: ReactNode;
  onSelect: () => void;
  icon: ReactNode;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
    >
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <span className="flex-1 truncate">{children}</span>
    </Command.Item>
  );
}
