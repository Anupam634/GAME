"use client";

import React, { useState } from "react";

const PlinkoPage = () => {
    const [betAmount, setBetAmount] = useState(1);
    const [riskLevel, setRiskLevel] = useState("Easy");
    const [rows, setRows] = useState(8);
    const [balls, setBalls] = useState(1);

    const riskLevels = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];
    const [riskIndex, setRiskIndex] = useState(2); // default: "Medium"
    const multipliers = ["5.6x", "3x", "1.2x", "0.8x", "0.5x", "0.8x", "1.2x", "3x", "5.6x"];

    return (
        <div className="min-h-screen bg-background pt-10">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col-reverse lg:flex-row gap-4">
                    {/* Left Control Panel */}
                    <div className="lg:w-72 space-y-4">
                        {/* Bet Amount Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Bet Amount</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-soft text-sm">$</span>
                                    <input type="number" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-light focus:border-neon-pink focus:outline-none" min="0.01" step="0.01" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setBetAmount(betAmount / 2)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors">
                                        ÷2
                                    </button>
                                    <button onClick={() => setBetAmount(betAmount * 2)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors">
                                        ×2
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Risk Level Section (Slider) */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Risk Level</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs text-soft px-1">
                                    {riskLevels.map((level, idx) => (
                                        <span key={idx} className={idx === riskIndex ? "text-light font-bold" : ""}>
                                            {level}
                                        </span>
                                    ))}
                                </div>
                                <input type="range" min={0} max={4} step={1} value={riskIndex} onChange={(e) => setRiskIndex(Number(e.target.value))} className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider" />
                            </div>
                        </div>

                        {/* Rows Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Rows</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-soft">{rows}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setRows(Math.max(8, rows - 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors">
                                            -
                                        </button>
                                        <button onClick={() => setRows(Math.min(16, rows + 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <input type="range" min="8" max="16" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider" />
                            </div>
                        </div>

                        {/* Balls Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Balls</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-soft">{balls}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setBalls(Math.max(1, balls - 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors">
                                            -
                                        </button>
                                        <button onClick={() => setBalls(Math.min(100, balls + 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <input type="range" min="1" max="100" value={balls} onChange={(e) => setBalls(Number(e.target.value))} className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider" />
                            </div>
                        </div>

                        {/* Drop Ball Button */}
                        <button className="w-full bg-neon-pink text-light px-4 py-3 rounded-xl font-bold text-base hover:shadow-glow transition-all duration-300 transform hover:scale-105">
                            Drop {balls} Ball{balls > 1 ? "s" : ""}
                        </button>
                        <button className="w-full bg-purple text-light px-4 py-3 rounded-xl font-bold text-base hover:shadow-glow transition-all duration-300 transform hover:scale-105">Cash Out</button>
                    </div>

                    {/* Main Game Area */}
                    <div className="flex-1">
                        <div className="glass rounded-xl border border-purple/20 h-[600px] relative overflow-hidden">
                            {/* Game Area Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-pink/20 to-purple/20 rounded-full flex items-center justify-center border border-purple/30">
                                        <span className="text-4xl">🎯</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-light">Plinko Game</h3>
                                    <p className="text-soft">Game area will be implemented here</p>
                                </div>
                            </div>

                            {/* Multiplier Display at Bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                                <div className="flex justify-center gap-1 flex-wrap sm:flex-nowrap">
                                    {multipliers.map((multiplier, index) => (
                                        <div
                                            key={index}
                                            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-bold ${
                                                index === 0 || index === multipliers.length - 1
                                                    ? "bg-neon-pink text-light"
                                                    : index === 1 || index === multipliers.length - 2
                                                    ? "bg-purple text-light"
                                                    : index === 2 || index === multipliers.length - 3
                                                    ? "bg-purple/70 text-light"
                                                    : "bg-background-secondary text-soft"
                                            }`}
                                        >
                                            {multiplier}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: var(--color-neon-pink);
                    cursor: pointer;
                    box-shadow: 0 0 8px rgba(255, 77, 143, 0.5);
                }

                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: var(--color-neon-pink);
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 0 8px rgba(255, 77, 143, 0.5);
                }
            `}</style>
        </div>
    );
};

export default PlinkoPage;
