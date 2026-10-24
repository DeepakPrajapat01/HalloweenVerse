"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Generic hover-aware card wrapper (client component) */
export function HoverLink({
    href,
    className,
    style,
    hoverStyle,
    children,
}: {
    href: string;
    className?: string;
    style?: React.CSSProperties;
    hoverStyle?: React.CSSProperties;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            className={className}
            style={style}
            onMouseEnter={(e) => {
                if (hoverStyle) Object.assign((e.currentTarget as HTMLElement).style, hoverStyle);
            }}
            onMouseLeave={(e) => {
                if (style) Object.assign((e.currentTarget as HTMLElement).style, style);
                else (e.currentTarget as HTMLElement).removeAttribute("style");
            }}
        >
            {children}
        </Link>
    );
}
