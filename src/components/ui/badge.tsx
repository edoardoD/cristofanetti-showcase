import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "accent" | "eco";
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "border-transparent bg-brand-navy text-white hover:bg-brand-navy/80",
    secondary: "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200",
    destructive: "border-transparent bg-red-100 text-red-700",
    outline: "text-foreground border-slate-300",
    accent: "border-transparent bg-red-600 text-white font-semibold tracking-wide",
    eco: "border-transparent bg-emerald-100 text-emerald-800 font-medium"
  }[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
