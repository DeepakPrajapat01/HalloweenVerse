interface SkeletonProps {
    className?: string;
    width?: string;
    height?: string;
    rounded?: "sm" | "md" | "lg" | "full";
}

const roundedMap = {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    full: "var(--radius-full)",
};

export default function Skeleton({
    className = "",
    width = "100%",
    height = "1rem",
    rounded = "md",
}: SkeletonProps) {
    return (
        <span
            role="status"
            aria-label="Loading…"
            className={`block skeleton ${className}`}
            style={{
                width,
                height,
                borderRadius: roundedMap[rounded],
                display: "block",
            }}
        />
    );
}

/** Convenience: a skeleton card matching the Card component shape */
export function SkeletonCard({ rows = 3 }: { rows?: number }) {
    return (
        <div
            style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-6)",
            }}
        >
            <Skeleton height="1.5rem" width="60%" className="mb-3" />
            {Array.from({ length: rows }).map((_, i) => (
                <Skeleton key={i} height="0.875rem" className="mb-2" />
            ))}
        </div>
    );
}
