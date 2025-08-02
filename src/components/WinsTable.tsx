import React from "react";

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
    multiplier: string;
    currency: string;
    payout: string;
}

interface WinsTableProps {
    data: WinRow[];
}

const WinsTable: React.FC<WinsTableProps> = ({ data }) => {
    const tableHeaders = ["User", "Game", "Time", "Bet", "Multiplier", "Payout"];
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-soft/10 text-soft">
                        {tableHeaders.map((header, index) => (
                            <th key={index} className="text-left py-4 px-4 text-sm font-medium ">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-12 text-soft">
                                No data found for this category.
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr key={idx} className="border-b border-soft/10 hover:bg-soft/5 transition-colors text-sm">
                                <td className="py-4 px-4 min-w-[150px]">
                                    <div className="flex items-center gap-3">
                                        <img src={row.user.icon} alt="user" className="w-8 h-8 rounded-full" />
                                        <span className=" text-soft font-medium">
                                            {row.user.address.slice(0, 6)}...{row.user.address.slice(-4)}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 min-w-[100px]">
                                    <div className="flex items-center gap-3">
                                        <img src={row.game.image} alt={row.game.name} className="w-8 h-8 rounded-lg" />
                                        <span className=" text-soft md:text-base">{row.game.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4  text-soft min-w-[100px]">{row.time} ago</td>
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-light">{row.bet}</span>
                                        <img src="/icons/solana.svg" alt="SOL" className="w-4 h-4" />
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className=" font-medium text-light">{row.multiplier}x</span>
                                </td>
                                <td className="py-4 px-4 min-w-[150px]">
                                    <span className=" font-semibold text-[#00FF20]">$ {row.payout}</span>

                                    <span className=" font-semibold text-[#00FF20]"> {row.currency}</span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default WinsTable;
