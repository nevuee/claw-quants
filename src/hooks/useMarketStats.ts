import { useState, useEffect } from 'react';

export interface MarketStats {
    activeTraders: number;
    totalVolume: number;
    avgWinRate: number;
    totalUsers: number;
}

// Config
const LAUNCH_DATE = new Date('2026-02-01').getTime(); // Simulation Start Date
const INITIAL_TRADERS = 25;
const INITIAL_VOLUME = 145000;
const INITIAL_USERS = 120; // Reduced significantly

const TRADERS_PER_DAY = 2.5;
const USERS_PER_DAY = 1.5; // Slow organic growth
const VOLUME_PER_DAY = 5000;

export function useMarketStats() {
    const [stats, setStats] = useState<MarketStats>({
        activeTraders: INITIAL_TRADERS,
        totalVolume: INITIAL_VOLUME,
        avgWinRate: 68.5,
        totalUsers: INITIAL_USERS,
    });

    useEffect(() => {
        // 1. Calculate Base Stats based on time elapsed since Launch
        const calculateBaseStats = () => {
            const now = Date.now();
            const daysElapsed = Math.max(0, (now - LAUNCH_DATE) / (1000 * 60 * 60 * 24));

            // Random variance to make it look organic (not linear)
            const organicVariance = Math.random() * 5;

            return {
                activeTraders: Math.floor(INITIAL_TRADERS + (daysElapsed * TRADERS_PER_DAY) + organicVariance),
                totalVolume: Math.floor(INITIAL_VOLUME + (daysElapsed * VOLUME_PER_DAY)),
                totalUsers: Math.floor(INITIAL_USERS + (daysElapsed * USERS_PER_DAY) + (organicVariance * 3)),
            };
        };

        // Set initial derived stats
        const base = calculateBaseStats();
        setStats(prev => ({ ...prev, ...base }));

        // 2. Live "Breathing" Effect (Small fluctuations every few seconds)
        const interval = setInterval(() => {
            setStats(prev => {
                // Randomly fluctuate volume & win rate slightly for 'live' feel
                const volumeChange = Math.random() * 1000;
                const winRateChange = (Math.random() - 0.5) * 0.05;

                // Very rare chance to add a user live (session growth)
                const liveUserAdd = Math.random() > 0.95 ? 1 : 0;

                return {
                    ...prev,
                    totalVolume: prev.totalVolume + volumeChange,
                    avgWinRate: Math.min(99, Math.max(10, prev.avgWinRate + winRateChange)),
                    totalUsers: prev.totalUsers + liveUserAdd
                };
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return stats;
}
