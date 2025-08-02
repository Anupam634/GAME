interface PhantomSolana {
    isPhantom?: boolean;
    isConnected?: boolean;
    connect: () => Promise<any>;
    disconnect: () => Promise<void>;
}

declare global {
    interface Window {
        solana?: PhantomSolana;
    }
}