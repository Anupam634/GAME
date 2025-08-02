"use client";

import React, { useState } from "react";

const MinesPage = () => {
    const [betAmount, setBetAmount] = useState(1);
    const [gridSize, setGridSize] = useState("5x5");
    const [minesCount, setMinesCount] = useState(5);
    const [isPlaying, setIsPlaying] = useState(false);

    const gridSizes = ["3x3", "5x5", "7x7", "9x9"];

    // Calculate max mines based on grid size
    const getMaxMines = (size: string) => {
        const [rows, cols] = size.split("x").map(Number);
        return Math.floor(rows * cols * 0.8); // Max 80% of grid can be mines
    };

    const maxMines = getMaxMines(gridSize);

    const onStartGame = () => {
        setIsPlaying(true);
    };

    const onCashOut = () => {
        setIsPlaying(false);
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

                        {/* Grid Size Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Grid Size</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {gridSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setGridSize(size);
                                            // Reset mines count if it exceeds new max
                                            const newMaxMines = getMaxMines(size);
                                            if (minesCount > newMaxMines) {
                                                setMinesCount(Math.floor(newMaxMines / 2));
                                            }
                                        }}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${gridSize === size ? "bg-neon-pink text-light shadow-glow" : "bg-background-secondary border border-purple/30 text-soft hover:border-purple/50"}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mines Count Section */}
                        <div className="glass rounded-xl p-4 border border-purple/20">
                            <h3 className="text-light text-base font-bold mb-3">Mines Count</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-soft">Mines</span>
                                    <span className="text-light font-bold">{minesCount}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setMinesCount(Math.max(1, minesCount - 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors">
                                        -
                                    </button>
                                    <div className="flex-1 px-2">
                                        <input type="range" min="1" max={maxMines} value={minesCount} onChange={(e) => setMinesCount(Number(e.target.value))} className="w-full h-2 bg-background-secondary rounded-lg appearance-none cursor-pointer slider" />
                                    </div>
                                    <button onClick={() => setMinesCount(Math.min(maxMines, minesCount + 1))} className="w-8 h-8 bg-background-secondary border border-purple/30 rounded text-soft hover:border-purple/50 transition-colors">
                                        +
                                    </button>
                                </div>
                                <div className="text-xs text-soft text-center">Max: {maxMines} mines</div>
                            </div>
                        </div>

                        {/* Game Stats */}
                        {/* <div className="glass-dark rounded-xl p-6 border border-purple/20">
                            <h3 className="text-light text-lg font-bold mb-4">Game Info</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-soft">Grid:</span>
                                    <span className="text-light">{gridSize}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Mines:</span>
                                    <span className="text-light">{minesCount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-soft">Safe Tiles:</span>
                                    <span className="text-light">
                                        {getMaxMines(gridSize) +
                                            (gridSize
                                                .split("x")
                                                .map(Number)
                                                .reduce((a, b) => a * b) -
                                                getMaxMines(gridSize)) -
                                            minesCount}
                                    </span>
                                </div>
                            </div>
                        </div> */}

                        {/* Start Game Button */}
                        {isPlaying ? (
                            <button className="w-full bg-purple text-light px-4 py-3 rounded-xl font-bold text-base hover:shadow-glow" onClick={onCashOut}>
                                Cash Out
                            </button>
                        ) : (
                            <button className="w-full bg-neon-pink text-light px-4 py-3 rounded-xl font-bold text-base hover:shadow-glow" onClick={onStartGame}>
                                Start Game
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
                                        <span className="text-4xl">💣</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-light">Mines Game</h3>
                                    <p className="text-soft">Game area will be implemented here</p>
                                    <div className="text-sm text-soft space-y-1">
                                        <p>Grid: {gridSize}</p>
                                        <p>Mines: {minesCount}</p>
                                        <p>Bet: ${betAmount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Future: Game Grid will be rendered here */}
                            <div className="absolute inset-4 border-2 border-dashed border-purple/20 rounded-lg flex items-center justify-center">
                                <span className="text-purple/40 text-sm">Game Grid Placeholder</span>
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

export default MinesPage;
