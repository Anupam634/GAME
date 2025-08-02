import React from "react";
import Image from "next/image";

const featureCards = [
    {
        icon: "⚖️",
        title: "PROVABLY FAIR IN",
        subtitle: "HOUSE GAMES",
        variant: "purple",
    },
    {
        icon: "🔐",
        title: "NON CUSTODIAL",
        subtitle: "SMART VAULT",
        variant: "pink",
    },
    {
        icon: "⚡",
        title: "WINS INSTANTLY",
        subtitle: "SETTLED ON-CHAIN",
        variant: "purple",
    },
    {
        icon: "👤",
        title: "ACCOUNTLESS",
        subtitle: "NO REGISTRATION",
        variant: "pink",
    },
];

const SectionHero = () => {
    return (
        <section className="relative flex items-center justify-center pt-10 pb-6 overflow-hidden">
            {/* Advanced 3D Background elements */}
            {/* <div className="absolute inset-0 z-0">
               
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-1/4 left-1/3 w-[400px] h-[1px] bg-neon-pink transform rotate-45 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-[300px] h-[1px] bg-purple transform -rotate-30 animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-[350px] h-[1px] bg-neon-pink transform rotate-15 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-[250px] h-[1px] bg-purple transform -rotate-45 animate-pulse"></div>
                </div>

                
                <div className="absolute top-10 right-10 w-96 h-96 bg-purple/30 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 left-20 w-80 h-80 bg-neon-pink/20 rounded-full filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple/15 rounded-full filter blur-3xl animate-pulse"></div>
            </div> */}

            <div className="glass border border-purple/20 rounded-2xl p-8 max-w-[1440px] w-full mx-auto relative overflow-hidden z-10">
                {/* Inner glass effect spots */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-pink/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple/10 rounded-full filter blur-3xl"></div>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    {/* Enhanced Welcome Bonus Card */}
                    <div className="md:w-1/2">
                        <div className="glass-dark border border-neon-pink/30 rounded-xl p-6 relative overflow-hidden">
                            {/* Diagonal shimmer effect */}
                            {/* <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
                                <div className="w-[200%] h-[400%] absolute top-[-50%] left-[-50%] bg-gradient-to-r from-transparent via-white/5 to-transparent transform -rotate-25 animate-shimmer"></div>
                            </div> */}

                            <h2 className="text-neon-pink text-3xl font-bold mb-2 tracking-wider">WELCOME BONUS</h2>

                            <p className="text-light mb-1">Bonus based on on-chain activity.</p>
                            <p className="text-light text-xl font-semibold mb-6">Claim Up to $1,000.</p>

                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <button className="w-full bg-neon-pink hover:bg-neon-pink/80 hover:cursor-pointer text-light px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 group">
                                        <span className="text-lg group-hover:scale-110 transition-transform">🎁</span>
                                        <span className="font-bold">Claim Bonus</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Feature icons */}
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                            {featureCards.map((card, index) => (
                                <div key={index} className={`glass-card border border-${card.variant === "pink" ? "neon-pink" : "purple"}/20 rounded-lg p-3 flex items-center gap-3 hover:border-${card.variant === "pink" ? "neon-pink" : "purple"}/50 transition-all duration-300 group`}>
                                    <div className={`w-10 h-10 rounded-full bg-${card.variant === "pink" ? "neon-pink" : "purple"}/20 flex items-center justify-center group-hover:shadow-glow transition-all`}>
                                        <span className="text-xl">{card.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-soft">{card.title}</p>
                                        <p className="text-base font-bold">{card.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Advanced 3D Visualization */}
                </div>
            </div>
        </section>
    );
};

// Add these animations to your globals.css
// @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
// @keyframes spin-reverse-slow { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
// @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
// @keyframes float-delay { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
// @keyframes data-stream { 0% { transform: translateY(-100%); } 100% { transform: translateY(400%); } }
// .animate-spin-slow { animation: spin-slow 20s linear infinite; }
// .animate-spin-reverse-slow { animation: spin-reverse-slow 15s linear infinite; }
// .animate-float { animation: float 3s ease-in-out infinite; }
// .animate-float-delay { animation: float-delay 5s ease-in-out infinite; }
// .animate-data-stream { animation: data-stream 3s linear infinite; }

export default SectionHero;
