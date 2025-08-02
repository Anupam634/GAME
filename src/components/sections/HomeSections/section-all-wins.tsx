"use client";
import React, { useState } from "react";
import WinsTable from "../../WinsTable";

// Define types
interface User {
    address: string;
    icon: string;
}

interface Game {
    name: string;
    image: string;
}

interface WinRow {
    user: User;
    game: Game;
    time: string;
    bet: string;
    currency: string;
    multiplier: string;
    payout: string;
}

type Category = "Live Wins" | "Big Wins" | "Jackpot Wins";

// Example: This would come from an API as a flat array of all wins, sorted by date (most recent first)
const allWins: WinRow[] = [
    {
        user: {
            address: "3AgdC...X6Nfh",
            icon: "https://picsum.photos/100/100",
        },
        game: {
            name: "Turbo Rush",
            image: "https://picsum.photos/200/300",
        },
        time: "3s",
        bet: "0.20",
        currency: "SOL",
        multiplier: "1.5",
        payout: "0.30",
    },
    {
        user: {
            address: "28rFg...DDgFD",
            icon: "https://picsum.photos/100/100",
        },
        game: {
            name: "Candy Rush",
            image: "https://picsum.photos/200/300",
        },
        time: "4s",
        bet: "5.00",
        currency: "SOL",
        multiplier: "3.0",
        payout: "15.00",
    },
    {
        user: {
            address: "1JkLm...ZZz12",
            icon: "https://picsum.photos/100/100",
        },
        game: {
            name: "Mega Spin",
            image: "https://picsum.photos/200/300",
        },
        time: "10s",
        bet: "50.00",
        currency: "SOL",
        multiplier: "12.0",
        payout: "600.00",
    },
    {
        user: {
            address: "9XyZq...QwErT",
            icon: "https://picsum.photos/100/100",
        },
        game: {
            name: "Jackpot Mania",
            image: "https://picsum.photos/200/300",
        },
        time: "20s",
        bet: "20.00",
        currency: "SOL",
        multiplier: "15.0",
        payout: "300.00",
    },
    {
        user: {
            address: "9XyZq...QwErT",
            icon: "https://picsum.photos/100/100",
        },
        game: {
            name: "Plinko",
            image: "https://picsum.photos/200/300",
        },
        time: "20s",
        bet: "100.00",
        currency: "SOL",
        multiplier: "2.0",
        payout: "200.00",
    },
    {
        user: {
            address: "7UiOp...LkJhG",
            icon: "https://picsum.photos/100/100",
        },
        game: {
            name: "Lucky 7",
            image: "https://picsum.photos/200/300",
        },
        time: "30s",
        bet: "2.00",
        currency: "SOL",
        multiplier: "2.0",
        payout: "4.00",
    },
];

// Categories
const categories: Category[] = ["Live Wins", "Big Wins", "Jackpot Wins"];

// Filtered data for each category
const getCategoryData = (category: Category): WinRow[] => {
    switch (category) {
        case "Live Wins":
            // All wins, sorted by date (assuming already sorted)
            return allWins;
        case "Big Wins":
            // payout > 100
            return allWins.filter((row) => parseFloat(row.payout) > 100);
        case "Jackpot Wins":
            // multiplier > 10
            return allWins.filter((row) => parseFloat(row.multiplier) > 10);
        default:
            return [];
    }
};

const SectionAllWins: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("Live Wins");
    const tableData = getCategoryData(activeCategory);

    return (
        <section className="my-6">
            <div className="w-full glass rounded-2xl p-6 mx-auto max-w-[1440px] border border-purple/20 overflow-hidden">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
                    {categories.map((category) => {
                        const isActive = activeCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 
                  ${isActive ? "bg-soft/20 text-light " : "text-soft hover:text-light hover:bg-soft/10 "}
                `}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Table */}
                <WinsTable data={tableData} />
            </div>
        </section>
    );
};

export default SectionAllWins;
