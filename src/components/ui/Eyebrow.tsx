import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  withDot?: boolean;
};

export function Eyebrow({ children, className, withDot = true }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
        "bg-white/[0.03] hairline",
        "font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70",
        className,
      )}
    >
      {withDot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}
