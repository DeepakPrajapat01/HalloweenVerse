import type { Metadata } from "next";
import SectionHero from "@/components/ui/SectionHero";
import PageWrapper from "@/components/ui/PageWrapper";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
    title: "Halloween Events 2026 — India",
    description: "Discover Halloween parties, themed dinners, and cultural events near you in Mumbai, Delhi, Bengaluru, Hyderabad, Pune, and more. Sample data shown — verify before attending.",
};

const cities = ["All cities", "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune", "Online"];

const sampleEvents = [
    {
        id: "e1",
        name: "The Grand Halloween Masquerade",
        city: "Mumbai",
        venue: "A haunted banquet hall, Bandra",
        date: "31 Oct 2026",
        time: "8:00 PM – 2:00 AM",
        category: "Party",
        price: 999,
        organiser: "SpookyCo Events",
        tag: "18+",
        color: "var(--color-orange)",
        tagVariant: "orange" as const,
    },
    {
        id: "e2",
        name: "Family Halloween Carnival",
        city: "Bengaluru",
        venue: "Orion East Mall Campus",
        date: "31 Oct 2026",
        time: "4:00 PM – 9:00 PM",
        category: "Family",
        price: 0,
        organiser: "Orion Malls",
        tag: "All ages",
        color: "var(--color-gold)",
        tagVariant: "gold" as const,
    },
    {
        id: "e3",
        name: "Haunted Office Night",
        city: "Delhi",
        venue: "Connaught Place Rooftop",
        date: "30 Oct 2026",
        time: "7:00 PM – Midnight",
        category: "Corporate",
        price: 600,
        organiser: "EventKraft India",
        tag: "Corporate",
        color: "var(--color-purple)",
        tagVariant: "purple" as const,
    },
    {
        id: "e4",
        name: "Online Halloween Trivia Night",
        city: "Online",
        venue: "Zoom / Google Meet",
        date: "31 Oct 2026",
        time: "9:00 PM – 11:00 PM",
        category: "Online",
        price: 0,
        organiser: "HalloweenVerse",
        tag: "Online",
        color: "var(--color-success)",
        tagVariant: "success" as const,
    },
    {
        id: "e5",
        name: "Spooky Supper Club",
        city: "Hyderabad",
        venue: "Private Villa, Jubilee Hills",
        date: "31 Oct 2026",
        time: "7:30 PM – 11:00 PM",
        category: "Dining",
        price: 1800,
        organiser: "The Supper Club HYD",
        tag: "Ages 21+",
        color: "var(--color-orange)",
        tagVariant: "orange" as const,
    },
    {
        id: "e6",
        name: "Costume Contest & Rave",
        city: "Pune",
        venue: "Koregaon Park Club",
        date: "31 Oct 2026",
        time: "10:00 PM – 4:00 AM",
        category: "Party",
        price: 799,
        organiser: "NightLife Pune",
        tag: "18+",
        color: "var(--color-purple)",
        tagVariant: "purple" as const,
    },
];

export default function EventsPage() {
    return (
        <div className="flex flex-col">
            <SectionHero
                badge="🗓️ Events Explorer"
                title="Halloween Events"
                titleAccent="Across India 2026"
                description="Parties, carnivals, themed dinners, and online events — discover what's happening near you this Halloween."
                accentColor="gold"
            />

            <PageWrapper>
                {/* Sample data notice */}
                <div
                    className="rounded-xl p-4 mb-8 flex items-start gap-3"
                    style={{
                        backgroundColor: "rgba(251,191,36,0.08)",
                        border: "1px solid rgba(251,191,36,0.25)",
                    }}
                >
                    <span className="text-lg flex-shrink-0" aria-hidden>⚠️</span>
                    <p className="text-sm" style={{ color: "var(--color-warning)" }}>
                        <strong>Sample data only.</strong> These events are illustrative examples. Always verify event details directly with the organiser before attending or making any payment.
                    </p>
                </div>

                {/* City filter pills */}
                <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter events by city">
                    {cities.map((city, i) => (
                        <button
                            key={city}
                            type="button"
                            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
                            style={{
                                backgroundColor: i === 0 ? "rgba(255,209,102,0.12)" : "var(--color-surface)",
                                border: `1px solid ${i === 0 ? "rgba(255,209,102,0.4)" : "var(--color-border)"}`,
                                color: i === 0 ? "var(--color-gold)" : "var(--color-text-muted)",
                            }}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                {/* Events grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {sampleEvents.map((event) => (
                        <article
                            key={event.id}
                            className="rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5"
                            style={{
                                backgroundColor: "var(--color-surface)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            {/* Colour bar */}
                            <div className="h-1" style={{ backgroundColor: event.color }} aria-hidden />

                            <div className="p-5 flex flex-col flex-1">
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h2
                                        className="font-semibold leading-tight"
                                        style={{
                                            fontSize: "var(--text-base)",
                                            fontFamily: "var(--font-space-grotesk)",
                                            color: "var(--color-text)",
                                        }}
                                    >
                                        {event.name}
                                    </h2>
                                    <Badge variant={event.tagVariant}>{event.tag}</Badge>
                                </div>

                                {/* Details */}
                                <div className="flex flex-col gap-1.5 mb-4 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                    <span>📍 {event.venue}, {event.city}</span>
                                    <span>📅 {event.date} · {event.time}</span>
                                    <span>🗂️ {event.category} · By {event.organiser}</span>
                                </div>

                                {/* Price row */}
                                <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                                    <span
                                        className="font-bold text-sm"
                                        style={{ color: event.price === 0 ? "var(--color-success)" : "var(--color-gold)" }}
                                    >
                                        {event.price === 0 ? "Free entry" : `₹${event.price}`}
                                    </span>
                                    <span
                                        className="text-xs px-2 py-1 rounded-full"
                                        style={{
                                            backgroundColor: "rgba(155,92,255,0.08)",
                                            color: "var(--color-text-ghost)",
                                            border: "1px solid rgba(155,92,255,0.15)",
                                        }}
                                    >
                                        ⚠️ Sample
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Submit your event CTA */}
                <div
                    className="mt-12 rounded-xl p-8 text-center"
                    style={{
                        background: "linear-gradient(135deg, rgba(155,92,255,0.10) 0%, rgba(255,209,102,0.08) 100%)",
                        border: "1px solid rgba(155,92,255,0.2)",
                    }}
                >
                    <h2 className="font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--color-text)", fontSize: "var(--text-xl)" }}>
                        Organising a Halloween event?
                    </h2>
                    <p className="text-sm mb-0" style={{ color: "var(--color-text-muted)" }}>
                        Community event submission and verification pipeline coming soon. Check back in October 2026.
                    </p>
                </div>
            </PageWrapper>
        </div>
    );
}
