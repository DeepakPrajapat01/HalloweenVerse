/**
 * Centralized Navigation and Feature Availability Configuration
 *
 * Controls public-facing navigation and route visibility across HalloweenVerse.
 * Only 'active' routes are exposed in the navigation and accessible to visitors.
 * 'in-development' features remain in the codebase for future phases but are
 * hidden from the public website to keep the experience polished and complete.
 */

export interface NavLinkItem {
    label: string;
    href: string;
    description?: string;
}

export interface NavCategory {
    title: string;
    links: NavLinkItem[];
}

export interface RouteConfig {
    path: string;
    label: string;
    category: "Explore" | "Play" | "Discover";
    status: "active" | "in-development";
    description?: string;
}

/** Complete catalog of project routes and their current implementation status */
export const APP_ROUTES: RouteConfig[] = [
    // Fully implemented, production-ready experiences
    {
        path: "/",
        label: "Home",
        category: "Explore",
        status: "active",
        description: "Cinematic HalloweenVerse homepage",
    },
    {
        path: "/explore",
        label: "3D World",
        category: "Explore",
        status: "active",
        description: "Interactive 3D Halloween neighborhood experience",
    },

    // In-development features (preserved in codebase, hidden from public navigation)
    {
        path: "/discover",
        label: "Guide",
        category: "Explore",
        status: "in-development",
        description: "Educational Halloween guide",
    },
    {
        path: "/celebrate",
        label: "Celebrate",
        category: "Explore",
        status: "in-development",
        description: "Celebration planner preview",
    },
    {
        path: "/costumes",
        label: "Costumes",
        category: "Explore",
        status: "in-development",
        description: "DIY costume ideas",
    },
    {
        path: "/games",
        label: "Games Hub",
        category: "Play",
        status: "in-development",
        description: "Browser games hub",
    },
    {
        path: "/events",
        label: "Events",
        category: "Discover",
        status: "in-development",
        description: "Sample event listings",
    },
    {
        path: "/about",
        label: "About",
        category: "Discover",
        status: "in-development",
        description: "About HalloweenVerse",
    },
];

/** Filter to only implemented, active routes */
export const ACTIVE_ROUTES = APP_ROUTES.filter((r) => r.status === "active");

/** Filter to in-development routes that should not be publicly advertised */
export const IN_DEVELOPMENT_ROUTES = APP_ROUTES.filter((r) => r.status === "in-development");

/**
 * Returns categories that contain at least one active, working destination.
 * If all routes in a category are in development, that category is omitted.
 */
export function getActiveNavigationCategories(): NavCategory[] {
    const categoriesMap = new Map<string, NavLinkItem[]>();

    for (const route of ACTIVE_ROUTES) {
        // Omit homepage from link list (the logo/brand links to homepage)
        if (route.path === "/") continue;

        if (!categoriesMap.has(route.category)) {
            categoriesMap.set(route.category, []);
        }
        categoriesMap.get(route.category)!.push({
            label: route.label,
            href: route.path,
            description: route.description,
        });
    }

    return Array.from(categoriesMap.entries()).map(([title, links]) => ({
        title,
        links,
    }));
}
