"use client";
import Image from "next/image";
import { useState } from "react";
import { Play, Star, Users } from "lucide-react";
import Link from "next/link";

interface GameCardProps {
    title: string;
    image: string;
    category: string;
    isPopular?: boolean;
    onlineCount?: number;
    path: string;
}

const GameCard = ({ title, image, category, isPopular = false, onlineCount = 0, path }: GameCardProps) => {
    // Format player count to be more readable (e.g., 1.5k instead of 1500)
    const formatPlayerCount = (count: number) => {
        if (count >= 1000000) {
            return `${(count / 1000000).toFixed(1)}M`;
        }
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };

    return (
        <div className="relative group cursor-pointer">
            {/* Card Container */}
            <div className="relative w-full h-[280px] rounded-2xl overflow-hidden">
                {/* Background Image */}
                <Image src={image} alt={title} width={400} height={280} className="object-cover w-full h-full" />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/90" />

                {/* Badges Container */}
                <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
                    {/* Popular Badge */}
                    {isPopular && (
                        <div className="flex items-center gap-1 bg-black/50 rounded-full py-1.5 px-3">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-xs font-medium">Popular</span>
                        </div>
                    )}

                    {/* Online Count */}
                    {onlineCount > 0 && (
                        <div className="flex items-center gap-1.5 bg-black/50 rounded-full py-1.5 px-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-white text-xs font-medium">{formatPlayerCount(onlineCount)}</span>
                        </div>
                    )}
                </div>

                {/* Content Container */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-5">
                    {/* Title */}
                    <h3 className="text-white font-bold text-xl mb-3">{title}</h3>

                    {/* Play Button */}
                    <Link
                        className="
                        w-full bg-neon-pink/80 hover:bg-neon-pink 
                        text-white font-medium py-2.5 rounded-xl
                        flex items-center justify-center gap-2
                        transition-colors duration-300
                    "
                        href={path}
                    >
                        <Play size={18} className="fill-white" />
                        <span>Play Now</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
