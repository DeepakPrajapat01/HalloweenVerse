"use client";

import { useState, useEffect } from "react";

/** Detects prefers-reduced-motion media query */
export function useReducedMotion(): boolean {
    const [prefers, setPrefers] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefers(mq.matches);
        const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return prefers;
}

/** Simple mobile/low-power detection */
export function useIsMobile(): boolean {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        const check = () => {
            const narrow = window.innerWidth < 640;
            const lowCores = (navigator.hardwareConcurrency ?? 4) < 4;
            setMobile(narrow || lowCores);
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    return mobile;
}
