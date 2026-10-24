import type { Metadata } from "next";
import SectionHero from "@/components/ui/SectionHero";
import PageWrapper from "@/components/ui/PageWrapper";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "Halloween Celebration Planner — Plan Your Party in ₹",
    description: "Get a personalised Halloween celebration plan tailored to your budget in INR. Activities, decorations, schedule, and shopping list — all included.",
};

const inputs = [
    { label: "Setting", options: ["Home party", "Office/College event", "Outdoor gathering"], icon: "🏠" },
    { label: "Participants", options: ["1–5 people", "6–15 people", "16–50 people", "50+ people"], icon: "👥" },
    { label: "Budget (INR)", options: ["Under ₹500", "₹500–₹1,500", "₹1,500–₹5,000", "₹5,000+"], icon: "💰" },
    { label: "Atmosphere", options: ["Spooky & scary", "Fun & family", "Romantic", "Professional/corporate"], icon: "✨" },
    { label: "Time available", options: ["2 hours", "Half day", "Full day"], icon: "⏰" },
];

export default function CelebratePage() {
    return (
        <div className="flex flex-col">
            <SectionHero
                badge="✨ Celebration Planner"
                title="Plan Your Halloween"
                titleAccent="in ₹, your way"
                description="Answer five quick questions. Get a personalised Halloween celebration plan — activities, estimated costs, decorations, and a shopping checklist."
                accentColor="gold"
            />

            <PageWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                    {/* Form side */}
                    <div className="lg:col-span-3">
                        <div
                            className="rounded-2xl p-8"
                            style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Badge variant="gold">Preview Mode</Badge>
                                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Full planner coming soon</p>
                            </div>

                            <form aria-label="Halloween celebration planner (preview)" className="flex flex-col gap-7">
                                {inputs.map((input) => (
                                    <fieldset key={input.label} className="border-0 p-0 m-0">
                                        <legend
                                            className="flex items-center gap-2 text-sm font-medium mb-3"
                                            style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-space-grotesk)" }}
                                        >
                                            <span aria-hidden>{input.icon}</span> {input.label}
                                        </legend>
                                        <div className="flex flex-wrap gap-2">
                                            {input.options.map((opt, i) => (
                                                <label
                                                    key={opt}
                                                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer transition-all duration-150 text-sm"
                                                    style={{
                                                        backgroundColor: i === 0 ? "rgba(255,209,102,0.10)" : "var(--color-surface-raised)",
                                                        border: `1px solid ${i === 0 ? "rgba(255,209,102,0.4)" : "var(--color-border)"}`,
                                                        color: i === 0 ? "var(--color-gold)" : "var(--color-text-muted)",
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={input.label}
                                                        defaultChecked={i === 0}
                                                        className="sr-only"
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                ))}

                                <div
                                    className="mt-2 rounded-xl p-5 flex items-center gap-4"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(255,209,102,0.08) 0%, rgba(255,117,24,0.06) 100%)",
                                        border: "1px solid rgba(255,209,102,0.25)",
                                    }}
                                >
                                    <span className="text-2xl" aria-hidden>🚧</span>
                                    <div>
                                        <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-gold)", fontFamily: "var(--font-space-grotesk)" }}>
                                            Full planner in development
                                        </p>
                                        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                            This will generate a complete personalised plan — activities, schedule, shopping list, and cost breakdown.
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Preview output side */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <p
                            className="text-xs font-semibold uppercase tracking-widest mb-2"
                            style={{ color: "var(--color-text-ghost)" }}
                        >
                            Sample output
                        </p>

                        {/* Sample plan card */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}
                        >
                            <p className="text-xs font-semibold mb-3" style={{ color: "var(--color-text-ghost)" }}>🎉 Activities</p>
                            {[
                                { name: "Pumpkin carving contest", cost: "₹180", time: "60 min" },
                                { name: "Horror movie marathon", cost: "₹0 (OTT)", time: "2 hrs" },
                                { name: "DIY costume showcase", cost: "₹350", time: "30 min" },
                            ].map((act) => (
                                <div key={act.name} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid var(--color-border)" }}>
                                    <span className="text-sm" style={{ color: "var(--color-text)" }}>{act.name}</span>
                                    <div className="flex gap-3">
                                        <span className="text-xs" style={{ color: "var(--color-gold)" }}>{act.cost}</span>
                                        <span className="text-xs" style={{ color: "var(--color-text-ghost)" }}>{act.time}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-3">
                                <span className="text-sm font-semibold" style={{ color: "var(--color-text)", fontFamily: "var(--font-space-grotesk)" }}>Estimated total</span>
                                <span className="font-bold" style={{ color: "var(--color-gold)" }}>₹530</span>
                            </div>
                        </div>

                        {/* Shopping checklist */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: "var(--color-surface-raised)", border: "1px solid var(--color-border)" }}
                        >
                            <p className="text-xs font-semibold mb-3" style={{ color: "var(--color-text-ghost)" }}>🛒 Shopping checklist</p>
                            {["Pumpkin (1 large, ₹80)", "Orange fairy lights (₹120)", "Fake spider web pack (₹60)", "Black face paint (₹80)", "Paper bats (printable, ₹0)"].map((item) => (
                                <div key={item} className="flex items-start gap-2 py-1.5">
                                    <div className="w-4 h-4 rounded border flex-shrink-0 mt-0.5" style={{ border: "1px solid var(--color-border)" }} aria-hidden />
                                    <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
}
