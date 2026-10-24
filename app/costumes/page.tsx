import type { Metadata } from "next";
import SectionHero from "@/components/ui/SectionHero";
import PageWrapper from "@/components/ui/PageWrapper";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "Halloween Costumes — DIY Ideas Made in India",
    description: "Find DIY Halloween costume ideas using materials available across India. All budgets, all difficulty levels, all costs in INR.",
};

const costumes = [
    {
        emoji: "👻",
        name: "Classic Ghost",
        difficulty: "easy" as const,
        costINR: 150,
        timeMin: 20,
        materials: ["White bedsheet", "Scissors", "Black marker"],
        desc: "The timeless Halloween costume — just a sheet with eye holes. Maximum spook, minimum effort.",
        color: "var(--color-text-muted)",
    },
    {
        emoji: "🧙‍♀️",
        name: "Witch / Wizard",
        difficulty: "easy" as const,
        costINR: 320,
        timeMin: 30,
        materials: ["Black kurta or saree", "Pointed hat (newspaper cone + black paint)", "Broom"],
        desc: "Adapt traditional Indian fabrics into a stellar witch look. A dupatta as a cape works beautifully.",
        color: "var(--color-purple)",
    },
    {
        emoji: "🧟",
        name: "Zombie",
        difficulty: "medium" as const,
        costINR: 480,
        timeMin: 60,
        materials: ["Old clothes (torn)", "White & grey face paint", "Fake blood (corn syrup + red food colour)", "Dark eye shadow"],
        desc: "Tear up old clothes, apply layered makeup. Corn syrup + red food colour makes excellent fake blood.",
        color: "var(--color-error)",
    },
    {
        emoji: "🕷️",
        name: "Spider / Spider-Man",
        difficulty: "medium" as const,
        costINR: 650,
        timeMin: 90,
        materials: ["Black leggings + top", "Red fabric paint or tape", "Black felt for legs", "Hot glue gun"],
        desc: "A spider costume with felt legs attached to a black outfit — eye-catching and budget-friendly.",
        color: "var(--color-orange)",
    },
    {
        emoji: "💀",
        name: "Sugar Skull (Día de los Muertos)",
        difficulty: "advanced" as const,
        costINR: 900,
        timeMin: 120,
        materials: ["White face paint", "Coloured face paint (red, blue, yellow)", "Floral headband", "Black formal wear"],
        desc: "Intricate floral face-paint patterns inspired by Mexican Day of the Dead art. Takes practice but stunning.",
        color: "var(--color-gold)",
    },
    {
        emoji: "🧛",
        name: "Vampire",
        difficulty: "easy" as const,
        costINR: 280,
        timeMin: 25,
        materials: ["Black formal outfit", "White face powder", "Red lipstick", "Fake fangs (₹80 at party shops)"],
        desc: "The aristocratic classic — pale skin, dark clothes, plastic fangs. Easy to assemble from existing wardrobe.",
        color: "var(--color-purple)",
    },
];

const difficultyMap = {
    easy: { label: "Easy", variant: "success" as const },
    medium: { label: "Medium", variant: "orange" as const },
    advanced: { label: "Advanced", variant: "purple" as const },
};

export default function CostumesPage() {
    return (
        <div className="flex flex-col">
            <SectionHero
                badge="👗 Costume Explorer"
                title="DIY Halloween Costumes"
                titleAccent="Made in India"
                description="Six costume ideas you can build from materials available at any Indian store, market, or at home — ranging from ₹150 to ₹900."
                accentColor="orange"
            />

            <PageWrapper>
                {/* Filter pills (visual, non-functional in placeholder) */}
                <div className="flex flex-wrap gap-2 mb-10">
                    <span className="text-sm mr-2" style={{ color: "var(--color-text-ghost)" }}>Filter:</span>
                    {["All", "Easy", "Medium", "Advanced", "Under ₹500", "₹500+"].map((f, i) => (
                        <button
                            key={f}
                            type="button"
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
                            style={{
                                backgroundColor: i === 0 ? "rgba(255,117,24,0.12)" : "var(--color-surface)",
                                border: `1px solid ${i === 0 ? "var(--color-orange)" : "var(--color-border)"}`,
                                color: i === 0 ? "var(--color-orange)" : "var(--color-text-muted)",
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Costume grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {costumes.map((c) => {
                        const diff = difficultyMap[c.difficulty];
                        return (
                            <article
                                key={c.name}
                                className="rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5"
                                style={{
                                    backgroundColor: "var(--color-surface)",
                                    border: "1px solid var(--color-border)",
                                }}
                            >
                                {/* Top accent bar */}
                                <div className="h-1" style={{ backgroundColor: c.color }} aria-hidden />

                                {/* Emoji zone */}
                                <div
                                    className="py-8 text-center text-6xl"
                                    style={{ backgroundColor: "var(--color-surface-raised)" }}
                                    role="img"
                                    aria-label={c.name}
                                >
                                    {c.emoji}
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h2
                                            className="font-semibold"
                                            style={{ fontSize: "var(--text-lg)", fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)" }}
                                        >
                                            {c.name}
                                        </h2>
                                        <Badge variant={diff.variant}>{diff.label}</Badge>
                                    </div>

                                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--color-text-muted)" }}>
                                        {c.desc}
                                    </p>

                                    {/* Stats row */}
                                    <div
                                        className="flex gap-4 mb-4 pb-4 text-sm"
                                        style={{ borderBottom: "1px solid var(--color-border)" }}
                                    >
                                        <span>
                                            <span style={{ color: "var(--color-text-ghost)", fontSize: "0.7rem", display: "block", textTransform: "uppercase", letterSpacing: "0.08em" }}>Cost</span>
                                            <span style={{ color: "var(--color-gold)", fontWeight: 600 }}>₹{c.costINR}</span>
                                        </span>
                                        <span>
                                            <span style={{ color: "var(--color-text-ghost)", fontSize: "0.7rem", display: "block", textTransform: "uppercase", letterSpacing: "0.08em" }}>Time</span>
                                            <span style={{ color: "var(--color-text)" }}>{c.timeMin} min</span>
                                        </span>
                                    </div>

                                    {/* Materials */}
                                    <div>
                                        <p className="text-xs font-medium mb-2" style={{ color: "var(--color-text-ghost)" }}>
                                            You&apos;ll need:
                                        </p>
                                        <ul className="flex flex-col gap-1">
                                            {c.materials.map((m) => (
                                                <li key={m} className="flex items-start gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                                    <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} aria-hidden />
                                                    {m}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </PageWrapper>
        </div>
    );
}
