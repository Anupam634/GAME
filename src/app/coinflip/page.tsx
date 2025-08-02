"use client";

import React, { useState } from "react";

const CoinflipPage = () => {
    const [betAmount, setBetAmount] = useState(1);
    const [pickedSide, setPickedSide] = useState("heads");
    const [numberOfCoins, setNumberOfCoins] = useState(1);
    const [minimumToWin, setMinimumToWin] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    // Update minimum to win when number of coins changes
    const handleCoinsChange = (newCoins: number) => {
        setNumberOfCoins(newCoins);
        // Ensure minimum to win doesn't exceed number of coins
        if (minimumToWin > newCoins) {
            setMinimumToWin(newCoins);
        }
    };

    const onStartGame = () => {
        setIsPlaying(true);
    };

    const onCashOut = () => {
        setIsPlaying(false);
    };

    // Calculate win probability
    const calculateWinProbability = (): number => {
        if (numberOfCoins === 1) return 50;

        let probability = 0;
        for (let i = minimumToWin; i <= numberOfCoins; i++) {
            const combinations = factorial(numberOfCoins) / (factorial(i) * factorial(numberOfCoins - i));
            probability += combinations;
        }
        return (probability / Math.pow(2, numberOfCoins)) * 100;
    };

    const factorial = (n: number): number => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    };

    // Calculate potential payout based on probability
    const calculatePayout = () => {
        const winProb = calculateWinProbability() / 100;
        const multiplier = 0.95 / winProb; // 95% RTP
        return (betAmount * multiplier).toFixed(2);
    };

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
                                        disabled={isPlaying}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setBetAmount(betAmount / 2)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying}>
                                        ÷2
                                    </button>
                                    <button onClick={() => setBetAmount(betAmount * 2)} className="flex-1 bg-background-secondary border border-purple/30 rounded-lg px-3 py-2 text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying}>
                                        ×2
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Pick Side Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Pick Side</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setPickedSide("heads")}
                                    className={`p-3 rounded-lg font-medium transition-all flex flex-col items-center gap-2 ${pickedSide === "heads" ? "bg-neon-pink text-light shadow-glow" : "bg-background-secondary border border-purple/30 text-soft hover:border-purple/50"}`}
                                    disabled={isPlaying}
                                >
                                    <span className="text-xl">🪙</span>
                                    {/* <span className="text-sm">Heads</span> */}
                                </button>
                                <button
                                    onClick={() => setPickedSide("tails")}
                                    className={`p-3 rounded-lg font-medium transition-all flex flex-col items-center gap-2 ${pickedSide === "tails" ? "bg-neon-pink text-light shadow-glow" : "bg-background-secondary border border-purple/30 text-soft hover:border-purple/50"}`}
                                    disabled={isPlaying}
                                >
                                    <span className="text-xl">🔄</span>
                                    {/* <span className="text-sm">Tails</span> */}
                                </button>
                            </div>
                        </div>

                        {/* Number of Coins Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-light text-base font-bold">Number of Coins</h3>
                                <span className="text-light font-bold">{numberOfCoins}</span>
                            </div>
                            <div className="space-y-3">
                                {/* <div className="flex items-center justify-between">
                                    <span className="text-soft">Coins</span>
                                </div> */}
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleCoinsChange(Math.max(1, numberOfCoins - 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying}>
                                        -
                                    </button>
                                    <div className="flex-1 px-2">
                                        <input type="range" min="1" max="10" value={numberOfCoins} onChange={(e) => handleCoinsChange(Number(e.target.value))} className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider" disabled={isPlaying} />
                                    </div>
                                    <button onClick={() => handleCoinsChange(Math.min(10, numberOfCoins + 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying}>
                                        +
                                    </button>
                                </div>
                                <div className="text-xs text-soft text-center">Max: 10 coins</div>
                            </div>
                        </div>

                        {/* Minimum to Win Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Minimum to Win</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-soft">Min {pickedSide}</span>
                                    <span className="text-light font-bold">{minimumToWin}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setMinimumToWin(Math.max(1, minimumToWin - 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying}>
                                        -
                                    </button>
                                    <div className="flex-1 px-2">
                                        <input type="range" min="1" max={numberOfCoins} value={minimumToWin} onChange={(e) => setMinimumToWin(Number(e.target.value))} className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider" disabled={isPlaying} />
                                    </div>
                                    <button onClick={() => setMinimumToWin(Math.min(numberOfCoins, minimumToWin + 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors disabled:opacity-50" disabled={isPlaying}>
                                        +
                                    </button>
                                </div>
                                <div className="text-xs text-soft text-center">
                                    Need {minimumToWin} out of {numberOfCoins} {pickedSide} to win
                                </div>
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
                                    <span className="text-soft">Side:</span>
                                    <span className="text-light capitalize">{pickedSide}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Coins:</span>
                                    <span className="text-light">{numberOfCoins}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Min to Win:</span>
                                    <span className="text-light">{minimumToWin}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Win Chance:</span>
                                    <span className="text-neon-pink">{calculateWinProbability()}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Potential Win:</span>
                                    <span className="text-neon-pink">${calculatePayout()}</span>
                                </div>
                            </div>
                        </div> */}

                        {/* Game Control Button */}
                        {isPlaying ? (
                            <button onClick={onCashOut} className="w-full bg-purple text-light px-4 py-3 rounded-xl font-bold text-base hover:shadow-glow">
                                Cash Out
                            </button>
                        ) : (
                            <button onClick={onStartGame} className="w-full bg-neon-pink text-light px-4 py-3 rounded-xl font-bold text-base hover:shadow-glow">
                                Flip Coin{numberOfCoins > 1 ? "s" : ""}
                            </button>
                        )}
                    </div>

                    {/* Main Game Area */}
                    <div className="flex-1">
                        <div className="glass rounded-xl border border-purple/20 h-[600px] relative overflow-hidden">
                            {/* Game Area Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-neon-pink/20 to-purple/20 rounded-full flex items-center justify-center border border-purple/30">
                                        <span className="text-4xl">🪙</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-light">Coinflip Game</h3>
                                    <p className="text-soft">Game area will be implemented here</p>
                                    <div className="text-sm text-soft space-y-1">
                                        <p>Bet: ${betAmount}</p>
                                        <p>Side: {pickedSide}</p>
                                        <p>Coins: {numberOfCoins}</p>
                                        <p>Min to Win: {minimumToWin}</p>
                                        <p>Win Chance: {calculateWinProbability()}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Future: Coin flip animation will be here */}
                            <div className="absolute inset-4 border-2 border-dashed border-purple/20 rounded-lg flex items-center justify-center">
                                <span className="text-purple/40 text-sm">Coin Flip Animation Placeholder</span>
                            </div>

                            {/* Coins Display (for future use) */}
                            <div className="absolute top-4 right-4 bg-background-secondary/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple/30">
                                <div className="text-center">
                                    <div className="text-lg font-bold text-neon-pink">{numberOfCoins}</div>
                                    <div className="text-xs text-soft">Coin{numberOfCoins > 1 ? "s" : ""}</div>
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

export default CoinflipPage;
