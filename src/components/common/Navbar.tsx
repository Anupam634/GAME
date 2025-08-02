"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { WalletMinimal, LogOut, Crown, ChevronDown } from "lucide-react";
import WalletConnectPopup from "./WalletConnectPopup";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("");
    const [isWalletPopupOpen, setIsWalletPopupOpen] = useState(false);
    const [isCrestDropdownOpen, setIsCrestDropdownOpen] = useState(false);
    const crestDropdownRef = useRef<HTMLDivElement>(null);
    const { connected, publicKey, disconnect, connect } = useWallet();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (crestDropdownRef.current && !crestDropdownRef.current.contains(event.target as Node)) {
                setIsCrestDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="p-4 bg-background flex justify-center fixed w-full z-50">
            <div className="p-2 px-3 glass w-full max-w-[1440px] rounded-2xl flex gap-4 md:gap-8 items-center justify-between border border-purple/20 relative">
                {/* Decorative spots */}
                <div className="absolute -top-10 left-10 w-32 h-32 bg-neon-pink/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 right-10 w-40 h-40 bg-purple/5 rounded-full filter blur-3xl"></div>

                {/* Logo and Title */}
                <Link href="/" className="flex items-center justify-center gap-2 relative z-10">
                    <span className="text-neon-pink text-2xl md:text-3xl">🪙</span>
                    <span className="gradient-text font-bold text-2xl md:text-3xl tracking-wide">Flipverse</span>
                </Link>

                {/* Navigation Links - Hidden on mobile, visible on md and up */}
                <div className="hidden md:flex w-full gap-2 relative z-10">
                    <NavLink href="/slots" icon="🎰" label="Slots" isActive={activeTab === "slots"} onClick={() => setActiveTab("slots")} />
                    <NavLink href="/classics" icon="🎮" label="Classics" isActive={activeTab === "classics"} onClick={() => setActiveTab("classics")} />
                </div>

                {/* Wallet Button */}
                {connected && publicKey ? (
                    <div className="relative z-10 flex gap-2 items-center">
                        <div className="flex gap-2 items-center w-40 h-12 bg-purple/20 text-light px-4 md:px-6 py-2 rounded-xl border border-purple/30">
                            <WalletMinimal size={20} className="hidden md:block" />
                            <span className="hidden sm:block">
                                {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
                            </span>
                            <span className="block sm:hidden">Connected</span>
                        </div>

                        {/* Crest Dropdown */}
                        <div className="relative" ref={crestDropdownRef}>
                            <button onClick={() => setIsCrestDropdownOpen(!isCrestDropdownOpen)} className="flex items-center gap-1 bg-purple/20 hover:bg-purple/30 text-light h-12 px-4 py-2 rounded-xl transition-all duration-300 border border-purple/30">
                                <Crown size={20} className="text-neon-pink" />
                                <ChevronDown size={16} className={`transition-transform duration-300 ${isCrestDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isCrestDropdownOpen && (
                                <div className="fixed md:absolute right-0 md:-right-3 left-4 md:left-auto w-auto md:w-[450px] px-4 py-4 rounded-xl border border-soft/10 bg-[#17132d] backdrop-blur-md drop-shadow-2xl z-50" style={{ top: "calc(100% - 3.6rem)" }}>
                                    <div className="py-2 border-b border-purple/30">
                                        <p className="text-sm text-light font-medium">Your Crests</p>
                                        <p className="text-xs text-soft">Balance: 1,234</p>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="px-4 py-2">
                                                <h4 className="text-md text-light">Reloads</h4>
                                            </div>
                                            <div className="w-full text-left px-4 py-4 text-soft hover:text-light bg-background-secondary/50 rounded-xl transition-colors duration-200">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                    <div>
                                                        <h4 className="text-md text-light">Daily Reload</h4>
                                                    </div>
                                                    <button className="text-md text-light py-3 px-8 bg-neon-pink hover:bg-neon-pink/80 rounded-xl transition-colors duration-200 w-full sm:w-auto">Claim</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="px-4 py-2">
                                                <h4 className="text-md text-light">Bonuses</h4>
                                            </div>
                                            <div className="flex flex-col gap-4">
                                                <div className="w-full text-left px-4 py-4 text-soft hover:text-light bg-background-secondary/50 rounded-xl transition-colors duration-200">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                        <div>
                                                            <h4 className="text-md text-light">RakeBack</h4>
                                                        </div>
                                                        <button className="text-md text-light py-3 px-8 bg-neon-pink hover:bg-neon-pink/80 rounded-xl transition-colors duration-200 w-full sm:w-auto">Claim</button>
                                                    </div>
                                                </div>
                                                <div className="w-full text-left px-4 py-4 text-soft hover:text-light bg-background-secondary/50 rounded-xl transition-colors duration-200">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                        <div>
                                                            <h4 className="text-md text-light">Weekly Bonus</h4>
                                                        </div>
                                                        <button className="text-md text-light py-3 px-8 bg-neon-pink hover:bg-neon-pink/80 rounded-xl transition-colors duration-200 w-full sm:w-auto">Claim</button>
                                                    </div>
                                                </div>
                                                <div className="w-full text-left px-4 py-4 text-soft hover:text-light bg-background-secondary/50 rounded-xl transition-colors duration-200">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                        <div>
                                                            <h4 className="text-md text-light">Monthly Bonus</h4>
                                                        </div>
                                                        <button className="text-md text-light py-3 px-8 bg-neon-pink hover:bg-neon-pink/80 rounded-xl transition-colors duration-200 w-full sm:w-auto">Claim</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="px-4 py-2">
                                                <h4 className="text-md text-light">Gems</h4>
                                            </div>
                                            <div className="w-full text-left px-4 py-4 text-soft hover:text-light bg-background-secondary/50 rounded-xl transition-colors duration-200">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                                                    <div>
                                                        <h4 className="text-md text-light">Gem Boost</h4>
                                                    </div>
                                                    <button className="text-md text-light py-3 px-8 bg-neon-pink hover:bg-neon-pink/80 rounded-xl transition-colors duration-200 w-full sm:w-auto">Claim</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* <button onClick={disconnect} className="flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-400 h-12 w-20 p-2 rounded-xl transition-all duration-300 border border-red-500/30" title="Disconnect Wallet">
                            <LogOut size={20} />
                        </button> */}
                    </div>
                ) : (
                    <button onClick={() => setIsWalletPopupOpen(true)} className="relative z-10 flex gap-2 items-center bg-neon-pink text-light px-4 md:px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-neon-pink/80 hover:cursor-pointer">
                        <WalletMinimal size={20} className="hidden md:block" />
                        <span>Connect</span>
                    </button>
                )}
            </div>

            {/* Wallet Connect Popup */}
            <WalletConnectPopup isOpen={isWalletPopupOpen} onClose={() => setIsWalletPopupOpen(false)} />
        </nav>
    );
};

interface NavLinkProps {
    href: string;
    icon: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavLink = ({ href, icon, label, isActive, onClick }: NavLinkProps) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`relative group flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300
        ${isActive ? "glass-dark border border-purple/30" : "text-soft hover:bg-soft/10 hover:text-light"}`}
        >
            <span className="text-3xl">{icon}</span>
            <span className="text-xl font-medium">{label}</span>
        </Link>
    );
};

export default Navbar;
