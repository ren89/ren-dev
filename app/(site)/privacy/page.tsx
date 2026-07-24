import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/lib/site";

const UPDATED = "July 2026";

export const metadata: Metadata = {
  title: "Privacy Policy - Ren Avellano",
  description:
    "How this site collects and uses data: the contact form and privacy-friendly analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {UPDATED}
        </p>

        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-brand">
          <p>
            This site ({SITE.url.replace(/^https?:\/\//, "")}) is the personal
            portfolio of {SITE.fullName}. This page explains what limited data
            the site collects and how it is used. I try to collect as little as
            possible.
          </p>

          <h2>What I collect</h2>
          <h3>Contact form</h3>
          <p>
            When you use the contact form, you provide your <strong>name</strong>,{" "}
            <strong>email</strong>, a <strong>message</strong>, and optionally a{" "}
            <strong>project type</strong> and <strong>budget range</strong>.
            This is used only to read and respond to your inquiry. Submissions
            are handled by <strong>Formspree</strong>, which delivers them to my
            email inbox.
          </p>
          <h3>Analytics</h3>
          <p>
            I use <strong>Vercel Analytics</strong>, which is privacy-friendly
            and <strong>cookieless</strong>. It records aggregate, anonymous
            data such as page views, referrers, and general device/browser type
            - it does not use tracking cookies, does not build a profile of you,
            and does not track you across other sites. A few anonymous events
            (for example, which button led to a contact submission) are recorded
            without any personal information.
          </p>
          <h3>Theme preference</h3>
          <p>
            Your light/dark choice is stored in your browser&apos;s{" "}
            <code>localStorage</code> so the site remembers it. It stays on your
            device and is not sent anywhere.
          </p>

          <h2>How your data is used</h2>
          <ul>
            <li>To respond to messages you send me.</li>
            <li>To understand, in aggregate, how the site is used.</li>
          </ul>
          <p>I do not sell or rent your personal information to anyone.</p>

          <h2>Third-party services</h2>
          <ul>
            <li>
              <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
                Formspree
              </a>{" "}
              - contact-form delivery.
            </li>
            <li>
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
                Vercel
              </a>{" "}
              - hosting and analytics.
            </li>
          </ul>

          <h2>Data retention</h2>
          <p>
            I keep contact messages for as long as needed to respond and for my
            own records. You can ask me to delete your message at any time.
          </p>

          <h2>Your choices</h2>
          <p>
            You can request access to, correction of, or deletion of any
            personal information you have sent me by emailing{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Because the
            analytics are anonymous and cookieless, there is no personal profile
            to access or remove.
          </p>

          <h2>Changes</h2>
          <p>
            I may update this policy as the site changes. The date at the top
            reflects the latest revision.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about privacy? Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <hr />
          <p className="text-sm text-muted-foreground">
            This policy is provided in good faith to explain the site&apos;s
            data practices. It is a general notice, not legal advice.
          </p>
        </div>

        <Link
          href="/#contact"
          className="mt-10 inline-flex text-sm font-medium text-brand hover:underline"
        >
          Back to the site
        </Link>
      </div>
    </div>
  );
}
