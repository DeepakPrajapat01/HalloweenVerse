import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    hover?: boolean;
    glow?: "orange" | "purple" | "none";
    padding?: "sm" | "md" | "lg";
}

export default function Card({
    children,
    hover = true,
    glow = "none",
    padding = "md",
    className = "",
    style,
    ...rest
}: CardProps) {
    const paddingVal =
        padding === "sm" ? "var(--space-4)" :
            padding === "lg" ? "var(--space-8)" :
                "var(--space-6)";

    const glowStyle =
        glow === "orange"
            ? "0 0 0 1px var(--color-orange), 0 0 20px rgba(255,117,24,0.2)"
            : glow === "purple"
                ? "0 0 0 1px var(--color-purple), 0 0 20px rgba(155,92,255,0.2)"
                : "none";

    return (
        <div
            {...rest}
            className={`transition-all duration-200 ${hover ? "hover:-translate-y-0.5 cursor-pointer" : ""
                } ${className}`}
            style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: paddingVal,
                boxShadow: glowStyle,
                ...style,
            }}
            onMouseEnter={(e) => {
                if (hover) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(155,92,255,0.4)";
                    el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                }
            }}
            onMouseLeave={(e) => {
                if (hover) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--color-border)";
                    el.style.boxShadow = glowStyle;
                }
            }}
        >
            {children}
        </div>
    );
}
