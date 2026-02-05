'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AITraderCard from './AITraderCard';
import { Sparkles } from 'lucide-react';

// Random bot names generator
const botNames = [
    'AlphaZero', 'QuantumFlow', 'NeuralEdge', 'SigmaTrader', 'DeepSeeker',
    'VolatilityHunter', 'TrendMaster', 'CryptoMind', 'ArbitrageX', 'ScalpNet',
    'OmegaPrime', 'DeltaForce', 'TitanAlgo', 'ZenithAI', 'FluxCapacitor'
];

const getRandomBot = () => {
    return {
        id: Math.random().toString(36).substr(2, 9),
        name: `${botNames[Math.floor(Math.random() * botNames.length)]} ${Math.floor(Math.random() * 100)}`,
        deployedAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 5)), // Random time within last 5 hours
        initialPrice: 100 + Math.random() * 500,
        volatility: 1 + Math.random() * 4,
        color: ['blue', 'purple', 'indigo', 'cyan'][Math.floor(Math.random() * 4)]
    };
};

export default function LiveMarketSimulation() {
    const [bots, setBots] = useState<any[]>([
        getRandomBot(),
        getRandomBot(),
        getRandomBot()
    ]);

    // Simulate new bots being deployed over time
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7 && bots.length < 8) { // Max 8 bots to avoid clutter
                setBots(prev => [getRandomBot(), ...prev]);
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [bots.length]);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold">Live Market Intelligence</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Autonomous Agents in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Action</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Watch real-time performance of our top performing AI agents. Each bot operates independently with unique strategies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {bots.map((bot) => (
                            <AITraderCard key={bot.id} {...bot} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
