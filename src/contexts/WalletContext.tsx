"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useMemo, useEffect } from "react";

export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(() => {
        console.log("Initializing PhantomWalletAdapter");
        return [new PhantomWalletAdapter()];
    }, [network]);

    // Log Phantom detection
    useEffect(() => {
        console.log("Checking Phantom in WalletContext");
        const checkPhantom = () => {
            console.log("window.solana:", !!window.solana, "isPhantom:", window.solana?.isPhantom);
        };
        checkPhantom();
        window.addEventListener("load", checkPhantom);
        const interval = setInterval(checkPhantom, 1000);
        return () => {
            window.removeEventListener("load", checkPhantom);
            clearInterval(interval);
        };
    }, []);

    // Disable autoConnect on mobile
    const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const autoConnect = !isMobile();

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={autoConnect}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;