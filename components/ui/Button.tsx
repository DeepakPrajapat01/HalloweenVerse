import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
    isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    danger: "btn-danger",
};

export default function Button({
    variant = "primary",
    size = "md",
    children,
    isLoading = false,
    disabled,
    className = "",
    style,
    ...rest
}: ButtonProps) {
    const sizeClass =
        size === "sm" ? "px-3 py-1.5 text-sm" :
            size === "lg" ? "px-6 py-3.5 text-base" :
                "px-4 py-2.5 text-sm";

    const variantStyle: React.CSSProperties =
        variant === "primary"
            ? { backgroundColor: "var(--color-orange)", color: "#000" }
            : variant === "secondary"
                ? { border: "1px solid var(--color-border)", color: "var(--color-text)" }
                : variant === "ghost"
                    ? { color: "var(--color-orange)", border: "1px solid transparent" }
                    : { backgroundColor: "rgba(248,113,113,0.12)", color: "var(--color-error)", border: "1px solid rgba(248,113,113,0.3)" };

    return (
        <button
            {...rest}
            disabled={disabled || isLoading}
            className={`inline-flex items-center justify-center gap-2 font-medium rounded-md
        transition-all duration-150 cursor-pointer select-none
        focus-visible:outline-none focus-visible:ring-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClass} ${variantStyles[variant]} ${className}`}
            style={{
                ...variantStyle,
                fontFamily: "var(--font-space-grotesk)",
                borderRadius: "var(--radius-sm)",
                ...style,
            }}
        >
            {isLoading && (
                <span
                    className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                    aria-hidden="true"
                />
            )}
            {children}
        </button>
    );
}
