// src/types/global.d.ts (or just global.d.ts in root)

export {}; // 👈 Prevents redeclaration error

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      isConnected?: boolean;
      connect: () => Promise<any>;
      disconnect: () => Promise<void>;
      publicKey?: {
        toString: () => string;
      };
      on?: (event: string, handler: (args: any) => void) => void;
      request?: (args: { method: string; params?: any }) => Promise<any>;
    };
  }
}
