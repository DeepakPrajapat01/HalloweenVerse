import { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
    narrow?: boolean;
}

/**
 * Consistent page-content wrapper.
 * Handles max-width, horizontal padding, and vertical spacing.
 */
export default function PageWrapper({ children, className = "", narrow = false }: PageWrapperProps) {
    return (
        <div
            className={`container-hv pb-20 ${className}`}
            style={{ maxWidth: narrow ? "800px" : undefined }}
        >
            {children}
        </div>
    );
}
