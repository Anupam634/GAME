"use client";

interface ActivateVaultStepProps {
    selectedWallet: string | null;
    onBack: () => void;
    onComplete: () => void;
}

const ActivateVaultStep = ({ selectedWallet, onBack, onComplete }: ActivateVaultStepProps) => {
    const handleActivateClick = () => {
        // TODO: Add actual smart vault activation logic here
        // For now, just complete the flow
        onComplete();
    };

    return (
        <div className="h-full">
            <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="md:w-1/2 h-[200px] md:h-full flex justify-center">
                    <div className="w-full h-full glass-dark rounded-2xl flex items-center justify-center border border-purple/30 relative overflow-hidden">
                        <div className="text-center">
                            <div className="text-4xl md:text-6xl mb-2">🔐</div>
                            <div className="text-soft text-sm">Smart Vault Image</div>
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div className="md:w-1/2 flex flex-col gap-4 md:gap-6 py-1">
                    <div className="mb-4 md:mb-8 h-full flex flex-col items-start gap-4 md:gap-6 text-left">
                        <div>
                            <h4 className="text-neon-pink text-sm md:text-md mb-1 font-bold">Step 2 of 3</h4>
                            <h2 className="text-2xl md:text-4xl font-bold text-light">ACTIVATE SMART VAULT</h2>
                        </div>
                        <p className="text-soft text-sm md:text-base w-full md:w-[90%]">Smart vault keeps your funds in your control at all times. Using secure smart contracts, the casino never has access to your money.</p>
                        {/* Features list */}
                        <div className="space-y-4 md:space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-md flex items-center justify-center">
                                    <span className="text-neon-pink text-lg md:text-xl">🔒</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-light font-medium text-sm md:text-base">Full control over your</span>
                                    <span className="text-light font-medium text-sm md:text-base">assets</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-md flex items-center justify-center">
                                    <span className="text-neon-pink text-lg md:text-xl">⚡</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-light font-medium text-sm md:text-base">Instant on-chain </span>
                                    <span className="text-light font-medium text-sm md:text-base">withdrawals</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 glass-dark rounded-md flex items-center justify-center">
                                    <span className="text-neon-pink text-lg md:text-xl">🛡️</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-light font-medium text-sm md:text-base">No account or KYC </span>
                                    <span className="text-light font-medium text-sm md:text-base">required</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Action buttons */}
                    <div className="">
                        <button onClick={handleActivateClick} className="w-full bg-neon-pink text-light py-2.5 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-neon-pink/80 hover:cursor-pointer transition-all duration-300">
                            Activate Smart Vault
                        </button>
                        {/* <button onClick={onBack} className="w-full text-soft hover:text-light transition-colors py-2">
                            ← Back to wallet selection
                        </button> */}
                    </div>
                    {/* Connected wallet indicator */}
                    {/* {selectedWallet && (
                        <div className="mt-6 p-3 glass-dark rounded-lg border border-purple/20">
                            <div className="text-sm text-soft mb-1">Connected with:</div>
                            <div className="text-light font-medium">{selectedWallet}</div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default ActivateVaultStep;
