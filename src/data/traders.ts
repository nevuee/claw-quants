export interface TraderPerformance {
  timestamp: number;
  value: number;
}

export interface AITrader {
  id: number;
  name: string;
  avatar: string;
  winRate: number;
  marketCap: number;
  expectedReturn: number;
  startedAt: string;
  creator: string;
  trend: 'up' | 'down';
  totalTrades: number;
  successfulTrades: number;
  performance: TraderPerformance[];
  tags: string[];
}

// Generate realistic performance data
const generatePerformance = (trend: 'up' | 'down', volatility: number = 10): TraderPerformance[] => {
  const data: TraderPerformance[] = [];
  const now = Date.now();
  const baseValue = 100;
  let currentValue = baseValue;

  for (let i = 30; i >= 0; i--) {
    const timestamp = now - (i * 24 * 60 * 60 * 1000); // 30 days ago
    const randomChange = (Math.random() - 0.5) * volatility;
    const trendChange = trend === 'up' ? Math.random() * 2 : -Math.random() * 2;

    currentValue += randomChange + trendChange;
    currentValue = Math.max(80, Math.min(200, currentValue)); // Keep between 80-200

    data.push({
      timestamp,
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return data;
};

export const aiTraders: AITrader[] = [
  {
    id: 1,
    name: "QuantumEdge",
    avatar: "QE",
    winRate: 87.3,
    marketCap: 12450000,
    expectedReturn: 42.5,
    startedAt: "23 days ago",
    creator: "@deep-forge",
    trend: "up",
    totalTrades: 1847,
    successfulTrades: 1612,
    performance: generatePerformance('up', 8),
    tags: ["High-Frequency", "Scalping", "BTC/ETH"],
  },
  {
    id: 2,
    name: "AlphaWave",
    avatar: "AW",
    winRate: 82.7,
    marketCap: 9870000,
    expectedReturn: 38.2,
    startedAt: "18 days ago",
    creator: "@neural-labs",
    trend: "up",
    totalTrades: 1523,
    successfulTrades: 1260,
    performance: generatePerformance('up', 10),
    tags: ["Trend Following", "Swing Trade", "Altcoins"],
  },
  {
    id: 3,
    name: "NeuralFlow",
    avatar: "NF",
    winRate: 79.8,
    marketCap: 8230000,
    expectedReturn: 35.6,
    startedAt: "31 days ago",
    creator: "@quantum-ai",
    trend: "up",
    totalTrades: 2134,
    successfulTrades: 1703,
    performance: generatePerformance('up', 12),
    tags: ["Machine Learning", "Pattern Recognition", "Multi-Asset"],
  },
  {
    id: 4,
    name: "SigmaPredict",
    avatar: "SP",
    winRate: 76.5,
    marketCap: 7560000,
    expectedReturn: 31.8,
    startedAt: "12 days ago",
    creator: "@algo-masters",
    trend: "up",
    totalTrades: 981,
    successfulTrades: 751,
    performance: generatePerformance('up', 9),
    tags: ["Statistical Arbitrage", "Mean Reversion", "Forex"],
  },
  {
    id: 5,
    name: "DeepTrade",
    avatar: "DT",
    winRate: 74.2,
    marketCap: 6890000,
    expectedReturn: 29.4,
    startedAt: "27 days ago",
    creator: "@ai-capital",
    trend: "up",
    totalTrades: 1678,
    successfulTrades: 1245,
    performance: generatePerformance('up', 11),
    tags: ["Deep Learning", "Sentiment Analysis", "News Trading"],
  },
  {
    id: 6,
    name: "VelocityBot",
    avatar: "VB",
    winRate: 71.9,
    marketCap: 5420000,
    expectedReturn: 26.7,
    startedAt: "8 days ago",
    creator: "@speed-algo",
    trend: "down",
    totalTrades: 567,
    successfulTrades: 408,
    performance: generatePerformance('down', 13),
    tags: ["Momentum", "Breakout", "Intraday"],
  },
  {
    id: 7,
    name: "OmegaStrategy",
    avatar: "OS",
    winRate: 69.3,
    marketCap: 4780000,
    expectedReturn: 24.1,
    startedAt: "15 days ago",
    creator: "@strategy-labs",
    trend: "up",
    totalTrades: 1234,
    successfulTrades: 855,
    performance: generatePerformance('up', 14),
    tags: ["Options", "Volatility", "Hedging"],
  },
  {
    id: 8,
    name: "PulseTrader",
    avatar: "PT",
    winRate: 67.8,
    marketCap: 4120000,
    expectedReturn: 22.5,
    startedAt: "21 days ago",
    creator: "@pulse-tech",
    trend: "up",
    totalTrades: 1567,
    successfulTrades: 1063,
    performance: generatePerformance('up', 10),
    tags: ["Market Making", "Liquidity", "Stablecoins"],
  },
  {
    id: 9,
    name: "ApexAlgorithm",
    avatar: "AA",
    winRate: 65.4,
    marketCap: 3560000,
    expectedReturn: 19.8,
    startedAt: "6 days ago",
    creator: "@apex-quant",
    trend: "down",
    totalTrades: 423,
    successfulTrades: 277,
    performance: generatePerformance('down', 15),
    tags: ["Grid Trading", "DCA", "Spot"],
  },
  {
    id: 10,
    name: "ZenithAI",
    avatar: "ZA",
    winRate: 63.2,
    marketCap: 2890000,
    expectedReturn: 17.3,
    startedAt: "10 days ago",
    creator: "@zenith-capital",
    trend: "up",
    totalTrades: 789,
    successfulTrades: 499,
    performance: generatePerformance('up', 12),
    tags: ["Portfolio Balancing", "Risk Management", "Long-term"],
  },
];

export const getTopTraders = (limit: number = 10): AITrader[] => {
  return aiTraders.slice(0, limit);
};

export const getTraderById = (id: number): AITrader | undefined => {
  return aiTraders.find(trader => trader.id === id);
};
