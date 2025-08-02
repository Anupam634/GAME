"use client";

import React, { useEffect, useState } from "react";

const CrashPage = () => {
    const [betAmount, setBetAmount] = useState(1);
    const [multiplier, setMultiplier] = useState(2);
    const [autoMode, setAutoMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const onCashOut = () => {
        setIsPlaying(false);
    };

    // useEffect(() => {
    //     if (isPlaying) {
    //         setIsPlaying(true);
    //     } else {
    //         setIsPlaying(false);
    //     }
    // }, [isPlaying]);

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
                                    <input
                                        type="number"
                                        value={betAmount}
                                        onChange={(e) => setBetAmount(Number(e.target.value))}
                                        className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-light focus:border-neon-pink focus:outline-none"
                                        min="0.01"
                                        step="0.01"
                                        disabled={isPlaying && autoMode}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setBetAmount(betAmount / 2)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying && autoMode}>
                                        ÷2
                                    </button>
                                    <button onClick={() => setBetAmount(betAmount * 2)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying && autoMode}>
                                        ×2
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Multiplier Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-light text-base font-bold">Multiplier</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-soft text-sm">Auto</span>
                                    <button onClick={() => setAutoMode(!autoMode)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoMode ? "bg-neon-pink" : "bg-background-secondary border border-purple/30"}`} disabled={isPlaying}>
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoMode ? "translate-x-6" : "translate-x-1"}`} />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={multiplier}
                                        onChange={(e) => setMultiplier(Number(e.target.value))}
                                        className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-light focus:border-neon-pink focus:outline-none disabled:opacity-50"
                                        min="1.01"
                                        step="0.01"
                                        disabled={!autoMode || (isPlaying && autoMode)}
                                    />
                                    <span className="text-soft text-sm">x</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setMultiplier(1.5)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors text-sm disabled:opacity-50" disabled={!autoMode || (isPlaying && autoMode)}>
                                        1.5x
                                    </button>
                                    <button onClick={() => setMultiplier(2)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors text-sm disabled:opacity-50" disabled={!autoMode || (isPlaying && autoMode)}>
                                        2x
                                    </button>
                                    <button onClick={() => setMultiplier(5)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors text-sm disabled:opacity-50" disabled={!autoMode || (isPlaying && autoMode)}>
                                        5x
                                    </button>
                                </div>
                                <div className="text-xs text-soft">{autoMode ? "Auto-multiplies bet amount on loss" : "Enable auto mode to use multiplier"}</div>
                            </div>
                        </div>

                        {/* Game Stats */}
                        {/* <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Game Info</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-soft">Bet:</span>
                                    <span className="text-light">${betAmount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Multiplier:</span>
                                    <span className="text-light">{multiplier}x</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Potential Win:</span>
                                    <span className="text-neon-pink">${(betAmount * multiplier).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Mode:</span>
                                    <span className={autoMode ? "text-neon-pink" : "text-light"}>{autoMode ? "Auto" : "Manual"}</span>
                                </div>
                            </div>
                        </div> */}

                        {/* Game Control Button */}
                        {!isPlaying ? (
                            <button onClick={() => setIsPlaying(true)} className="w-full bg-neon-pink hover:bg-neon-pink/80 hover:cursor-pointer text-light px-4 py-3 rounded-xl font-bold text-base ">
                                {autoMode ? "Start Auto Betting" : "Place Bet"}
                            </button>
                        ) : (
                            <div className="space-y-2">
                                <button className="w-full bg-purple hover:bg-purple/80 hover:cursor-pointer text-light px-4 py-3 rounded-xl font-bold text-base" onClick={onCashOut}>
                                    Cash Out ({multiplier}x)
                                </button>
                                {autoMode && (
                                    <button onClick={() => setIsPlaying(false)} className="w-full bg-gradient-to-r from-red-500 to-red-600 text-light px-4 py-3 rounded-xl font-bold text-base hover:shadow-glow transition-all duration-300">
                                        Stop Auto Betting
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Main Game Area */}
                    <div className="flex-1">
                        <div className="glass rounded-xl border border-purple/20 h-[600px] relative overflow-hidden">
                            {/* Game Area Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-pink/20 to-purple/20 rounded-full flex items-center justify-center border border-purple/30">
                                        <span className="text-4xl">🚀</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-light">RocketCrash Game</h3>
                                    <p className="text-soft">Game area will be implemented here</p>
                                    <div className="text-sm text-soft space-y-1">
                                        <p>Bet: ${betAmount}</p>
                                        <p>Target: {multiplier}x</p>
                                        <p>Mode: {autoMode ? "Auto" : "Manual"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Future: Rocket animation and multiplier display will be here */}
                            <div className="absolute inset-4 border-2 border-dashed border-purple/20 rounded-lg flex items-center justify-center">
                                <span className="text-purple/40 text-sm">Rocket Game Area Placeholder</span>
                            </div>

                            {/* Current Multiplier Display (for future use) */}
                            <div className="absolute top-4 left-4 bg-background-secondary/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple/30">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-neon-pink">1.00x</div>
                                    <div className="text-xs text-soft">Current Multiplier</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrashPage;
