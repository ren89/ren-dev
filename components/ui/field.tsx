"use client";

import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";

/**
 * Labeled form-field wrapper (label + required/optional marker + error
 * text). Moved out of components/sections/contact.tsx, its only consumer,
 * so it lives alongside the other form primitives. "use client" because it
 * renders Label (Radix) - contact.tsx is already a client component, so
 * this introduces no new boundary.
 */
export function Field({
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
  children: ReactNode;
}) {
  return (
    <div>
      <Label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"
      >
        {label}
        {required && <span className="text-brand">*</span>}
        {optional && (
          <span className="font-normal text-muted-foreground">(optional)</span>
        )}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
