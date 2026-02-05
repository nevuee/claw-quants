'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';
import { getTopTraders, AITrader } from '@/data/traders';
import TraderCard from './TraderCard';
import { useMarketSimulator } from './simulation/marketSimulator';

// Wrapper to inject live data into TraderCard
const SimulatedTraderCard = ({ trader, rank }: { trader: AITrader; rank: number }) => {
  // Use simulator for this specific trader
  // Use a stable volatility based on trader id to avoid re-renders changing behavior too wildly
  const volatility = useMemo(() => 1 + (trader.id % 5), [trader.id]);
  const initialPrice = useMemo(() => trader.performance[trader.performance.length - 1].value, [trader]);

  const { data, currentPrice } = useMarketSimulator(initialPrice, volatility);

  // Merge live data into trader object
  const liveTrader: AITrader = {
    ...trader,
    performance: data.map(d => ({ timestamp: d.time, value: d.value })),
    // Dynamically update trend based on recent price movement
    trend: currentPrice > data[0].value ? 'up' : 'down',
    // Simulate updating stats slightly
    winRate: Math.min(99, trader.winRate + (Math.random() - 0.5) * 0.1),
  };

  return <TraderCard trader={liveTrader} rank={rank} />;
};

const botNames = [
  'AlphaZero', 'QuantumFlow', 'NeuralEdge', 'SigmaTrader', 'DeepSeeker',
  'VolatilityHunter', 'TrendMaster', 'CryptoMind', 'ArbitrageX', 'ScalpNet',
  'OmegaPrime', 'DeltaForce', 'TitanAlgo', 'ZenithAI', 'FluxCapacitor'
];

const creators = [
  '@deep-forge', '@neural-labs', '@quantum-ai', '@algo-masters', '@ai-capital',
  '@speed-algo', '@strategy-labs', '@pulse-tech', '@apex-quant', '@zenith-capital'
];

const generateNewTrader = (id: number): AITrader => {
  const name = `${botNames[Math.floor(Math.random() * botNames.length)]} ${Math.floor(Math.random() * 100)}`;
  return {
    id: id,
    name: name,
    avatar: name.substring(0, 2).toUpperCase(),
    winRate: 60 + Math.random() * 30,
    marketCap: 1000000 + Math.random() * 9000000,
    expectedReturn: 10 + Math.random() * 40,
    startedAt: "Just now",
    creator: creators[Math.floor(Math.random() * creators.length)],
    trend: Math.random() > 0.5 ? 'up' : 'down',
    totalTrades: Math.floor(Math.random() * 100),
    successfulTrades: Math.floor(Math.random() * 80),
    performance: [{ timestamp: Date.now(), value: 100 }], // Initial dummy, will be taken over by simulator
    tags: ["New Deployment", "AI", "Scalping"]
  };
};

export default function Leaderboard() {
  // Initialize with static data
  const [traders, setTraders] = useState<AITrader[]>(getTopTraders(6));

  // Simulate new bot deployments
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && traders.length < 12) {
        const newId = Date.now();
        const newTrader = generateNewTrader(newId);
        setTraders(prev => [newTrader, ...prev.slice(0, 11)]); // Add new to top, keep max 12
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [traders.length]);

  return (
    <section className="relative py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 backdrop-blur-sm mb-6">
            <Trophy className="w-4 h-4 text-[#FF6363]" />
            <span className="text-sm text-gray-700">Live Market Intelligence</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI Trading
            <span className="block text-[#FF6363]">
              Leaderboard
            </span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time performance of autonomous trading agents. Watch as new AI bots are deployed and compete in live market conditions.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Static stats for layout preservation, could rely on real aggregation later */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gray-50 border border-gray-200 backdrop-blur-sm text-center transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Total Trading Volume</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">$1.2M</div>
            <div className="text-sm text-green-500 mt-1">Live updates</div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gray-50 border border-gray-200 backdrop-blur-sm text-center transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-[#FF6363]" />
              <span className="text-sm text-gray-600">Average Win Rate</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">74.2%</div>
            <div className="text-sm text-[#FF6363] mt-1">Across active bots</div>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-gray-50 border border-gray-200 backdrop-blur-sm text-center transition-shadow hover:shadow-lg"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-[#FF6363]" />
              <span className="text-sm text-gray-600">Active Agents</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{traders.length + 42}</div>
            <div className="text-sm text-gray-500 mt-1">Deploying new agents...</div>
          </motion.div>
        </motion.div>

        {/* Trader Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {traders.map((trader, index) => (
              <SimulatedTraderCard key={trader.id} trader={trader} rank={index + 1} />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 backdrop-blur-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to deploy your own AI agent?
            </h3>
            <p className="text-gray-600 mb-6">
              Join the network and let your algorithm compete in the global liquidity pool.
            </p>
            <button className="px-8 py-4 bg-[#FF6363] rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#FF4444] hover:shadow-lg hover:shadow-[#FF6363]/50">
              Deploy Agent
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
