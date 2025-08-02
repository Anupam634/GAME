"use client";

import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

interface AddFundsPopupProps {
    onClose: () => void;
    onFundsAdded: () => void;
}

const AddFundsPopup = ({ onClose, onFundsAdded }: AddFundsPopupProps) => {
    const [selectedToken, setSelectedToken] = useState("SOL");
    const [amount, setAmount] = useState("");
    const [maxAmount] = useState("0.09744"); // Available balance

    const tokens = [
        { symbol: "SOL", name: "Solana", icon: "◎" },
        { symbol: "USDC", name: "USD Coin", icon: "💵" },
        { symbol: "ETH", name: "Ethereum", icon: "Ξ" },
        { symbol: "BTC", name: "Bitcoin", icon: "₿" },
    ];

    const crossChainTokens = [
        { symbol: "BTC", icon: "₿" },
        { symbol: "ETH", icon: "Ξ" },
        { symbol: "USDC", icon: "💵" },
        { symbol: "PEPE", icon: "🐸" },
    ];

    const handleMaxClick = () => {
        setAmount(maxAmount);
    };

    const handleAddFunds = () => {
        if (amount && parseFloat(amount) > 0) {
            onFundsAdded();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-background-secondary rounded-2xl p-4 sm:p-6 w-[90%] sm:w-[400px] max-h-[90vh] overflow-y-auto">
                {/* Close button */}

                {/* Header */}
                <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 flex justify-between items-center border-b border-soft/30">
                    <h3 className="text-light text-lg sm:text-xl font-bold">Add Funds</h3>
                    <button onClick={onClose} className="text-soft hover:text-neon-pink hover:cursor-pointer transition-colors">
                        <X size={18} className="sm:w-5 sm:h-5" />
                    </button>
                </div>

                {/* Token Selection */}
                <div className="mb-3 sm:mb-4">
                    <label className="text-soft text-xs sm:text-sm mb-1.5 sm:mb-2 block">Select Token</label>
                    <div className="relative bg-background/40 rounded-lg">
                        <select value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)} className="w-full bg-transparent rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-light appearance-none cursor-pointer hover:border-purple/50 transition-colors">
                            {tokens.map((token) => (
                                <option className="text-light" key={token.symbol} value={token.symbol}>
                                    {token.icon} {token.symbol}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Amount Input */}
                <div className="mb-3 sm:mb-4">
                    <label className="text-soft text-xs sm:text-sm mb-1.5 sm:mb-2 block">Amount to Add</label>
                    <div className="relative bg-background/40 rounded-lg">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-transparent rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-light placeholder-soft hover:border-purple/50 focus:border-neon-pink focus:outline-none transition-colors"
                        />
                        <button onClick={handleMaxClick} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-pink text-xs sm:text-sm font-medium hover:text-neon-pink/80 transition-colors">
                            Max
                        </button>
                    </div>
                    <div className="text-soft text-[10px] sm:text-xs mt-1 px-1">≈${maxAmount} Available</div>
                </div>

                {/* Add Funds Button */}
                <button
                    onClick={handleAddFunds}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="w-full bg-neon-pink text-light py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-neon-pink/90 disabled:bg-neon-pink/50 disabled:cursor-not-allowed transition-all duration-300 mb-3 sm:mb-4"
                >
                    Add Funds
                </button>

                {/* Cross Chain Swap Section */}
                <div className="border-t border-soft/30 pt-3 sm:pt-4">
                    <div className="text-light text-sm sm:text-md font-semibold mb-2 sm:mb-3 px-1">Don't have Tokens on Solana?</div>

                    <div className="bg-background/40 group flex justify-between items-center rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 mb-2 sm:mb-3 hover:bg-background/60 hover:cursor-pointer">
                        <div>
                            <div className="text-light text-sm sm:text-md font-medium">Cross Chain Swap</div>
                            <div className="flex gap-[1px]">
                                {crossChainTokens.map((token, index) => (
                                    <div key={token.symbol} className="flex items-center rounded py-0.5 sm:py-1">
                                        <span className="text-soft text-[10px] sm:text-xs">{token.symbol}</span>
                                        {index !== crossChainTokens.length - 1 ? <span className="text-soft text-[10px] sm:text-xs">,</span> : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {crossChainTokens.map((token) => (
                                <div key={token.symbol} className="flex items-center justify-center p-1.5 sm:p-2 w-5 h-5 sm:w-6 sm:h-6 bg-background-secondary rounded-full">
                                    <span className="text-sm sm:text-md">{token.icon}</span>
                                </div>
                            ))}
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-neon-pink" />
                        </div>
                    </div>

                    <button className="w-full bg-background/40 text-light py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-neon-pink hover:cursor-pointer">Don't Have Crypto?</button>
                </div>
            </div>
        </div>
    );
};

export default AddFundsPopup;
