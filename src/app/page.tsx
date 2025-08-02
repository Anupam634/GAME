import Image from "next/image";
import LiveWinsSection from "@/components/sections/HomeSections/section-live-wins";
import SectionGames from "@/components/sections/HomeSections/section-games";
import SectionHero from "@/components/sections/HomeSections/section-hero";
import SectionAllWins from "@/components/sections/HomeSections/section-all-wins";

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <SectionHero />
            <LiveWinsSection />
            <SectionGames />
            <SectionAllWins />
            {/* Other sections can be added here */}
        </div>
    );
}
