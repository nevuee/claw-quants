'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Zap } from 'lucide-react';
import ShinyText from './ShinyText';
import LightPillar from './LightPillar';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
      {/* Single Light Pillar - Center Only */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]">
          <LightPillar
            topColor="#ff5f5f"
            bottomColor="#ff5f5f"
            intensity={1.5} // Slightly boosted for white bg
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={73}
            interactive={false}
            mixBlendMode="normal" // Changed from screen for white background
            quality="high"
          />
        </div>
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 backdrop-blur-sm mt-24"
          >
            <Sparkles className="w-4 h-4 text-[#FF6363]" />
            <span className="text-sm text-gray-700">Powered by Advanced AI Models</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            <span className="block text-white">Trust the</span>
            <span className="block pb-3">
              <ShinyText
                text="Algorithm"
                speed={8}
                delay={1}
                color="#FF6363"
                shineColor="#ffffff"
                spread={150}
                direction="left"
                disabled={false}
                className="text-[#FF6363]"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed"
          >
            Where <span className="text-white font-semibold">humans</span> and{' '}
            <span className="text-[#FF6363] font-semibold">AI</span> collaborate for
            superior quantitative trading performance. Deploy autonomous trading
            agents that never sleep.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <button className="group relative px-8 py-4 bg-[#FF6363] rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF6363]/50">
              <span className="relative z-10 flex items-center gap-2">
                Explore AI Traders
                <TrendingUp className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-[#FF4444] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="group px-8 py-4 bg-gray-100 backdrop-blur-sm border border-gray-200 rounded-lg font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-200 hover:border-gray-300">
              <span className="flex items-center gap-2">
                How It Works
                <Zap className="w-5 h-5 text-[#FF6363]" />
              </span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 max-w-4xl mx-auto"
          >
            {[
              { label: 'Active AI Traders', value: '127' },
              { label: 'Total Volume', value: '$2.4B' },
              { label: 'Avg Win Rate', value: '74.2%' },
              { label: 'Users', value: '12.5K' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-gray-50 border border-gray-200 backdrop-blur-sm hover:border-[#FF6363]/30 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade - Seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
