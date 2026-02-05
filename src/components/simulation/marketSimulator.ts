import { useState, useEffect, useRef } from 'react';

export type Timeframe = '5m' | '15m' | '1h' | '4h' | '1d';
export type Personality = 'stable' | 'volatile' | 'bullish' | 'bearish';

export interface DataPoint {
    time: number;
    value: number;
}

// Random walk with momentum generator
export const generateInitialData = (count: number, startValue: number, volatility: number, personality: Personality = 'stable'): DataPoint[] => {
    const data: DataPoint[] = [];
    let currentValue = startValue;
    const now = Date.now();

    // Personality Multipliers
    let trendBias = 0;
    if (personality === 'bullish') trendBias = 0.4;
    if (personality === 'bearish') trendBias = -0.4;

    // Volatility Multiplier - Increased base volatility
    const volMultiplier = personality === 'volatile' ? 4.0 : 1.5;

    for (let i = count; i > 0; i--) {
        // Random walk with higher chaos
        let change = (Math.random() - 0.5 + (trendBias * 0.15)) * volatility * volMultiplier;

        // Occasional initial shocks
        if (Math.random() > 0.9) change *= 3;

        currentValue += change;

        // Add some trend momentum
        if (Math.random() > 0.7) currentValue += change * 0.8;

        data.push({
            time: now - i * 60000,
            value: Math.max(0.1, currentValue)
        });
    }
    return data;
};

export const useMarketSimulator = (initialPrice: number = 100, volatility: number = 2, personality: Personality = 'stable') => {
    const [data, setData] = useState<DataPoint[]>(() => generateInitialData(50, initialPrice, volatility, personality));
    const [currentPrice, setCurrentPrice] = useState(data[data.length - 1].value);
    const [trend, setTrend] = useState(0); // -1 to 1

    useEffect(() => {
        // Personality Multipliers for Live Updates
        let trendBias = 0;
        if (personality === 'bullish') trendBias = 0.2;
        if (personality === 'bearish') trendBias = -0.2;
        const volMultiplier = personality === 'volatile' ? 2.0 : 1.0;

        const interval = setInterval(() => {
            setData(prevData => {
                const lastPoint = prevData[prevData.length - 1];
                let newValue = lastPoint.value;

                // Update trend occasionally
                if (Math.random() > 0.95) {
                    // New random trend with bias
                    setTrend(((Math.random() - 0.5) * 0.5) + trendBias);
                }

                // Calculate movement
                let noise = (Math.random() - 0.5) * volatility * volMultiplier;
                const momentum = (trend + trendBias) * volatility;

                // MARKET SHOCK: 5% chance of a big move (Pump or Dump)
                if (Math.random() > 0.95) {
                    noise *= 5; // 5x normal volatility spike
                }

                newValue += noise + momentum;

                // Ensure strictly positive price
                newValue = Math.max(0.01, newValue);

                const newPoint = {
                    time: Date.now(),
                    value: newValue
                };

                setCurrentPrice(newValue);

                // Keep fixed window size
                const newData = [...prevData.slice(1), newPoint];
                return newData;
            });
        }, 1000); // Update every second for "live" feel

        return () => clearInterval(interval);
    }, [volatility, trend, personality]);

    return { data, currentPrice, trend };
};
