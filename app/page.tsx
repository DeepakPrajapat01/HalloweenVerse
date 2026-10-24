import type { Metadata } from "next";
import HomePageClient from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "HalloweenVerse — One Night. A Thousand Spooky Stories.",
  description:
    "Step into HalloweenVerse — a cinematic, explorable 3D Halloween neighborhood. Uncover spooky lore, meet the locals, and live the night.",
};

export default function HomePage() {
  return <HomePageClient />;
}
