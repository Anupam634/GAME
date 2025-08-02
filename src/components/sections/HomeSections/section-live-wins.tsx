"use client";
import { useEffect, useState } from "react";
import GameWinCard from "../../GameWinCard";

interface WinCard {
    amount: number;
    image: string;
    id: string;
}

const generateRandomId = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    const id = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return `${id.slice(0, 2)}...${id.slice(-4)}`;
};

const generateRandomAmount = () => {
    return Number((Math.random() * 100).toFixed(2));
};

const generateCards = () => {
    return Array.from({ length: 15 }, (_, index) => ({
        amount: generateRandomAmount(),
        image: `https://picsum.photos/seed/${index}/220/120`,
        id: generateRandomId(),
    }));
};

const LiveWinsSection = () => {
    const [winCards, setWinCards] = useState<WinCard[]>([]);

    useEffect(() => {
        setWinCards(generateCards());
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setWinCards(generateCards());
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex z-0">
            {/* Decorative spots */}
            <div className="absolute top-0 right-[25%] w-48 h-48 bg-neon-pink/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-[20%] w-56 h-56 bg-purple/10 rounded-full filter blur-3xl"></div>

            <section className="w-full glass rounded-2xl p-6 mx-auto max-w-[1440px] border border-purple/20 relative overflow-hidden">
                {/* Inner glass effect spots */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-neon-pink/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple/5 rounded-full filter blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-neon-pink"></div>
                        <h2 className="text-light text-xl font-semibold">Live Wins</h2>
                    </div>

                    <div className="relative overflow-x-hidden">
                        <div className="flex gap-3 min-w-max pb-4">
                            {winCards.map((card, index) => (
                                <GameWinCard key={`${card.id}-${index}`} amount={card.amount} image={card.image} id={card.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LiveWinsSection;
