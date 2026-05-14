import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 sm:gap-3.5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-display text-[clamp(1.85rem,5vw,4rem)] leading-[1.05] text-balance",
          "sm:text-5xl md:text-6xl",
          align === "center" ? "max-w-3xl" : "max-w-3xl",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted",
            "sm:text-lg",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
