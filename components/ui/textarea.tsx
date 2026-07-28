import * as React from "react";

import { cn } from "@/lib/utils";
import { fieldVariants } from "@/components/ui/input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(fieldVariants(), "resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
