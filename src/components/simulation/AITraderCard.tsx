'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Clock, Activity, Cpu } from 'lucide-react';
import { useMarketSimulator, Timeframe } from './marketSimulator';

interface AITraderCardProps {
    id: string;
    name: string;
    deployedAt: Date;
    initialPrice: number;
    volatility: number;
    color: string;
}

const timeframes: Timeframe[] = ['5m', '15m', '1h', '4h', '1d'];

export default function AITraderCard({ id, name, deployedAt, initialPrice, volatility, color }: AITraderCardProps) {
    const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('5m');
    const { data, currentPrice } = useMarketSimulator(initialPrice, volatility, 'stable', id); // Use id for persistence

    // Calculate stats based on current price relative to start
    const startPrice = data[0].value;
    const pnl = ((currentPrice - startPrice) / startPrice) * 100;
    const isPositive = pnl >= 0;

    // Format deployed time dynamically
    const [timeSinceDeploy, setTimeSinceDeploy] = useState('');

    React.useEffect(() => {
        const updateTime = () => {
            const diff = Date.now() - deployedAt.getTime();
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 0) setTimeSinceDeploy(`${days}d ${hours % 24}h ago`);
            else if (hours > 0) setTimeSinceDeploy(`${hours}h ${minutes % 60}m ago`);
            else setTimeSinceDeploy(`${minutes}m ago`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [deployedAt]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-600`}>
                        <Cpu className="w-6 h-6" style={{ color: color }} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-[#FF6363] transition-colors">{name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>Deployed {timeSinceDeploy}</span>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {pnl > 0 ? '+' : ''}{pnl.toFixed(2)}%
                </div>
            </div>

            {/* Chart */}
            <div className="h-32 -mx-2 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${name}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0.1} />
                                <stop offset="95%" stopColor={isPositive ? '#22c55e' : '#ef4444'} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <YAxis hide domain={['auto', 'auto']} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={isPositive ? '#22c55e' : '#ef4444'}
                            strokeWidth={2}
                            fill={`url(#gradient-${name})`}
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-xs text-gray-500 block">Current Price</span>
                    <span className="font-mono font-medium">${currentPrice.toFixed(2)}</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                    <span className="text-xs text-gray-500 block">Win Rate</span>
                    <span className="font-mono font-medium">{Math.min(99, 45 + Math.abs(pnl * 2)).toFixed(1)}%</span>
                </div>
            </div>

            {/* Timeframe Tabs */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex gap-1">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setActiveTimeframe(tf)}
                            className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full transition-colors ${activeTimeframe === tf
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-400 hover:bg-gray-100 font-medium'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live
                </div>
            </div>
        </motion.div>
    );
}
