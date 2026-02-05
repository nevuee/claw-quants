'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Leaderboard from '@/components/Leaderboard';
import Footer from '@/components/Footer';
import LightPillar from '@/components/LightPillar';

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
      <Navbar />
      <Hero />
      <Leaderboard />
      <Footer />
    </main>
  );
}
