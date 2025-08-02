"use client";
import { useState, useEffect } from "react";
import WalletSelectPopup from "./WalletSelectPopup";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";

interface ConnectStepProps {
    onWalletSelect: (walletName: string) => void;
}

const ConnectStep = ({ onWalletSelect }: ConnectStepProps) => {
    const [showWalletSelectPopup, setShowWalletSelectPopup] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isPhantomDetected, setIsPhantomDetected] = useState<boolean | null>(null);

    const { wallets, select } = useWallet();

    // Mobile detection
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Phantom detection
    useEffect(() => {
        console.log("Starting Phantom detection");
        const detectPhantom = async () => {
            let attempts = 0;
            const maxAttempts = 20; // 10 seconds
            const checkPhantom = () => {
                console.log(`Check attempt ${attempts + 1}/${maxAttempts}, window.solana:`, !!window.solana, "isPhantom:", window.solana?.isPhantom);
                if (window.solana?.isPhantom) {
                    console.log("Phantom detected");
                    setIsPhantomDetected(true);
                    return true;
                }
                if (attempts >= maxAttempts) {
                    console.log("Phantom not detected after retries");
                    setIsPhantomDetected(false);
                    return false;
                }
                attempts++;
                return false;
            };

            if (checkPhantom()) return;

            window.addEventListener("load", checkPhantom);
            const interval = setInterval(checkPhantom, 500);
            return () => {
                window.removeEventListener("load", checkPhantom);
                clearInterval(interval);
            };
        };

        detectPhantom();
    }, []);

    const handleWalletSelection = async (walletName: string) => {
        console.log(`Selected wallet: ${walletName}, available wallets:`, wallets.map(w => w.adapter.name));
        const matchedWallet = wallets.find((w) => w.adapter.name === walletName);
        if (!matchedWallet?.adapter) {
            console.error(`Wallet ${walletName} not found`);
            alert(`Wallet ${walletName} not found. Please try again.`);
            return;
        }

        // Mobile logic
        if (isMobile() && walletName === "Phantom") {
            try {
                setIsConnecting(true);
                console.log("Initiating Phantom mobile connection");
                const redirectUrl = encodeURIComponent("https://game-jef5.vercel.app");
                const phantomDeepLink = `https://phantom.app/ul/v1/connect?app_url=${redirectUrl}&cluster=devnet`;
                console.log("Deep link:", phantomDeepLink);
                sessionStorage.setItem("phantom_connect", "pending");
                window.location.href = phantomDeepLink;

                // Poll for connection
                let attempts = 0;
                const maxAttempts = 40; // 40 seconds
                const checkConnection = async () => {
                    console.log(`Mobile connection check, attempt ${attempts + 1}/${maxAttempts}`);
                    if (attempts >= maxAttempts) {
                        console.error("Mobile connection timeout");
                        sessionStorage.removeItem("phantom_connect");
                        alert(
                            "Failed to connect Phantom wallet. Ensure the Phantom app is installed and updated to ~25.10.x, approve the connection in the app, and verify the URL (https://game-jef5.vercel.app) is accessible. Try using Chrome or Safari, and contact Phantom support at https://support.phantom.app if issues persist."
                        );
                        setIsConnecting(false);
                        return;
                    }
                    try {
                        if (window.solana?.isConnected || matchedWallet.adapter.connected) {
                            console.log("Phantom mobile connected");
                            select(walletName as WalletName);
                            await matchedWallet.adapter.connect();
                            console.log("Mobile connection successful");
                            sessionStorage.setItem("phantom_connect", "connected");
                            onWalletSelect(walletName);
                            setShowWalletSelectPopup(false);
                            setIsConnecting(false);
                        } else {
                            attempts++;
                            setTimeout(checkConnection, 1000);
                        }
                    } catch (error) {
                        console.error("Mobile connection error:", error);
                        attempts++;
                        setTimeout(checkConnection, 1000);
                    }
                };
                setTimeout(checkConnection, 2000);
            } catch (error) {
                console.error("Mobile connection failed:", error);
                sessionStorage.removeItem("phantom_connect");
                alert("Failed to connect Phantom wallet. Ensure the Phantom app (~25.10.x) is installed and updated, then try again in Chrome or Safari.");
                setIsConnecting(false);
            }
            return;
        }

        // Desktop logic
        if (walletName === "Phantom" && isPhantomDetected === false) {
            console.error("Phantom extension not detected");
            alert("Phantom wallet extension not installed or detected. Install Phantom (~25.10.x) from https://phantom.app, clear browser cookies, ensure the extension is enabled, and try in Chrome or Firefox.");
            return;
        }

        if (isPhantomDetected === null) {
            console.log("Phantom detection in progress");
            alert("Phantom detection is in progress. Please wait and try again.");
            return;
        }

        try {
            setIsConnecting(true);
            console.log("Initiating desktop connection for", walletName);
            select(walletName as WalletName);
            await new Promise(resolve => setTimeout(resolve, 200));
            console.log("Connecting adapter:", walletName);
            await matchedWallet.adapter.connect();
            console.log("Desktop connection successful");
            sessionStorage.setItem("phantom_connect", "connected");
            onWalletSelect(walletName);
            setShowWalletSelectPopup(false);
        } catch (error) {
            console.error("Desktop connection error:", error);
            alert("Failed to connect Phantom wallet. Clear browser cookies, ensure the Phantom extension (~25.10.x) is enabled, disable ad blockers, and try in Chrome or Firefox.");
        } finally {
            setIsConnecting(false);
        }
    };

    return (
        <div className="h-full">
            <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="md:w-1/2 flex justify-center items-center">
                    <div className="w-full h-[200px] md:h-full flex justify-center">
                        <div className="w-full h-full glass-dark rounded-2xl flex items-center justify-center border border-purple/30">
                            <div className="text-center">
                                <div className="text-4xl md:text-6xl mb-2">🔗</div>
                                <div className="text-soft text-sm">Wallet Connect Image</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 flex flex-col gap-4 justify-center items-start">
                    <h2 className="text-2xl md:text-4xl font-bold text-light mb-2">Connect Wallet & Continue</h2>
                    <div className="mb-4 md:mb-6 flex items-center gap-3 text-left">
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                            checked={isTermsAccepted}
                            onChange={(e) => setIsTermsAccepted(e.target.checked)}
                            className="w-5 h-5 accent-neon-pink cursor-pointer"
                        />
                        <div className="text-sm text-soft">
                            I confirm that I have read, understood, and accept the{" "}
                            <span className="text-neon-pink underline cursor-pointer hover:text-neon-pink/80">
                                Terms of Service
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowWalletSelectPopup(true)}
                        disabled={!isTermsAccepted || isConnecting}
                        className={`w-full h-12 md:h-16 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg text-center transition-all ${
                            isTermsAccepted && !isConnecting
                                ? "bg-neon-pink text-light hover:bg-neon-pink/90 cursor-pointer"
                                : "bg-neon-pink/50 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <span className="text-base md:text-lg">{isConnecting ? "Connecting..." : "Connect"}</span>
                    </button>
                    {isConnecting && (
                        <div className="text-center text-soft mt-2">
                            Connecting to Phantom... Please approve in the app or extension.
                        </div>
                    )}
                </div>
            </div>

            <WalletSelectPopup
                isOpen={showWalletSelectPopup}
                onClose={() => setShowWalletSelectPopup(false)}
                onSelect={handleWalletSelection}
                isConnecting={isConnecting}
            />
        </div>
    );
};

export default ConnectStep;