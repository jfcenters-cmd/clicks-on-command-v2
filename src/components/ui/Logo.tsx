import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="/#top"
      className={cn(
        "group flex items-center gap-2.5 text-foreground",
        className,
      )}
      aria-label="Clicks On Command — Home"
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
        <span className="absolute inset-0 rounded-md bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10" />
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-3.5 w-3.5 text-accent"
        >
          <path
            d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 7 L16 9.5 L16 14.5 L12 17 L8 14.5 L8 9.5 Z"
            fill="currentColor"
            opacity="0.85"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[13px] font-semibold tracking-tight">
          Clicks On Command
        </span>
      </span>
    </a>
  );
}
