import { cn } from "@/lib/cn";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article";
  glow?: boolean;
};

export function GlassCard({
  className,
  children,
  as: Component = "div",
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/[0.08]",
        "bg-gradient-to-b from-white/[0.055] to-white/[0.02] md:from-white/[0.04] md:to-white/[0.01]",
        "backdrop-blur-none md:backdrop-blur-xl",
        "shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)]",
        className,
      )}
      {...props}
    >
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl max-md:hidden"
        />
      )}
      {children}
    </Component>
  );
}
