import type { Metadata } from "next";
import SectionHero from "@/components/ui/SectionHero";
import PageWrapper from "@/components/ui/PageWrapper";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "Halloween Games Hub — Free Browser Games",
    description: "Play free Halloween browser games — Memory Match, Pumpkin Carving Studio, and the Haunted House Quiz. No login required.",
};

const games = [
    {
        id: "memory-match",
        num: "I",
        emoji: "🃏",
        title: "Spooky Memory Match",
        desc: "Flip cards to find matching Halloween pairs. Increasing difficulty across three rounds — can you beat the ghost's score?",
        objective: "Match all pairs in the fewest flips.",
        players: "1 player",
        duration: "3–10 min",
        color: "var(--color-orange)",
        border: "rgba(255,117,24,0.3)",
        bg: "rgba(255,117,24,0.06)",
        status: "In development",
        statusVariant: "orange" as const,
        features: ["16 cards (8 pairs)", "Move counter", "Timer", "3 difficulty levels"],
    },
    {
        id: "pumpkin-studio",
        num: "II",
        emoji: "🎃",
        title: "Pumpkin Carving Studio",
        desc: "Pick eye shapes, nose styles, and a mouth — then preview your personalised jack-o'-lantern glowing in the dark.",
        objective: "Design and share your pumpkin.",
        players: "1 player",
        duration: "2–5 min",
        color: "var(--color-gold)",
        border: "rgba(255,209,102,0.3)",
        bg: "rgba(255,209,102,0.06)",
        status: "In development",
        statusVariant: "gold" as const,
        features: ["12 face templates", "Glow preview", "Downloadable image", "Random generate"],
    },
    {
        id: "haunted-quiz",
        num: "III",
        emoji: "💀",
        title: "Haunted House Quiz",
        desc: "15 Halloween trivia questions ranging from beginner (What colour is typically associated with Halloween?) to expert (In which year was the film Halloween first released?).",
        objective: "Score 15/15 without any hints.",
        players: "1–4 players (pass-and-play)",
        duration: "5–15 min",
        color: "var(--color-purple)",
        border: "rgba(155,92,255,0.3)",
        bg: "rgba(155,92,255,0.06)",
        status: "In development",
        statusVariant: "purple" as const,
        features: ["15 questions", "3 difficulty tiers", "Explanations on wrong answer", "Score history"],
    },
];

export default function GamesPage() {
    return (
        <div className="flex flex-col">
            <SectionHero
                badge="🎮 Games Hub"
                title="Halloween Games"
                titleAccent="Free to play"
                description="Three browser games — no login, no downloads. Built with Canvas and SVG, they run on any device."
                accentColor="purple"
            />

            <PageWrapper>
                <div className="flex flex-col gap-8">
                    {games.map((game) => (
                        <section
                            key={game.id}
                            id={game.id}
                            className="rounded-2xl overflow-hidden"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                border: `1px solid ${game.border}`,
                                boxShadow: `0 0 32px ${game.bg}`,
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                {/* Left: big visual */}
                                <div
                                    className="flex flex-col items-center justify-center py-12 px-8 text-center"
                                    style={{ backgroundColor: game.bg }}
                                >
                                    <span
                                        aria-hidden
                                        className="text-[80px] leading-none mb-3 block"
                                    >
                                        {game.emoji}
                                    </span>
                                    <span
                                        className="text-6xl font-black opacity-20 select-none"
                                        aria-hidden
                                        style={{ fontFamily: "var(--font-space-grotesk)", color: game.color }}
                                    >
                                        {game.num}
                                    </span>
                                </div>

                                {/* Right: content */}
                                <div className="md:col-span-2 p-7 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Badge variant={game.statusVariant}>{game.status}</Badge>
                                        <span className="text-xs" style={{ color: "var(--color-text-ghost)" }}>{game.players} · {game.duration}</span>
                                    </div>

                                    <h2
                                        className="font-bold mb-2"
                                        style={{ fontSize: "var(--text-2xl)", fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)" }}
                                    >
                                        {game.title}
                                    </h2>

                                    <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--color-text-muted)" }}>
                                        {game.desc}
                                    </p>

                                    {/* Objective */}
                                    <div
                                        className="rounded-lg px-4 py-3 mb-5 text-sm"
                                        style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}
                                    >
                                        <span style={{ color: "var(--color-text-ghost)" }}>🎯 Objective: </span>
                                        <span style={{ color: "var(--color-text)" }}>{game.objective}</span>
                                    </div>

                                    {/* Features */}
                                    <div className="grid grid-cols-2 gap-2">
                                        {game.features.map((f) => (
                                            <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: game.color }} aria-hidden />
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </PageWrapper>
        </div>
    );
}
