import type { Metadata } from "next";
import Link from "next/link";
import { Ghost, BookOpen, Gamepad2, Sparkles } from "lucide-react";
import SectionHero from "@/components/ui/SectionHero";
import PageWrapper from "@/components/ui/PageWrapper";

export const metadata: Metadata = {
    title: "About HalloweenVerse",
    description: "HalloweenVerse is India's first immersive Halloween discovery platform — built to make Halloween accessible, affordable, and genuinely fun for Indian audiences.",
};

const principles = [
    {
        icon: Ghost,
        title: "India-first",
        desc: "All costs in ₹. All DIY materials available in Indian stores. All events from Indian cities.",
        color: "var(--color-orange)",
    },
    {
        icon: BookOpen,
        title: "Educate first",
        desc: "We don't assume you already know Halloween. Every section begins with context and history.",
        color: "var(--color-purple)",
    },
    {
        icon: Sparkles,
        title: "Accessible & inclusive",
        desc: "WCAG 2.1 AA accessibility. Reduced-motion support. All budgets welcome — from ₹0 to ₹5,000+.",
        color: "var(--color-gold)",
    },
    {
        icon: Gamepad2,
        title: "Free to use",
        desc: "No account required. No paywalls. Games, planner, guide, and costume explorer are free forever.",
        color: "var(--color-purple)",
    },
];

const stack = [
    ["Framework", "Next.js 16 App Router"],
    ["Language", "TypeScript 5"],
    ["Styling", "Tailwind CSS 4"],
    ["3D Engine", "Three.js + React Three Fiber"],
    ["Animation", "Motion (framer-motion)"],
    ["State", "Zustand"],
    ["Fonts", "Space Grotesk + Inter"],
];

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            <SectionHero
                badge="👻 About HalloweenVerse"
                title="Why we built this"
                titleAccent="for India"
                description="Halloween deserves an Indian home. A place that explains the tradition, helps you celebrate affordably, and makes the experience immersive and fun."
                accentColor="purple"
            />

            <PageWrapper narrow>

                {/* Mission */}
                <section className="mb-16">
                    <p
                        className="text-xs font-semibold uppercase tracking-widest mb-4"
                        style={{ color: "var(--color-text-ghost)" }}
                    >
                        Our mission
                    </p>
                    <blockquote
                        className="border-l-2 pl-6 py-1"
                        style={{ borderColor: "var(--color-purple)" }}
                    >
                        <p
                            className="font-medium leading-relaxed"
                            style={{ fontSize: "var(--text-xl)", color: "var(--color-text)", fontFamily: "var(--font-space-grotesk)" }}
                        >
                            Make Halloween genuinely accessible, affordable, and immersive for every Indian who is curious about it —
                            whether you&apos;re a student planning your first college event or a parent preparing a surprise for your kids.
                        </p>
                    </blockquote>
                </section>

                {/* Principles */}
                <section className="mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--color-text-ghost)" }}>
                        How we work
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {principles.map((p) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={p.title}
                                    className="flex gap-4 p-5 rounded-xl"
                                    style={{
                                        backgroundColor: "var(--color-surface)",
                                        border: "1px solid var(--color-border)",
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${p.color}15` }}
                                    >
                                        <Icon size={18} style={{ color: p.color }} aria-hidden />
                                    </div>
                                    <div>
                                        <h2
                                            className="font-semibold mb-1"
                                            style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)" }}
                                        >
                                            {p.title}
                                        </h2>
                                        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{p.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Tech stack */}
                <section className="mb-16">
                    <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: "var(--color-text-ghost)" }}>
                        Technology
                    </p>
                    <div
                        className="rounded-xl overflow-hidden"
                        style={{ border: "1px solid var(--color-border)" }}
                    >
                        {stack.map(([label, value], i) => (
                            <div
                                key={label}
                                className="flex justify-between items-center px-5 py-3.5 text-sm"
                                style={{
                                    backgroundColor: i % 2 === 0 ? "var(--color-surface)" : "var(--color-surface-raised)",
                                    borderBottom: i < stack.length - 1 ? "1px solid var(--color-border)" : "none",
                                }}
                            >
                                <span style={{ color: "var(--color-text-ghost)" }}>{label}</span>
                                <span style={{ color: "var(--color-text)", fontFamily: "var(--font-space-grotesk)" }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Links */}
                <section
                    className="rounded-xl p-8 text-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(155,92,255,0.08) 0%, rgba(255,117,24,0.06) 100%)",
                        border: "1px solid rgba(155,92,255,0.2)",
                    }}
                >
                    <h2 className="font-bold mb-3" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)", fontSize: "var(--text-xl)" }}>
                        Ready to dive in?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { label: "🌍 Explore", href: "/explore" },
                            { label: "📖 Guide", href: "/discover" },
                            { label: "✨ Planner", href: "/celebrate" },
                            { label: "🎮 Games", href: "/games" },
                            { label: "🗓️ Events", href: "/events" },
                        ].map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                    color: "var(--color-text-muted)",
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>
                </section>

            </PageWrapper>
        </div>
    );
}
