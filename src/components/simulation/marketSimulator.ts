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

export const useMarketSimulator = (initialPrice: number = 100, volatility: number = 2, personality: Personality = 'stable', id?: string) => {
    // Initialize state from localStorage or generate new
    const [data, setData] = useState<DataPoint[]>(() => {
        if (typeof window !== 'undefined' && id) {
            const saved = localStorage.getItem(`market_sim_${id}`);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Validate data freshness - if too old (> 24h), strict restart might be better but for now let's keep it
                    // Fix timestamps to ensure no gaps if needed? For now just load as is.
                    // Ensure the last point is recent enough, otherwise we might have a huge gap line.
                    // Actually, for a visual sim, let's just load the shape and update the timestamps to "now" relative to the last point?
                    // Simpler approach: Load data, and if there's a gap, the next point will just be "now". 
                    // The chart might show a flat line or jump.
                    // To make it look "legit", let's shift the timestamps so the last point is "now".
                    const lastTime = parsed.data[parsed.data.length - 1].time;
                    const timeDiff = Date.now() - lastTime;

                    // If gap is small (< 1 min), just resume. If large, shift all points.
                    if (timeDiff > 60000) {
                        return parsed.data.map((d: DataPoint) => ({
                            ...d,
                            time: d.time + timeDiff
                        }));
                    }
                    return parsed.data;
                } catch (e) {
                    console.error('Failed to parse market sim data', e);
                }
            }
        }
        return generateInitialData(50, initialPrice, volatility, personality);
    });

    const [currentPrice, setCurrentPrice] = useState(() => {
        // Consistent with data initialization
        return data[data.length - 1].value;
    });

    const [trend, setTrend] = useState(() => {
        if (typeof window !== 'undefined' && id) {
            const saved = localStorage.getItem(`market_sim_${id}`);
            if (saved) {
                try {
                    return JSON.parse(saved).trend;
                } catch (e) { }
            }
        }
        return 0;
    });

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
                    setTrend((t: number) => ((Math.random() - 0.5) * 0.5) + trendBias);
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

                // Keep fixed window size
                const newData = [...prevData.slice(1), newPoint];

                // Side effect: Save to localStorage inside the state update to guarantee latest data
                if (typeof window !== 'undefined' && id) {
                    localStorage.setItem(`market_sim_${id}`, JSON.stringify({
                        data: newData,
                        trend,
                        lastUpdated: Date.now()
                    }));
                }

                return newData;
            });

            // Sync current price state
            setCurrentPrice(prev => {
                // We can't easily access the calculated 'newValue' here without duplicating logic or using refs/effects.
                // But typically we want 'currentPrice' to be in sync. 
                // Easier way: derive 'currentPrice' from 'data' in the render or use an effect on data? 
                // Effect on data is cleaner but one render delayed. 
                // Let's rely on the fact that data updated.
                return prev; // Placeholder, see useEffect below
            });

        }, 1000); // Live update

        return () => clearInterval(interval);
    }, [volatility, trend, personality, id]);

    // Keep currentPrice in sync with data
    useEffect(() => {
        if (data.length > 0) {
            setCurrentPrice(data[data.length - 1].value);
        }
    }, [data]);

    return { data, currentPrice, trend };
};
