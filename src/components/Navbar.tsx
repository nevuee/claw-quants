'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-md border-b border-gray-200'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/clawquants.svg"
              alt="Claw Quants Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Claw Quants</h1>
              <p className="text-xs text-gray-600">Autonomous Trading</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#leaderboard" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Traders
            </a>
            <a href="/docs" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Docs
            </a>

            <button className="px-6 py-2 bg-[#FF6363] rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF6363]/50 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Launch App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 space-y-4"
          >
            <a href="#" className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Traders
            </a>
            <a href="#" className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Markets
            </a>
            <a href="#" className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Analytics
            </a>
            <a href="#" className="block text-sm text-gray-700 hover:text-gray-900 transition-colors">
              Docs
            </a>
            <button className="w-full px-6 py-3 bg-[#FF6363] rounded-lg text-sm font-semibold text-white">
              Launch App
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
