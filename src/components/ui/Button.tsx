"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<Variant, string> = {
  primary:
    "group relative bg-accent text-black hover:bg-accent-soft shadow-[0_10px_40px_-12px_rgba(201,166,107,0.55)] focus-visible:outline-accent",
  secondary:
    "group relative bg-white/[0.04] text-foreground hairline hover:bg-white/[0.07] hover:hairline-strong focus-visible:outline-white/40",
  ghost:
    "group relative text-foreground/80 hover:text-foreground focus-visible:outline-white/30",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
    ...rest
  } = props as BaseProps & Record<string, unknown>;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
    "transition-all duration-300 ease-out will-change-transform",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <ArrowUpRight
          className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 opacity-0 blur-sm transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
        </span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    const anchorRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={props.href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
