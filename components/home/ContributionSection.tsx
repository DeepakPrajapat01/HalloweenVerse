"use client";

import { useState, useCallback } from "react";
import { Copy, Check, ExternalLink, Sparkles, AlertCircle } from "lucide-react";
import {
    CONTRIBUTION_CONFIG,
    isConfiguredUpiId,
    buildUpiPaymentUri,
} from "@/src/config/contribution";

export default function ContributionSection() {
    const [copied, setCopied] = useState(false);
    const [copyError, setCopyError] = useState<string | null>(null);
    const [devNotice, setDevNotice] = useState(false);

    const isConfigured = isConfiguredUpiId(CONTRIBUTION_CONFIG.recipientUpiId);
    const upiUri = buildUpiPaymentUri(CONTRIBUTION_CONFIG);

    const handleCopy = useCallback(async () => {
        setCopyError(null);
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(CONTRIBUTION_CONFIG.recipientUpiId);
            } else {
                // Fallback for older browsers or restricted environments
                const textarea = document.createElement("textarea");
                textarea.value = CONTRIBUTION_CONFIG.recipientUpiId;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                const successful = document.execCommand("copy");
                document.body.removeChild(textarea);
                if (!successful) throw new Error("Fallback copy failed");
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            setCopyError("Could not copy automatically. Please select and copy the UPI ID above.");
            setTimeout(() => setCopyError(null), 5000);
        }
    }, []);

    const handleContributeClick = (e: React.MouseEvent) => {
        if (!isConfigured || !upiUri) {
            e.preventDefault();
            setDevNotice(true);
            setTimeout(() => setDevNotice(false), 5000);
            return;
        }
        // Explicit user action opens the UPI handler
        window.location.href = upiUri;
    };

    return (
        <section
            id="support-project"
            aria-labelledby="contribution-heading"
            className="relative z-20 w-full px-4 sm:px-6 py-16 sm:py-24"
        >
            <div className="mx-auto max-w-2xl">
                {/* Tasteful Ambient Card Container */}
                <div
                    className="relative overflow-hidden rounded-3xl border border-purple-500/25 bg-[#120e24]/85 p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_50px_rgba(155,92,255,0.08)] backdrop-blur-xl transition-all"
                >
                    {/* Subtle warm decorative top corner glow */}
                    <div
                        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-orange-500/15 via-purple-500/10 to-transparent blur-3xl"
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-tr from-purple-600/15 via-orange-500/10 to-transparent blur-3xl"
                        aria-hidden="true"
                    />

                    {/* Small Heading Badge */}
                    <div className="mb-4 flex items-center justify-center">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-purple-300 backdrop-blur-md">
                            <Sparkles className="h-3 w-3 text-amber-400" aria-hidden="true" />
                            <span>A LITTLE MAGIC GOES A LONG WAY</span>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h2
                        id="contribution-heading"
                        className="text-center font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6"
                    >
                        Help Keep the Halloween Magic Alive 🎃
                    </h2>

                    {/* Heartfelt Message Copy */}
                    <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#C5BED6] mb-8 font-sans">
                        <p>
                            HalloweenVerse started with a simple idea: to create a little Halloween world
                            where anyone can explore spooky streets, discover traditions from around the
                            world, and experience the magic of Halloween.
                        </p>
                        <p>
                            I&apos;m building this experience independently, one little detail at a time.
                        </p>
                        <p>
                            If this world made you smile, sparked your curiosity, or gave you a fun little
                            escape, you can support its continued development with a small voluntary
                            contribution.
                        </p>
                        <p>
                            Every contribution, no matter the amount, is genuinely appreciated and helps me
                            keep improving this little world.
                        </p>
                        <p>
                            And if contributing isn&apos;t possible, that&apos;s absolutely okay. Exploring
                            HalloweenVerse and sharing it with someone else is already a wonderful way to
                            support the project.
                        </p>
                        <p className="font-medium text-white/95">
                            Thank you for being part of this adventure. 🧡
                        </p>
                    </div>

                    {/* UPI Details Box */}
                    <div className="rounded-2xl border border-white/10 bg-[#0a0714]/70 p-4 sm:p-5 mb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-300/80">
                                    Recipient UPI ID
                                </span>
                                <span className="font-mono text-sm sm:text-base font-bold text-amber-300 select-all tracking-wide mt-0.5">
                                    {CONTRIBUTION_CONFIG.recipientUpiId}
                                </span>
                                <span className="text-[11px] text-gray-400 mt-0.5">
                                    Name: {CONTRIBUTION_CONFIG.recipientName}
                                </span>
                            </div>

                            {/* Quick Copy Action */}
                            <button
                                type="button"
                                onClick={handleCopy}
                                aria-label="Copy UPI ID to clipboard"
                                className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-950/40 px-3.5 py-2 text-xs font-semibold text-purple-200 transition-all hover:bg-purple-900/50 hover:text-white hover:border-purple-400 active:scale-95 focus-visible:outline-2 focus-visible:outline-orange-400 cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                                        <span className="text-emerald-300">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-4 w-4 text-purple-300" aria-hidden="true" />
                                        <span>Copy UPI ID</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Accessible Live Region Feedback */}
                        <div
                            aria-live="polite"
                            role="status"
                            className="mt-2 min-h-[1.25rem] text-xs transition-opacity"
                        >
                            {copied && (
                                <p className="text-emerald-400 font-medium">
                                    ✓ UPI ID copied to clipboard! You can paste it into any UPI app.
                                </p>
                            )}
                            {copyError && (
                                <p className="text-amber-400 font-medium">
                                    {copyError}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Payment Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6">
                        {/* Button A: Copy UPI ID */}
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-98 focus-visible:outline-2 focus-visible:outline-orange-400 cursor-pointer"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                                    <span>UPI ID Copied</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 text-gray-300" aria-hidden="true" />
                                    <span>Copy UPI ID</span>
                                </>
                            )}
                        </button>

                        {/* Button B: Contribute via UPI */}
                        <button
                            type="button"
                            onClick={handleContributeClick}
                            disabled={!isConfigured}
                            aria-disabled={!isConfigured}
                            aria-label={
                                isConfigured
                                    ? "Contribute via UPI in your payment application"
                                    : "UPI payment link unavailable while configuration placeholder is present"
                            }
                            className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-display text-sm font-bold tracking-wide transition-all ${isConfigured
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-[0_0_25px_rgba(255,117,24,0.35)] hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,117,24,0.5)] active:scale-98 cursor-pointer"
                                    : "bg-white/10 text-gray-400 border border-white/10 cursor-not-allowed opacity-75"
                                } focus-visible:outline-2 focus-visible:outline-orange-400`}
                        >
                            <span>Contribute via UPI</span>
                            <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Development-safe notice if placeholder has not been replaced */}
                    {(!isConfigured || devNotice) && (
                        <div
                            role="alert"
                            className="mb-6 rounded-xl border border-amber-500/30 bg-amber-950/30 p-3 text-center text-xs text-amber-200/90 flex items-center justify-center gap-2"
                        >
                            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" aria-hidden="true" />
                            <span>
                                UPI payments are currently being configured. You can check back soon!
                            </span>
                        </div>
                    )}

                    {/* Display Note */}
                    <p className="text-center text-xs text-gray-400 mb-6">
                        Contributions are completely optional. You choose the amount.
                    </p>

                    {/* Closing Line */}
                    <div className="border-t border-white/10 pt-6 text-center">
                        <p className="text-xs sm:text-sm font-medium italic text-amber-200/90 font-display">
                            &ldquo;Made with curiosity, creativity, and a little Halloween magic.&rdquo;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
