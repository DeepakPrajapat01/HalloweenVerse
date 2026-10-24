type BadgeVariant = "orange" | "purple" | "gold" | "success" | "error" | "muted";

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantMap: Record<BadgeVariant, { bg: string; color: string }> = {
    orange: { bg: "rgba(255,117,24,0.15)", color: "var(--color-orange)" },
    purple: { bg: "rgba(155,92,255,0.15)", color: "var(--color-purple)" },
    gold: { bg: "rgba(255,209,102,0.15)", color: "var(--color-gold)" },
    success: { bg: "rgba(74,222,128,0.15)", color: "var(--color-success)" },
    error: { bg: "rgba(248,113,113,0.15)", color: "var(--color-error)" },
    muted: { bg: "rgba(176,174,200,0.12)", color: "var(--color-text-muted)" },
};

export default function Badge({ children, variant = "purple", className = "" }: BadgeProps) {
    const { bg, color } = variantMap[variant];
    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${className}`}
            style={{
                backgroundColor: bg,
                color,
                borderRadius: "var(--radius-full)",
                padding: "2px 10px",
                fontFamily: "var(--font-inter)",
            }}
        >
            {children}
        </span>
    );
}
