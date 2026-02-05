'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Activity, Terminal, Shield, Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { AITrader } from '@/data/traders';
import { useEffect, useState, useRef } from 'react';

interface TraderDetailsModalProps {
    trader: AITrader | null;
    onClose: () => void;
}

export default function TraderDetailsModal({ trader, onClose }: TraderDetailsModalProps) {
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const [logs, setLogs] = useState<{ type: 'info' | 'success' | 'error', message: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleInvest = () => {
        if (!isConnected) {
            openConnectModal?.();
        } else {
            // Future: Open Vault Deposit Modal
            alert(`Opening Vault Deposit for ${trader?.name}... (Coming Soon)`);
        }
    };

    // Simulate Live AI Logs
    useEffect(() => {
        if (!trader) return;

        setLogs([
            { type: 'info', message: `> Initializing connection to ${trader.name}...` },
            { type: 'info', message: `> Verifying smart contract integrity...` }
        ]);

        const analysisActions = [
            "Scanning order book depth...",
            "Calculating RSI divergence...",
            "Detecting liquidity sweep...",
            "Monitoring mempool for sandwich attacks...",
            "Verifying on-chain oracle prices...",
            "Rebalancing portfolio weights...",
        ];

        const symbols = ["ETH", "BTC", "SOL", "ARB", "LINK", "UNI"];

        const interval = setInterval(() => {
            setLogs(prev => {
                const isTrade = Math.random() > 0.7; // 30% chance of a trade log
                let newLog: { type: 'info' | 'success' | 'error', message: string };

                if (isTrade) {
                    const action = Math.random() > 0.5 ? 'BUY' : 'SELL';
                    const amount = (Math.random() * 2).toFixed(2);
                    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
                    const price = Math.floor(Math.random() * 3000) + 1000;

                    newLog = {
                        type: action === 'BUY' ? 'success' : 'error', // Green for Buy, Red for Sell
                        message: `> EXECUTING: ${action} ${amount} ${symbol} @ $${price} [${new Date().toLocaleTimeString()}]`
                    };
                } else {
                    newLog = {
                        type: 'info',
                        message: `> ${analysisActions[Math.floor(Math.random() * analysisActions.length)]}`
                    };
                }

                const newLogs = [...prev, newLog];
                if (newLogs.length > 8) newLogs.shift(); // Keep only last 8 logs
                return newLogs;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [trader]);

    // Auto-scroll logs
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    if (!trader) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Content - LIGHT THEME */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl font-bold text-gray-900 border border-gray-200 shadow-sm">
                                {trader.avatar}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{trader.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>{trader.creator}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-400" />
                                    <span className={trader.trend === 'up' ? 'text-green-500' : 'text-[#FF6363]'}>
                                        {trader.trend === 'up' ? 'Bullish' : 'Bearish'} Strategy
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-6">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs uppercase tracking-wider">
                                    <Activity className="w-3 h-3" /> Win Rate
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{trader.winRate.toFixed(1)}%</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs uppercase tracking-wider">
                                    <Wallet className="w-3 h-3" /> Market Cap
                                </div>
                                <div className="text-2xl font-bold text-gray-900">${(trader.marketCap / 1000000).toFixed(2)}M</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs uppercase tracking-wider">
                                    <Shield className="w-3 h-3" /> Risk Score
                                </div>
                                <div className="text-2xl font-bold text-green-500">Low</div>
                            </div>
                        </div>

                        {/* Live Terminal - KEPT DARK FOR CONTRAST */}
                        <div className="rounded-xl bg-[#0F0F0F] border border-gray-800 overflow-hidden font-mono text-sm shadow-inner">
                            <div className="px-4 py-2 bg-[#1A1A1A] border-b border-gray-800 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Terminal className="w-3 h-3" />
                                    <span>Live Strategy Logs</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <div
                                ref={scrollRef}
                                className="p-4 h-32 overflow-y-auto space-y-1"
                            >
                                {logs.map((log, i) => (
                                    <div
                                        key={i}
                                        className={`animate-pulse ${log.type === 'success' ? 'text-green-400' :
                                            log.type === 'error' ? 'text-red-400' :
                                                'text-gray-400'
                                            }`}
                                    >
                                        {log.message}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleInvest}
                            className="w-full py-4 bg-[#FF6363] hover:bg-[#FF4444] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#FF6363]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Wallet className="w-5 h-5" />
                            {isConnected ? "Invest in Strategy" : "Connect Wallet to Invest"}
                        </button>
                        <p className="text-center text-xs text-gray-500">
                            *Past performance is not indicative of future results. Protocol fee: 1%.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
