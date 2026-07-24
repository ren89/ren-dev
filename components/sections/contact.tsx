"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Full-stack web app",
  "SaaS / MVP",
  "Admin system / internal tool",
  "Landing page / marketing site",
  "Website redesign",
  "Something else",
];

// PHP ranges — edit freely in this array.
const BUDGETS = [
  "< ₱50k",
  "₱50k – ₱150k",
  "₱150k – ₱500k",
  "₱500k+",
  "Not sure yet",
];

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

type Status = "idle" | "submitting" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[invalid=true]:border-destructive";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [errorMsg, setErrorMsg] = useState("");

  function validate(form: HTMLFormElement): Errors {
    const next: Errors = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();

    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!message) next.message = "Please enter a message.";
    else if (message.length < 10)
      next.message = "A little more detail helps — at least 10 characters.";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Focus the first invalid field.
      const firstKey = Object.keys(found)[0];
      (form.elements.namedItem(firstKey) as HTMLElement | null)?.focus();
      return;
    }

    if (!FORMSPREE_ID) {
      setStatus("error");
      setErrorMsg(
        `The form isn't connected yet. Please email me directly at ${SITE.email}.`,
      );
      return;
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrorMsg(
          data?.errors?.[0]?.message ??
            "Something went wrong sending your message. Please try again or email me.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg(
        "Couldn't reach the server. Please check your connection or email me directly.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="container-page scroll-mt-20 border-t border-border/60 py-24 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: pitch + direct alternative */}
        <div className="max-w-md">
          <p className="font-mono text-xs uppercase tracking-widest text-brand">
            07 · Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell me a little about your project and I&apos;ll get back to you.
            Not sure exactly what you need yet? Reach out anyway — happy to help
            you figure it out.
          </p>

          <div className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Prefer email?
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>

        {/* Right: form or success */}
        <div>
          {status === "success" ? (
            <SuccessPanel onReset={() => setStatus("idle")} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot — hidden from users, catches bots */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>
              <input
                type="hidden"
                name="_subject"
                value="New message from ren-dev portfolio"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  required
                  error={errors.name}
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass}
                  />
                </Field>

                <Field id="email" label="Email" required error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass}
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="projectType" label="Project type" optional>
                  <select
                    id="projectType"
                    name="projectType"
                    defaultValue=""
                    className={cn(fieldClass, "appearance-none")}
                  >
                    <option value="" disabled>
                      Select one…
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id="budget" label="Budget" optional>
                  <select
                    id="budget"
                    name="budget"
                    defaultValue=""
                    className={cn(fieldClass, "appearance-none")}
                  >
                    <option value="" disabled>
                      Select a range…
                    </option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field id="message" label="Message" required error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What are you building, and how can I help?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={cn(fieldClass, "resize-y")}
                />
              </Field>

              {status === "error" && (
                <p
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "submitting" ? (
                  "Sending…"
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
      >
        {label}
        {required && <span className="text-brand">*</span>}
        {optional && (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full flex-col items-start justify-center rounded-2xl border border-brand/30 bg-accent/40 p-8"
    >
      <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden="true" />
      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
        Thanks — message sent!
      </h3>
      <p className="mt-2 text-muted-foreground">
        I&apos;ll get back to you as soon as I can, usually within a day or two.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 text-sm font-medium text-brand transition-colors hover:text-foreground"
      >
        Send another message
      </button>
    </div>
  );
}
