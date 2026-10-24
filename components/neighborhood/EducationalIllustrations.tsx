"use client";

interface IllustrationProps {
    type: "pumpkin" | "street" | "haunted" | "costume" | "party" | "park" | "candy" | "world";
    accentColor: string;
}

export default function EducationalIllustration({ type, accentColor }: IllustrationProps) {
    switch (type) {
        case "pumpkin":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-950/40 via-[#160d22] to-[#0c0816] shadow-inner">
                    {/* Atmospheric background glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
                    
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_15px_rgba(255,117,24,0.4)]">
                        {/* Autumn Leaves in background */}
                        <path d="M40,110 C50,85 70,80 80,95 C65,115 50,115 40,110 Z" fill="#9A3412" opacity="0.6" />
                        <path d="M195,110 C185,88 165,85 155,100 C170,120 185,118 195,110 Z" fill="#B45309" opacity="0.6" />
                        
                        {/* Pumpkin Stem */}
                        <path d="M115,42 C115,28 128,24 132,18 C135,22 133,32 125,42 Z" fill="#3F6212" stroke="#1E293B" strokeWidth="1.5" />
                        
                        {/* Carving Tendril */}
                        <path d="M127,24 Q138,20 142,28 Q144,36 136,36" fill="none" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" />

                        {/* Pumpkin Outer Ribs */}
                        <ellipse cx="88" cy="82" rx="34" ry="46" fill="#C2410C" />
                        <ellipse cx="152" cy="82" rx="34" ry="46" fill="#C2410C" />
                        <ellipse cx="102" cy="82" rx="30" ry="48" fill="#EA580C" />
                        <ellipse cx="138" cy="82" rx="30" ry="48" fill="#EA580C" />
                        {/* Pumpkin Center Segment */}
                        <ellipse cx="120" cy="82" rx="26" ry="50" fill="#F97316" />

                        {/* Carved Glowing Eyes */}
                        <polygon points="98,68 112,68 105,52" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />
                        <polygon points="128,68 142,68 135,52" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />
                        {/* Carved Nose */}
                        <polygon points="115,78 125,78 120,70" fill="#FEF08A" filter="drop-shadow(0 0 5px #F59E0B)" />
                        {/* Carved Jagged Smile */}
                        <path
                            d="M94,88 Q120,118 146,88 Q138,98 132,90 Q126,98 120,90 Q114,98 108,90 Q102,98 94,88 Z"
                            fill="#FEF08A"
                            filter="drop-shadow(0 0 8px #F59E0B)"
                        />

                        {/* Traditional Carved Turnip on the side */}
                        <g transform="translate(30, 78) scale(0.45)">
                            <ellipse cx="40" cy="50" rx="30" ry="38" fill="#E2E8F0" />
                            <ellipse cx="40" cy="25" rx="26" ry="16" fill="#86198F" opacity="0.8" />
                            <circle cx="30" cy="48" r="6" fill="#1E293B" />
                            <circle cx="50" cy="48" r="6" fill="#1E293B" />
                            <path d="M26,68 Q40,82 54,68" stroke="#1E293B" strokeWidth="4" fill="none" strokeLinecap="round" />
                        </g>
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-orange-300/80 uppercase">
                        Harvest Folk Carving
                    </div>
                </div>
            );

        case "street":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-b from-amber-950/40 via-[#130d22] to-[#0a0714] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent" />
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]">
                        {/* Night Sky Full Moon */}
                        <circle cx="190" cy="34" r="20" fill="#FEF3C7" filter="drop-shadow(0 0 12px #FDE68A)" />
                        
                        {/* Neighborhood Rooftops Silhouette */}
                        <path d="M0,110 L25,85 L50,110 L85,75 L120,110 L155,80 L190,110 L240,85 L240,140 L0,140 Z" fill="#171224" />
                        
                        {/* Glowing Windows */}
                        <rect x="30" y="95" width="10" height="10" fill="#FBBF24" opacity="0.9" />
                        <rect x="98" y="90" width="12" height="14" fill="#FBBF24" opacity="0.8" />
                        <rect x="165" y="94" width="10" height="10" fill="#FBBF24" opacity="0.9" />

                        {/* Streetlight */}
                        <line x1="55" y1="125" x2="55" y2="45" stroke="#475569" strokeWidth="3" />
                        <path d="M50,45 Q55,35 65,42" fill="none" stroke="#475569" strokeWidth="2.5" />
                        <polygon points="60,42 70,42 67,49 63,49" fill="#F59E0B" />
                        <circle cx="65" cy="46" r="14" fill="#FDE68A" opacity="0.3" filter="blur(3px)" />

                        {/* Trick-or-treaters Silhouette */}
                        {/* Child in Witch Hat */}
                        <path d="M125,125 L128,105 L132,125 Z" fill="#8B5CF6" />
                        <circle cx="130" cy="100" r="4" fill="#DDD" />
                        <polygon points="122,98 138,98 130,82" fill="#6D28D9" />
                        {/* Candy Bag */}
                        <path d="M136,110 Q142,110 142,118 Q142,122 136,122 Z" fill="#F97316" />

                        {/* Child in Ghost Sheet */}
                        <path d="M152,125 Q146,110 152,98 Q158,110 162,125 Q157,122 152,125 Z" fill="#F1F5F9" />
                        <circle cx="150" cy="104" r="1.5" fill="#000" />
                        <circle cx="154" cy="104" r="1.5" fill="#000" />
                        {/* Candy Bucket */}
                        <ellipse cx="163" cy="116" rx="4" ry="5" fill="#EA580C" />
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-amber-300/80 uppercase">
                        Community Porch Walk
                    </div>
                </div>
            );

        case "haunted":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-[#130b20] to-[#07040e] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_15px_rgba(155,92,255,0.4)]">
                        {/* Blood Moon / Pale Celtic Moon */}
                        <circle cx="65" cy="40" r="24" fill="#E9D5FF" filter="drop-shadow(0 0 16px #A855F7)" />

                        {/* Ancient Gaelic Samhain Bonfire on the Hill */}
                        <path d="M0,140 Q40,110 90,130 Q160,115 240,140 Z" fill="#140f22" />
                        <polygon points="35,115 42,95 48,115" fill="#F97316" />
                        <polygon points="40,115 45,90 50,115" fill="#FEF08A" />

                        {/* Gothic Manor Silhouette */}
                        <rect x="110" y="60" width="85" height="75" fill="#0E091A" />
                        {/* Main Steep Roof */}
                        <polygon points="105,60 152,25 200,60" fill="#080511" />
                        {/* Gothic Spire Tower */}
                        <rect x="165" y="35" width="28" height="60" fill="#0A0614" />
                        <polygon points="160,35 179,5 198,35" fill="#080511" />

                        {/* Stained Glass Violet Windows */}
                        <path d="M125,75 Q135,62 145,75 L145,95 L125,95 Z" fill="#C084FC" opacity="0.85" filter="drop-shadow(0 0 5px #9333EA)" />
                        <path d="M172,50 Q179,40 186,50 L186,65 L172,65 Z" fill="#C084FC" opacity="0.85" filter="drop-shadow(0 0 5px #9333EA)" />

                        {/* Flying Bats */}
                        <path d="M50,30 Q54,24 58,30 Q62,26 64,30 Q60,32 58,36 Q56,32 50,30 Z" fill="#A855F7" />
                        <path d="M85,20 Q88,16 91,20 Q94,17 96,20 Q93,22 91,25 Q89,22 85,20 Z" fill="#9333EA" />
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-purple-300/80 uppercase">
                        2,000 Years of Lore
                    </div>
                </div>
            );

        case "costume":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-rose-500/30 bg-gradient-to-b from-rose-950/40 via-[#180a1a] to-[#0c0510] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent" />
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
                        {/* Masquerade Feathers */}
                        <path d="M120,40 Q110,10 90,15 Q115,25 118,40 Z" fill="#FB7185" />
                        <path d="M120,40 Q130,8 150,15 Q125,25 122,40 Z" fill="#E11D48" />
                        <path d="M120,40 Q120,2 120,2 Q126,20 120,40 Z" fill="#FDE047" />

                        {/* Classic Venetian / Guising Mask */}
                        <path
                            d="M60,65 Q85,45 120,55 Q155,45 180,65 Q185,95 155,95 Q120,95 120,78 Q120,95 85,95 Q55,95 60,65 Z"
                            fill="#881337"
                            stroke="#FDA4AF"
                            strokeWidth="2"
                            filter="drop-shadow(0 0 8px #E11D48)"
                        />

                        {/* Ornate Gold Filigree on Mask */}
                        <path d="M75,65 Q95,58 115,68" stroke="#FDE047" strokeWidth="1.5" fill="none" />
                        <path d="M165,65 Q145,58 125,68" stroke="#FDE047" strokeWidth="1.5" fill="none" />

                        {/* Eye Cutouts */}
                        <ellipse cx="90" cy="72" rx="14" ry="8" fill="#0C0510" />
                        <ellipse cx="150" cy="72" rx="14" ry="8" fill="#0C0510" />

                        {/* Masquerade Wand Handle */}
                        <path d="M182,78 L210,135" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                        
                        {/* Sparkles / Magic Stars */}
                        <polygon points="45,45 47,40 52,42 48,47 50,52 45,49 40,52 42,47 38,42 43,40" fill="#FDE047" />
                        <polygon points="195,35 197,31 201,33 198,37 199,41 195,39 191,41 193,37 189,33 193,31" fill="#FDE047" />
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-rose-300/80 uppercase">
                        Guising & Masquerade
                    </div>
                </div>
            );

        case "party":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-orange-500/30 bg-gradient-to-b from-orange-950/40 via-[#1b1016] to-[#0a050c] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_15px_rgba(251,146,60,0.4)]">
                        {/* Overhead Hanging Bunting & Fairy Lights */}
                        <path d="M0,25 Q60,45 120,30 Q180,45 240,25" fill="none" stroke="#64748B" strokeWidth="1.5" />
                        {/* Flags */}
                        <polygon points="30,32 45,35 37,50" fill="#F97316" />
                        <polygon points="75,37 90,36 82,52" fill="#8B5CF6" />
                        <polygon points="145,34 160,37 152,52" fill="#F59E0B" />
                        <polygon points="190,32 205,30 197,48" fill="#10B981" />

                        {/* Blazing Bonfire Logs */}
                        <line x1="85" y1="120" x2="155" y2="120" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
                        <line x1="95" y1="125" x2="145" y2="115" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />

                        {/* Animated-look Bonfire Flames */}
                        <path d="M90,120 Q105,70 120,50 Q135,70 150,120 Z" fill="#EA580C" />
                        <path d="M100,120 Q112,80 120,62 Q128,80 140,120 Z" fill="#F97316" />
                        <path d="M110,120 Q117,92 120,78 Q123,92 130,120 Z" fill="#FEF08A" filter="drop-shadow(0 0 8px #F59E0B)" />

                        {/* Apple Bobbing Tub on Side */}
                        <g transform="translate(165, 85)">
                            <ellipse cx="25" cy="15" rx="22" ry="7" fill="#0284C7" />
                            <rect x="3" y="15" width="44" height="22" fill="#64748B" />
                            <ellipse cx="25" cy="37" rx="22" ry="7" fill="#475569" />
                            {/* Floating Red Apples */}
                            <circle cx="18" cy="14" r="5" fill="#EF4444" />
                            <circle cx="30" cy="16" r="4.5" fill="#EF4444" />
                            <circle cx="24" cy="12" r="4" fill="#22C55E" />
                        </g>

                        {/* Spiced Cider Mug */}
                        <g transform="translate(45, 95)">
                            <rect x="0" y="5" width="16" height="24" rx="2" fill="#D97706" />
                            <path d="M16,10 Q24,10 24,17 Q24,24 16,24" fill="none" stroke="#D97706" strokeWidth="2.5" />
                            {/* Cinnamon stick */}
                            <line x1="8" y1="5" x2="14" y2="-5" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
                        </g>
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-orange-300/80 uppercase">
                        Autumn Gathering & Feast
                    </div>
                </div>
            );

        case "park":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-[#0a1815] to-[#040e0c] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]">
                        {/* Rolling Park Lawn */}
                        <path d="M0,140 Q60,115 120,125 Q180,110 240,140 Z" fill="#064E3B" />

                        {/* Ancient Whispering Willow Tree */}
                        <path d="M120,130 Q118,90 120,70" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
                        {/* Gnarled Willow Boughs */}
                        <path d="M120,75 Q90,60 65,85" stroke="#78350F" strokeWidth="6" fill="none" />
                        <path d="M120,75 Q150,55 175,80" stroke="#78350F" strokeWidth="6" fill="none" />
                        <path d="M120,70 Q120,40 135,35" stroke="#78350F" strokeWidth="5" fill="none" />

                        {/* Cascading Willow Foliage (Golden-Orange Autumn Leaves) */}
                        <ellipse cx="65" cy="85" rx="30" ry="20" fill="#047857" opacity="0.8" />
                        <ellipse cx="175" cy="80" rx="30" ry="20" fill="#047857" opacity="0.8" />
                        <ellipse cx="120" cy="50" rx="40" ry="25" fill="#059669" opacity="0.8" />

                        {/* Hanging Blown-Glass Lanterns from the Branches */}
                        <line x1="80" y1="85" x2="80" y2="105" stroke="#E2E8F0" strokeWidth="1" />
                        <circle cx="80" cy="108" r="4.5" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />

                        <line x1="160" y1="80" x2="160" y2="102" stroke="#E2E8F0" strokeWidth="1" />
                        <circle cx="160" cy="105" r="4.5" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />

                        {/* Park Wooden Signboard */}
                        <g transform="translate(18, 95)">
                            <line x1="10" y1="20" x2="10" y2="40" stroke="#475569" strokeWidth="2.5" />
                            <line x1="30" y1="20" x2="30" y2="40" stroke="#475569" strokeWidth="2.5" />
                            <rect x="0" y="5" width="40" height="20" rx="2" fill="#78350F" stroke="#B45309" strokeWidth="1" />
                            <line x1="5" y1="11" x2="35" y2="11" stroke="#FEF3C7" strokeWidth="1.5" />
                            <line x1="10" y1="18" x2="30" y2="18" stroke="#FEF3C7" strokeWidth="1.5" />
                        </g>
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-emerald-300/80 uppercase">
                        Civic Space & Games
                    </div>
                </div>
            );

        case "candy":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-950/40 via-[#18110b] to-[#0a0705] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent" />
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_12px_rgba(251,191,36,0.4)]">
                        {/* Giant Tricolor Candy Corn in Center */}
                        <g transform="translate(100, 30)">
                            {/* Base Yellow */}
                            <path d="M5,75 L35,75 L30,50 L10,50 Z" fill="#FACC15" />
                            {/* Middle Orange */}
                            <path d="M10,50 L30,50 L26,25 L14,25 Z" fill="#EA580C" />
                            {/* Tip White */}
                            <path d="M14,25 L26,25 Q20,10 14,25 Z" fill="#FFFFFF" />
                        </g>

                        {/* Swirl Lollipop */}
                        <g transform="translate(30, 25)">
                            <line x1="30" y1="65" x2="30" y2="110" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="30" cy="45" r="22" fill="#FF7518" />
                            {/* Concentric rings */}
                            <circle cx="30" cy="45" r="16" fill="#FEF08A" />
                            <circle cx="30" cy="45" r="10" fill="#9333EA" />
                            <circle cx="30" cy="45" r="4" fill="#FFFFFF" />
                        </g>

                        {/* Wrapped Vintage Hard Toffee */}
                        <g transform="translate(160, 50)">
                            <rect x="15" y="20" width="30" height="20" rx="6" fill="#A855F7" />
                            {/* Wrapper twists */}
                            <polygon points="15,22 0,15 0,35 15,28" fill="#C084FC" />
                            <polygon points="45,22 60,15 60,35 45,28" fill="#C084FC" />
                        </g>

                        {/* Chocolate Bar with Wrapper Peeled Back */}
                        <g transform="translate(145, 90)">
                            <rect x="0" y="0" width="45" height="24" rx="2" fill="#451A03" />
                            <rect x="0" y="8" width="45" height="16" rx="2" fill="#B45309" stroke="#FDE047" strokeWidth="1" />
                            <line x1="15" y1="0" x2="15" y2="8" stroke="#78350F" strokeWidth="1" />
                            <line x1="30" y1="0" x2="30" y2="8" stroke="#78350F" strokeWidth="1" />
                        </g>

                        {/* Teal Pumpkin Badge (Allergy Safety) */}
                        <g transform="translate(70, 95) scale(0.6)">
                            <ellipse cx="25" cy="20" rx="18" ry="14" fill="#2DD4BF" />
                            <path d="M25,6 L27,2" stroke="#0F766E" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="25" cy="20" r="3" fill="#FFFFFF" />
                        </g>
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-amber-300/80 uppercase">
                        Sweets & Confections
                    </div>
                </div>
            );

        case "world":
            return (
                <div className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-sky-500/30 bg-gradient-to-b from-sky-950/40 via-[#0a121d] to-[#040810] shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent" />
                    <svg viewBox="0 0 240 140" className="relative h-32 w-auto drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                        {/* World Globe Outline */}
                        <circle cx="120" cy="70" r="42" fill="#0C1E34" stroke="#0284C7" strokeWidth="1.5" />
                        <ellipse cx="120" cy="70" rx="24" ry="42" fill="none" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="78" y1="70" x2="162" y2="70" stroke="#0284C7" strokeWidth="1" strokeDasharray="3 3" />

                        {/* Día de los Muertos Sugar Skull (Calavera) & Marigold */}
                        <g transform="translate(30, 40)">
                            {/* Sugar Skull */}
                            <path
                                d="M15,5 Q30,5 30,22 Q30,30 25,32 L25,40 Q25,44 15,44 Q5,44 5,40 L5,32 Q0,30 0,22 Q0,5 15,5 Z"
                                fill="#F8FAFC"
                                stroke="#FB7185"
                                strokeWidth="1.5"
                                filter="drop-shadow(0 0 6px #F43F5E)"
                            />
                            {/* Flower eyes */}
                            <circle cx="10" cy="18" r="4" fill="#38BDF8" />
                            <circle cx="20" cy="18" r="4" fill="#38BDF8" />
                            {/* Heart nose */}
                            <polygon points="15,27 12,24 18,24" fill="#F43F5E" />
                            {/* Smile */}
                            <line x1="8" y1="36" x2="22" y2="36" stroke="#475569" strokeWidth="1.5" />
                            <line x1="11" y1="33" x2="11" y2="39" stroke="#475569" strokeWidth="1" />
                            <line x1="15" y1="33" x2="15" y2="39" stroke="#475569" strokeWidth="1" />
                            <line x1="19" y1="33" x2="19" y2="39" stroke="#475569" strokeWidth="1" />

                            {/* Golden Cempasúchil (Marigold) Flower */}
                            <circle cx="35" cy="42" r="7" fill="#F59E0B" />
                            <circle cx="35" cy="42" r="4" fill="#EA580C" />
                        </g>

                        {/* East Asian Floating Water Lantern */}
                        <g transform="translate(175, 45)">
                            {/* Floating Wooden Base */}
                            <polygon points="0,35 30,35 35,42 -5,42" fill="#78350F" />
                            {/* Paper Lantern Box */}
                            <rect x="3" y="15" width="24" height="20" fill="#FEF3C7" stroke="#EA580C" strokeWidth="1" />
                            {/* Candle Glow inside */}
                            <circle cx="15" cy="25" r="5" fill="#FDE047" filter="drop-shadow(0 0 6px #F59E0B)" />
                            {/* Water ripples */}
                            <ellipse cx="15" cy="44" rx="20" ry="3" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.7" />
                        </g>

                        {/* Celtic All Saints' Remembrance Candle */}
                        <g transform="translate(112, 100)">
                            <rect x="5" y="10" width="6" height="18" fill="#F1F5F9" />
                            <ellipse cx="8" cy="8" rx="2" ry="4" fill="#FDE047" filter="drop-shadow(0 0 4px #F59E0B)" />
                        </g>
                    </svg>

                    <div className="absolute bottom-2 right-3 text-[10px] font-semibold tracking-wider text-sky-300/80 uppercase">
                        Global Heritage & Remembrance
                    </div>
                </div>
            );
    }
}
