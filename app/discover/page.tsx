import type { Metadata } from "next";
import SectionHero from "@/components/ui/SectionHero";
import PageWrapper from "@/components/ui/PageWrapper";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "Halloween Guide — History, Traditions & How to Celebrate in India",
    description: "Understand Halloween properly — from Celtic Samhain origins to modern Indian celebrations. Traditions, symbols, and practical tips explained.",
};

const topics = [
    {
        id: "origins",
        emoji: "🏔️",
        title: "Origins",
        subtitle: "From Samhain to Hallowe'en",
        summary: "Halloween traces its roots to the ancient Celtic festival of Samhain (pronounced 'SAH-win'), celebrated on 31 October to mark the end of harvest and the beginning of winter. Celts believed the boundary between the living and the dead dissolved that night.",
        facts: [
            "Samhain has been celebrated for over 2,000 years",
            "The name 'Halloween' comes from 'All Hallows' Eve'",
            "Christian missionaries blended Samhain with All Saints' Day in the 8th century",
        ],
        badge: "History",
        color: "var(--color-orange)",
        badgeVariant: "orange" as const,
    },
    {
        id: "symbols",
        emoji: "🎃",
        title: "Symbols",
        subtitle: "Why pumpkins, bats, and skulls?",
        summary: "Every Halloween symbol has a story. Jack-o'-lanterns originated in Irish folklore about a trickster named Stingy Jack. Bats were associated with evening Samhain bonfires that would attract insects — and the bats that hunted them.",
        facts: [
            "The original jack-o'-lanterns were carved from turnips in Ireland",
            "Black cats became associated with witchcraft in medieval Europe",
            "Spider webs symbolise time passing and the fragility of life",
        ],
        badge: "Symbols",
        color: "var(--color-purple)",
        badgeVariant: "purple" as const,
    },
    {
        id: "traditions",
        emoji: "🚪",
        title: "Traditions",
        subtitle: "Trick-or-treating, costumes & haunted houses",
        summary: "Trick-or-treating in its modern form emerged in North America in the 1930s, though 'guising' — children dressing up in costumes and receiving food — existed in Scotland and Ireland for centuries. Costumes evolved from disguises meant to confuse wandering spirits.",
        facts: [
            "Americans spend over $10 billion on Halloween annually",
            "The tradition of wearing costumes dates back to Celtic Samhain",
            "Haunted houses as entertainment began in the 1930s in the United States",
        ],
        badge: "Traditions",
        color: "var(--color-gold)",
        badgeVariant: "gold" as const,
    },
    {
        id: "india",
        emoji: "🇮🇳",
        title: "Halloween in India",
        subtitle: "How Indian communities celebrate",
        summary: "Halloween has grown significantly in urban India since the 2000s, driven by global pop culture, OTT platforms, and international school communities. Mumbai, Delhi, Bengaluru, and Pune now host major Halloween parties, themed dinners, and college events every October.",
        facts: [
            "Major malls in Indian metros host Halloween decoration events",
            "DIY Halloween costumes have become popular on social media since 2018",
            "College fests across India frequently include Halloween-themed nights",
        ],
        badge: "India Focus",
        color: "var(--color-success)",
        badgeVariant: "success" as const,
    },
];

export default function DiscoverPage() {
    return (
        <div className="flex flex-col">
            <SectionHero
                badge="📖 Educational Guide"
                title="Understanding Halloween"
                titleAccent="The full story"
                description="From a 2,000-year-old Celtic harvest festival to India's fastest-growing pop culture celebration — here's everything you need to know."
                accentColor="purple"
            />

            <PageWrapper narrow>
                {/* Topic sections */}
                <div className="flex flex-col gap-14">
                    {topics.map((topic, i) => (
                        <article
                            key={topic.id}
                            id={topic.id}
                            className="scroll-mt-20"
                        >
                            <div className="flex items-start gap-4 mb-5">
                                <span className="text-4xl flex-shrink-0" role="img" aria-label={topic.title}>{topic.emoji}</span>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <Badge variant={topic.badgeVariant}>{topic.badge}</Badge>
                                        <span className="text-xs" style={{ color: "var(--color-text-ghost)" }}>Section {String(i + 1).padStart(2, "0")}</span>
                                    </div>
                                    <h2
                                        className="font-bold"
                                        style={{ fontSize: "var(--text-2xl)", fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)" }}
                                    >
                                        {topic.title}
                                    </h2>
                                    <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>{topic.subtitle}</p>
                                </div>
                            </div>

                            {/* Callout / pull-quote */}
                            <blockquote
                                className="border-l-2 pl-5 py-1 mb-5 italic"
                                style={{ borderColor: topic.color }}
                            >
                                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-lg)" }}>{topic.summary}</p>
                            </blockquote>

                            {/* Facts */}
                            <div
                                className="rounded-xl p-5"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                }}
                            >
                                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-text-ghost)" }}>
                                    Did you know?
                                </p>
                                <ul className="flex flex-col gap-2.5">
                                    {topic.facts.map((fact) => (
                                        <li
                                            key={fact}
                                            className="flex items-start gap-3 text-sm"
                                            style={{ color: "var(--color-text-muted)" }}
                                        >
                                            <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: topic.color }} aria-hidden />
                                            {fact}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Rule divider */}
                            {i < topics.length - 1 && (
                                <div
                                    className="mt-14 h-px"
                                    style={{ background: `linear-gradient(to right, transparent, var(--color-border), transparent)` }}
                                    aria-hidden
                                />
                            )}
                        </article>
                    ))}
                </div>

                {/* Sources */}
                <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-text-ghost)" }}>Sources & further reading</p>
                    <ul className="flex flex-col gap-2">
                        {[
                            { label: "History of Halloween — History.com", url: "https://www.history.com/topics/halloween/history-of-halloween" },
                            { label: "Samhain — Britannica", url: "https://www.britannica.com/topic/Samhain" },
                            { label: "Halloween — Wikipedia", url: "https://en.wikipedia.org/wiki/Halloween" },
                        ].map((source) => (
                            <li key={source.url}>
                                <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm transition-colors duration-150"
                                    style={{ color: "var(--color-purple)" }}
                                >
                                    ↗ {source.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </PageWrapper>
        </div>
    );
}
