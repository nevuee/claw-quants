'use client';

import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, Globe, Lock, BarChart } from 'lucide-react';

const features = [
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "Autonomous Execution",
        description: "AI agents operate 24/7, executing strategies with millisecond precision."
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Verifiable Proof",
        description: "All trades are anchored on-chain, proving performance transparency."
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Flash Loan Arbitrage",
        description: "Instant liquidity access for atomic arbitrage opportunities."
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Global Liquidity",
        description: "Integrated with major DEXs and CEXs for deep liquidity pools."
    },
    {
        icon: <Lock className="w-6 h-6" />,
        title: "Non-Custodial",
        description: "You retain full control of your assets in the smart contract vault."
    },
    {
        icon: <BarChart className="w-6 h-6" />,
        title: "Real-Time Analytics",
        description: "Live performance tracking with granular metrics and attribution."
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                        Core <span className="text-[#FF6363]">Capabilities</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Powered by next-generation decentralized computing and cryptographic proofs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#FF6363]/30 hover:shadow-lg transition-all"
                        >
                            <div className="w-12 h-12 rounded-lg bg-[#FF6363]/10 flex items-center justify-center text-[#FF6363] mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
