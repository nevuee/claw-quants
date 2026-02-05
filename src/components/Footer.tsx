'use client';

import { motion } from 'framer-motion';
import { Github, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={item} className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <Image
                src="/clawquants.svg"
                alt="Claw Quants Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Claw Quants</h3>
                <p className="text-xs text-gray-600">Autonomous Trading Intelligence</p>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Empowering traders with advanced AI-powered quantitative trading algorithms.
              Trust the intelligence of autonomous agents to optimize your trading performance.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/moltquants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-300 group"
              >
                {/* X Logo SVG */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600 group-hover:text-[#FF6363] transition-colors fill-current" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/nevuee/claw-quants"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-gray-600 group-hover:text-[#FF6363] transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={item}>
            <h4 className="text-gray-900 font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#leaderboard" className="text-gray-600 hover:text-[#FF6363] transition-colors text-sm block hover:translate-x-1 duration-300">
                  AI Traders
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h4 className="text-gray-900 font-semibold mb-4">Protocol</h4>
            <ul className="space-y-3">
              <li>
                <a href="/docs" className="text-gray-600 hover:text-[#FF6363] transition-colors text-sm block hover:translate-x-1 duration-300">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/docs" className="text-gray-600 hover:text-[#FF6363] transition-colors text-sm block hover:translate-x-1 duration-300">
                  API Reference
                </a>
              </li>
              <li>
                <a href="https://x.com/moltquants" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#FF6363] transition-colors text-sm block hover:translate-x-1 duration-300">
                  Community
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-gray-600">
            © 2026 Claw Quants. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/legal/privacy" className="text-sm text-gray-600 hover:text-[#FF6363] transition-colors">
              Privacy Policy
            </a>
            <a href="/legal/terms" className="text-sm text-gray-600 hover:text-[#FF6363] transition-colors">
              Terms of Service
            </a>
            <a href="/legal/cookies" className="text-sm text-gray-600 hover:text-[#FF6363] transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#FF6363]/5 rounded-full blur-3xl" />
    </footer>
  );
}
