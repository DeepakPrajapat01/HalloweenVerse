import type { Metadata } from "next";
import ExploreClient from "@/components/neighborhood/ExploreClient";

export const metadata: Metadata = {
    title: "Explore Maple Hollow 3D — HalloweenVerse",
    description:
        "Step into an explorable 3D Halloween neighborhood. Walk the moonlit street, trick-or-treat at 8 haunted houses, join the community party bonfire, and collect seasonal treats.",
};

export default function ExplorePage() {
    return <ExploreClient />;
}
