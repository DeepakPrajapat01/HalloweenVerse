import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SectionHeroProps {
    badge?: string;
    title: string;
    titleAccent?: string;   // optional second line with gradient
    description: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    backHref?: string;
    backLabel?: string;
    accentColor?: "orange" | "purple" | "gold";
    children?: ReactNode;
}

const accentMap = {
    orange: {
        badge: "rgba(255,117,24,0.12)",
        badgeText: "var(--color-orange)",
        badgeBorder: "rgba(255,117,24,0.25)",
        glow: "rgba(255,117,24,0.12)",
        ctaBg: "var(--color-orange)",
        ctaText: "#000",
        gradient: "from-orange-500 to-yellow-300",
        radial: "rgba(255,117,24,0.08)",
    },
    purple: {
        badge: "rgba(155,92,255,0.12)",
        badgeText: "var(--color-purple)",
        badgeBorder: "rgba(155,92,255,0.25)",
        glow: "rgba(155,92,255,0.12)",
        ctaBg: "var(--color-purple)",
        ctaText: "#fff",
        gradient: "from-purple-500 to-indigo-400",
        radial: "rgba(155,92,255,0.08)",
    },
    gold: {
        badge: "rgba(255,209,102,0.12)",
        badgeText: "var(--color-gold)",
        badgeBorder: "rgba(255,209,102,0.25)",
        glow: "rgba(255,209,102,0.12)",
        ctaBg: "var(--color-gold)",
        ctaText: "#000",
        gradient: "from-yellow-400 to-orange-300",
        radial: "rgba(255,209,102,0.08)",
    },
};

export default function SectionHero({
    badge,
    title,
    titleAccent,
    description,
    primaryCta,
    secondaryCta,
    backHref,
    backLabel = "Back",
    accentColor = "orange",
    children,
}: SectionHeroProps) {
    const accent = accentMap[accentColor];

    return (
        <section
            className="relative overflow-hidden pt-16 pb-20 px-6 text-center"
            style={{
                background: `radial-gradient(ellipse 70% 50% at 50% -5%, ${accent.radial} 0%, transparent 70%)`,
            }}
        >
            {/* Optional back link */}
            {backHref && (
                <div className="container-hv mb-8 flex items-start">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1.5 text-sm transition-colors duration-150"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        <ArrowLeft size={14} aria-hidden />
                        {backLabel}
                    </Link>
                </div>
            )}

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Badge */}
                {badge && (
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-5"
                        style={{
                            backgroundColor: accent.badge,
                            color: accent.badgeText,
                            border: `1px solid ${accent.badgeBorder}`,
                        }}
                    >
                        {badge}
                    </div>
                )}

                {/* Title */}
                <h1
                    className="font-bold mb-4"
                    style={{
                        fontSize: "var(--text-3xl)",
                        fontFamily: "var(--font-space-grotesk)",
                        color: "var(--color-text)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.01em",
                    }}
                >
                    {title}
                    {titleAccent && (
                        <>
                            <br />
                            <span
                                style={{
                                    background: `linear-gradient(135deg, ${accent.ctaBg} 0%, ${accentColor === "purple" ? "#a78bfa" : "var(--color-gold)"} 100%)`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {titleAccent}
                            </span>
                        </>
                    )}
                </h1>

                {/* Description */}
                <p
                    className="mb-8 leading-relaxed mx-auto"
                    style={{
                        fontSize: "var(--text-lg)",
                        color: "var(--color-text-muted)",
                        maxWidth: "520px",
                    }}
                >
                    {description}
                </p>

                {/* CTAs */}
                {(primaryCta || secondaryCta) && (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {primaryCta && (
                            <Link
                                href={primaryCta.href}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-semibold text-sm transition-all duration-150 hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: accent.ctaBg,
                                    color: accent.ctaText,
                                    fontFamily: "var(--font-space-grotesk)",
                                    borderRadius: "var(--radius-sm)",
                                }}
                            >
                                {primaryCta.label}
                            </Link>
                        )}
                        {secondaryCta && (
                            <Link
                                href={secondaryCta.href}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-medium text-sm transition-all duration-150"
                                style={{
                                    color: "var(--color-text-muted)",
                                    border: "1px solid var(--color-border)",
                                    borderRadius: "var(--radius-sm)",
                                }}
                            >
                                {secondaryCta.label}
                            </Link>
                        )}
                    </div>
                )}

                {children}
            </div>
        </section>
    );
}
