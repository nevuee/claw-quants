'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Leaderboard from '@/components/Leaderboard';
import Features from '@/components/Features';
import Industries from '@/components/Industries';
import FAQ from '@/components/FAQ';

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    (async () => {
      const Lenis = (await import('lenis')).default;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    })();
  }, []);

  return (
    <main className="relative min-h-screen bg-white">
      <Hero />
      <Leaderboard />
      <Features />
      <Industries />
      <FAQ />
    </main>
  );
}
