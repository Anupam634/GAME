"use client";

import { useState } from "react";
import AddFundsPopup from "./AddFundsPopup";

interface AddFundsStepProps {
    selectedWallet: string | null;
    onBack: () => void;
    onComplete: () => void;
}

const AddFundsStep = ({ selectedWallet, onBack, onComplete }: AddFundsStepProps) => {
    const [showAddFundsPopup, setShowAddFundsPopup] = useState(false);

    const handleAddFundsClick = () => {
        setShowAddFundsPopup(true);
    };

    const handlePopupClose = () => {
        setShowAddFundsPopup(false);
    };

    const handleFundsAdded = () => {
        setShowAddFundsPopup(false);
        // TODO: Add actual funds added logic here
        onComplete();
    };

    return (
        <>
            <div className="h-full">
                <div className="flex flex-col md:flex-row gap-6 h-full">
                    <div className="md:w-1/2 h-[200px] md:h-full flex justify-center">
                        <div className="w-full h-full glass-dark rounded-2xl flex items-center justify-center border border-purple/30 relative overflow-hidden">
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl mb-2">💰</div>
                                <div className="text-soft text-sm">Add Funds Illustration</div>
                            </div>
                        </div>
                    </div>
                    {/* Description */}
                    <div className="md:w-1/2 flex flex-col gap-4 md:gap-6 py-1">
                        <div className="mb-4 md:mb-8 h-full flex flex-col items-start gap-4 md:gap-6 text-left">
                            <div>
                                <h4 className="text-neon-pink text-sm md:text-md mb-1 font-bold">Step 3 of 3</h4>
                                <h2 className="text-2xl md:text-4xl font-bold text-light">ADD FUNDS</h2>
                            </div>
                            <p className="text-soft w-full md:w-[90%] text-sm md:text-base">Add funds to your smart vault to start playing. You maintain full control over your funds at all times.</p>
                            {/* Features list */}
                            <div className="space-y-4 md:space-y-6 w-full">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-md flex items-center justify-center">
                                        <span className="text-neon-pink text-lg md:text-xl">🔒</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-light font-medium text-sm md:text-base">Secure on-chain</span>
                                        <span className="text-light font-medium text-sm md:text-base">transactions</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-md flex items-center justify-center">
                                        <span className="text-neon-pink text-lg md:text-xl">⚡</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-light font-medium text-sm md:text-base">Multiple token</span>
                                        <span className="text-light font-medium text-sm md:text-base">support</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-md flex items-center justify-center">
                                        <span className="text-neon-pink text-lg md:text-xl">🔄</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-light font-medium text-sm md:text-base">Cross-chain swap</span>
                                        <span className="text-light font-medium text-sm md:text-base">available</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Action buttons */}
                        <div className="">
                            <button onClick={handleAddFundsClick} className="w-full bg-neon-pink text-light py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-neon-pink/80 hover:cursor-pointer transition-all duration-300">
                                Add Funds
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Funds Popup */}
            {showAddFundsPopup && <AddFundsPopup onClose={handlePopupClose} onFundsAdded={handleFundsAdded} />}
        </>
    );
};

export default AddFundsStep;
