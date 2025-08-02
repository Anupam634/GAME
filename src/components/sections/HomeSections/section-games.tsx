"use client";
import React from "react";
import FeaturedGameCard from "../../FeaturedGameCard";
import GameStats from "../../GameStats";
import GameCarousel from "../../GameCarousel";
import Link from "next/link";

const FEATURED_GAME = {
    title: "Epic Quest Adventure",
    image: "https://picsum.photos/seed/epicquest/2000/800",
    description: "Embark on an epic journey through magical realms, battle fierce monsters, and discover hidden treasures in this immersive multiplayer adventure game.",
    players: 125780,
};

const POPULAR_GAMES = [
    {
        title: "Crash",
        image: "https://picsum.photos/seed/turborush/1000/620",
        category: "Slots",
        isPopular: true,
        onlineCount: 1234,
        path: "/crash",
    },
    {
        title: "Plinko",
        image: "https://picsum.photos/seed/fruitfiesta/1000/620",
        category: "Plinko",
        onlineCount: 856,
        path: "/plinko",
    },
    {
        title: "Coin Flip",
        image: "https://picsum.photos/seed/shadowblade/1000/620",
        category: "Dice",
        onlineCount: 2100,
        path: "/coinflip",
    },
    {
        title: "Mines",
        image: "https://picsum.photos/seed/mysticgem/1000/620",
        category: "Mines",
        isPopular: true,
        onlineCount: 1567,
        path: "/mines",
    },
    {
        title: "Blackjack",
        image: "https://picsum.photos/seed/buffalofury/1000/620",
        category: "Blackjack",
        onlineCount: 945,
        path: "/",
    },
    {
        title: "Roulette",
        image: "https://picsum.photos/seed/candyplanet/1000/620",
        category: "Roulette",
        onlineCount: 1890,
        path: "/",
    },
    // {
    //     title: "Gates of Zeus",
    //     image: "https://picsum.photos/seed/gatesofzeus/1000/620",
    //     category: "Mythology",
    //     isPopular: true,
    //     onlineCount: 3450,
    // },
];

const SectionGames = () => {
    return (
        <section className="relative my-6">
            {/* Decorative spots */}
            <div className="absolute -top-20 left-[15%] w-60 h-60 bg-purple/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 right-[10%] w-72 h-72 bg-neon-pink/10 rounded-full filter blur-3xl"></div>

            <div className="w-full glass rounded-2xl px-6 pt-6 pb-0 mx-auto max-w-[1440px] border border-purple/20 relative overflow-hidden">
                {/* Inner glass effect spots */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-pink/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple/5 rounded-full filter blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-light text-xl font-semibold">Casino Games</h2>
                        <Link href="/games" className="text-light text-sm font-semibold hover:text-neon-pink transition-colors">
                            View All
                        </Link>
                    </div>
                    {/* Featured Game */}
                    <div className="mb-8">
                        <FeaturedGameCard title={FEATURED_GAME.title} image={FEATURED_GAME.image} description={FEATURED_GAME.description} players={FEATURED_GAME.players} />
                    </div>

                    {/* Popular Games Carousel */}
                    <GameCarousel games={POPULAR_GAMES} title="Popular Games" indicatorColor="var(--color-neon-pink)" />

                    {/* Game Stats */}
                    {/* <GameStats /> */}
                </div>
            </div>
        </section>
    );
};

export default SectionGames;
