"use client";
import Image from "next/image";

interface GameWinCardProps {
    amount: number;
    image: string;
    id: string;
}

const GameWinCard = ({ amount, image, id }: GameWinCardProps) => {
    return (
        <div className="flex flex-col items-center relative">
            <div className="w-[100px] space-y-2">
                <div className="relative w-full h-[100px] rounded-lg overflow-hidden glass-card shadow-glow">
                    <Image src={image} alt="Game win" width={100} height={100} className="object-cover w-full h-full" />
                </div>
                <div className="px-1 flex flex-col items-center">
                    <div className="text-neon-pink font-bold text-lg">${amount.toFixed(2)}</div>
                    <div className="text-soft text-[11px]">{id}</div>
                </div>
            </div>
        </div>
    );
};

export default GameWinCard;
