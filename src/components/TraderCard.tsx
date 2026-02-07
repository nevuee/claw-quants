'use client';

import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock, Users, Target, Award } from 'lucide-react';
import { AITrader } from '@/data/traders';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface TraderCardProps {
  trader: AITrader;
  rank: number;
}

const TraderCard = memo(function TraderCard({ trader, rank }: TraderCardProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    if (rank === 2) return 'text-gray-300 border-gray-300/30 bg-gray-300/10';
    if (rank === 3) return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
    return 'text-gray-500 border-gray-500/30 bg-gray-500/10';
  };

  // Memoize static parts or expensive calculations if any
  const rankColor = useMemo(() => getRankColor(rank), [rank]);
  const formattedMarketCap = useMemo(() => formatCurrency(trader.marketCap), [trader.marketCap]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      transition={{ duration: 0.5, delay: rank * 0.1 }}
      className="group relative"
    >
      <div className="relative p-6 rounded-2xl bg-white border border-gray-200 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6363]/20 hover:border-[#FF6363]/40 overflow-hidden">
        {/* Rank Badge */}
        <div className="absolute top-4 right-4">
          <div
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg ${rankColor}`}
          >
            #{rank}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 rounded-xl bg-[#FF6363] flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-[#FF6363]/50">
              {trader.avatar}
            </div>
            {trader.trend === 'up' && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <TrendingUp className="w-3 h-3 text-white" />
              </div>
            )}
            {trader.trend === 'down' && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
                <TrendingDown className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Name & Creator */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{trader.name}</h3>
            <p className="text-sm text-gray-600">Created by <span className="text-[#FF6363] font-medium">{trader.creator}</span></p>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-xs text-gray-500">{trader.startedAt}</span>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="mb-6 h-24 -mx-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart data={trader.performance}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={trader.trend === 'up' ? '#10b981' : '#ef4444'}
                strokeWidth={2}
                dot={false}
                animationDuration={500} // Reduced from 2000ms for smoother live updates
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Win Rate */}
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-600">Win Rate</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{trader.winRate.toFixed(1)}%</div>
          </div>

          {/* Expected Return */}
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-[#FF6363]" />
              <span className="text-xs text-gray-600">Expected Return</span>
            </div>
            <div className="text-2xl font-bold text-[#FF6363]">+{trader.expectedReturn.toFixed(1)}%</div>
          </div>

          {/* Market Cap */}
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#FF6363]" />
              <span className="text-xs text-gray-600">Market Cap</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{formattedMarketCap}</div>
          </div>

          {/* Total Trades */}
          <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-[#FF6363]" />
              <span className="text-xs text-gray-600">Total Trades</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{trader.totalTrades.toLocaleString()}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {trader.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full py-3 px-4 bg-[#FF6363] hover:bg-[#FF4444] rounded-lg font-semibold text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#FF6363]/50">
          Deploy AI Trader
        </button>

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
});

export default TraderCard;
