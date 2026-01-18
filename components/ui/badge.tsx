import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export const Badge = ({ className, ...props }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground",
      className
    )}
    {...props}
  />
);
