import { useState, useEffect, useRef } from 'react';

export type Timeframe = '5m' | '15m' | '1h' | '4h' | '1d';

export interface DataPoint {
    time: number;
    value: number;
}

// Random walk with momentum generator
export const generateInitialData = (count: number, startValue: number, volatility: number): DataPoint[] => {
    const data: DataPoint[] = [];
    let currentValue = startValue;
    const now = Date.now();

    for (let i = count; i > 0; i--) {
        // Random walk
        const change = (Math.random() - 0.5) * volatility;
        currentValue += change;

        // Add some trend momentum
        if (Math.random() > 0.8) currentValue += change * 2;

        data.push({
            time: now - i * 60000,
            value: Math.max(0.1, currentValue)
        });
    }
    return data;
};

export const useMarketSimulator = (initialPrice: number = 100, volatility: number = 2) => {
    const [data, setData] = useState<DataPoint[]>(() => generateInitialData(50, initialPrice, volatility));
    const [currentPrice, setCurrentPrice] = useState(data[data.length - 1].value);
    const [trend, setTrend] = useState(0); // -1 to 1

    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => {
                const lastPoint = prevData[prevData.length - 1];
                let newValue = lastPoint.value;

                // Update trend occasionally
                if (Math.random() > 0.95) {
                    // New random trend
                    setTrend((Math.random() - 0.5) * 0.5);
                }

                // Calculate movement
                const noise = (Math.random() - 0.5) * volatility;
                const momentum = trend * volatility;
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
    }, [volatility, trend]);

    return { data, currentPrice, trend };
};
