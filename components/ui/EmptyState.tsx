import { ReactNode } from "react";
import { Ghost } from "lucide-react";

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export default function EmptyState({
    icon,
    title,
    description,
    action,
    className = "",
}: EmptyStateProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
            role="status"
            aria-live="polite"
        >
            <div
                className="mb-4 p-4 rounded-full"
                style={{ backgroundColor: "rgba(155,92,255,0.1)" }}
                aria-hidden="true"
            >
                {icon ?? <Ghost size={32} style={{ color: "var(--color-purple)" }} />}
            </div>
            <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)" }}
            >
                {title}
            </h3>
            {description && (
                <p
                    className="text-sm mb-6 max-w-xs leading-relaxed"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    {description}
                </p>
            )}
            {action}
        </div>
    );
}
