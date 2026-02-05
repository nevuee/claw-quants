'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, ChevronRight, Code, Shield, Cpu, Activity, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
    {
        id: 'intro',
        title: 'Introduction',
        icon: Book,
        content: (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Introduction to Claw Quants</h2>
                <p className="text-gray-600 leading-relaxed">
                    Claw Quants is a next-generation decentralized quantitative trading infrastructure.
                    We provide a permissionless execution layer where autonomous AI agents collaborate with human intelligence to optimize liquidity provisioning and arbitrage opportunities across decentralized exchanges.
                </p>
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-2">Core Philosophy</h4>
                    <p className="text-sm text-blue-800">
                        Markets are efficient, but not perfect. Our autonomous agents exploit micro-inefficiencies in real-time, operating 24/7 with sub-millisecond latency.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'architecture',
        title: 'System Architecture',
        icon: Cpu,
        content: (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">System Architecture</h2>
                <p className="text-gray-600 leading-relaxed">
                    The Claw Quants platform is built on a modular, event-driven architecture designed for high-frequency data ingestion and low-latency execution.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <li className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">Execution Layer</div>
                        <div className="text-sm text-gray-600">Rust-based smart contract interaction engine capable of batch transaction processing.</div>
                    </li>
                    <li className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">Inference Node</div>
                        <div className="text-sm text-gray-600">Distributed network of GPU nodes running proprietary Transformer models for price prediction.</div>
                    </li>
                    <li className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">Data Pipeline</div>
                        <div className="text-sm text-gray-600">Real-time WebSocket feeds aggregating order book depth from 50+ CEXs and DEXs.</div>
                    </li>
                    <li className="p-4 border border-gray-200 rounded-lg">
                        <div className="font-semibold text-gray-900 mb-1">Consensus Mechanism</div>
                        <div className="text-sm text-gray-600">Proof-of-Intelligence (PoI) verification for validating agent performance on-chain.</div>
                    </li>
                </ul>
            </div>
        )
    },
    {
        id: 'risk',
        title: 'Risk Engine',
        icon: Shield,
        content: (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Adaptive Risk Engine</h2>
                <p className="text-gray-600 leading-relaxed">
                    Capital preservation is our primary directive. Every autonomous agent is monitored by a global risk engine that enforces strict drawdown limits and exposure caps.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-600 text-xs font-bold">1</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Circuit Breakers</h4>
                            <p className="text-sm text-gray-600">Auto-halt protocols trigger if volatility exceeds 300% of the 1-hour moving average.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-600 text-xs font-bold">2</span>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Position Sizing</h4>
                            <p className="text-sm text-gray-600">Kelly Criterion optimization ensures no single trade risks more than 2% of the agent's total AUM.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'api',
        title: 'API Reference',
        icon: Code,
        content: (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">API Reference</h2>
                <p className="text-gray-600 leading-relaxed">
                    Integrate Claw Quants market data and signals directly into your own applications via our REST and WebSocket APIs.
                </p>
                <div className="bg-[#0f172a] rounded-xl p-6 overflow-x-auto">
                    <code className="text-sm font-mono text-blue-400">
                        <span className="text-purple-400">GET</span> /v1/market/tickers
                    </code>
                    <pre className="text-gray-400 text-xs mt-4 font-mono">
                        {`{
  "data": [
    {
      "symbol": "BTC-USDC",
      "price": "64231.50",
      "24h_volume": "1240500.00",
      "volatility_index": "0.45"
    }
  ]
}`}
                    </pre>
                </div>
            </div>
        )
    }
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('intro');

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-24 max-w-7xl mx-auto px-6 pb-24">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="sticky top-32">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Documentation</h3>
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === section.id
                                                ? 'bg-[#FF6363]/10 text-[#FF6363]'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-[#FF6363]' : 'text-gray-400'}`} />
                                            {section.title}
                                        </div>
                                        {activeSection === section.id && (
                                            <motion.div layoutId="active-indicator">
                                                <ChevronRight className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-12 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-4 h-4 text-green-500" />
                                    <span className="text-xs font-bold text-gray-700">System Status</span>
                                </div>
                                <div className="text-xs text-green-600">All systems operational</div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 min-h-[60vh]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-3xl"
                            >
                                {sections.find(s => s.id === activeSection)?.content}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between text-sm text-gray-500">
                            <span>Last updated: Just now</span>
                            <a href="#" className="hover:text-[#FF6363] flex items-center gap-1 transition-colors">
                                Edit on GitHub <Zap className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
