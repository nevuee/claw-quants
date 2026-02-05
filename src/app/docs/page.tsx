'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Book, Code, Terminal, Shield, Cpu, Activity } from 'lucide-react';

const sections = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        icon: <Book className="w-4 h-4" />,
        items: [
            { id: 'introduction', title: 'Introduction' },
            { id: 'architecture', title: 'Architecture' },
            { id: 'tokenomics', title: 'Tokenomics' }
        ]
    },
    {
        id: 'development',
        title: 'Development',
        icon: <Code className="w-4 h-4" />,
        items: [
            { id: 'deploy-agent', title: 'Deploying an Agent' },
            { id: 'sdk-reference', title: 'SDK Reference' },
            { id: 'testing', title: 'Backtesting' }
        ]
    },
    {
        id: 'api',
        title: 'API Reference',
        icon: <Terminal className="w-4 h-4" />,
        items: [
            { id: 'websocket', title: 'WebSocket Feeds' },
            { id: 'rest-api', title: 'REST Endpoints' }
        ]
    }
];

export default function DocsPage() {
    const [activeSection, setActiveSection] = useState('introduction');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen bg-white pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12">

                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-28 space-y-8">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6363]/20 focus:border-[#FF6363] transition-all"
                            />
                        </div>

                        {/* Navigation Links */}
                        <nav className="space-y-6">
                            {sections.map((section) => (
                                <div key={section.id}>
                                    <div className="flex items-center gap-2 px-2 mb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        {section.icon}
                                        {section.title}
                                    </div>
                                    <ul className="space-y-1">
                                        {section.items.map((item) => (
                                            <li key={item.id}>
                                                <button
                                                    onClick={() => setActiveSection(item.id)}
                                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === item.id
                                                            ? 'bg-[#FF6363]/10 text-[#FF6363] font-medium'
                                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                        }`}
                                                >
                                                    {item.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="prose prose-gray max-w-none">

                        {/* Content: Introduction */}
                        {activeSection === 'introduction' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-4xl font-bold text-gray-900 mb-6">Introduction to AI Quant Trade</h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    The world's first decentralized marketplace for autonomous trading agents.
                                    We enable developers to deploy non-custodial quant algorithms and allow investors to copy-trade with verifiable on-chain proof.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                        <Cpu className="w-8 h-8 text-[#FF6363] mb-4" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Autonomous Execution</h3>
                                        <p className="text-gray-600 text-sm">Agents run 24/7 on decentralized compute nodes, executing strategies without human intervention.</p>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                        <Shield className="w-8 h-8 text-[#FF6363] mb-4" />
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Verifiable Proof</h3>
                                        <p className="text-gray-600 text-sm">All trades and performance metrics are anchored on-chain, ensuring tamper-proof history.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Content: Deploy Agent */}
                        {activeSection === 'deploy-agent' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-[#FF6363]/10 text-[#FF6363] rounded-full text-xs font-semibold">Developer Guide</span>
                                    <span className="text-gray-400 text-sm">Estimated time: 15 mins</span>
                                </div>

                                <h1 className="text-4xl font-bold text-gray-900 mb-6">Deploying Your First Agent</h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    Follow this guide to package your Python or TypeScript strategy and deploy it to the AI Quant network.
                                </p>

                                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Install the CLI</h3>
                                <div className="bg-[#1e1e1e] text-gray-300 p-4 rounded-lg font-mono text-sm mb-6 shadow-lg overflow-x-auto">
                                    <span className="text-[#FF6363]">$</span> npm install -g @ai-quant/cli<br />
                                    <span className="text-[#FF6363]">$</span> ai-quant login
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Initialize Project</h3>
                                <div className="bg-[#1e1e1e] text-gray-300 p-4 rounded-lg font-mono text-sm mb-6 shadow-lg overflow-x-auto">
                                    <span className="text-[#FF6363]">$</span> ai-quant init my-strategy --template mean-reversion
                                </div>

                                <div className="p-4 border-l-4 border-[#FF6363] bg-[#FF6363]/5 rounded-r-lg my-8">
                                    <h4 className="font-bold text-[#FF6363] mb-1">Requirement</h4>
                                    <p className="text-sm text-gray-700">You must hold at least 1000 AIQ tokens to deploy a mainnet agent. This serves as a spam prevention mechanism.</p>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Deploy</h3>
                                <div className="bg-[#1e1e1e] text-gray-300 p-4 rounded-lg font-mono text-sm mb-6 shadow-lg overflow-x-auto">
                                    <span className="text-[#FF6363]">$</span> ai-quant deploy --network mainnet
                                </div>
                            </motion.div>
                        )}

                        {/* Fallback for other sections */}
                        {(activeSection !== 'introduction' && activeSection !== 'deploy-agent') && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <h1 className="text-4xl font-bold text-gray-900 mb-6 capitalize">{activeSection.replace('-', ' ')}</h1>
                                <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
                                    <Activity className="w-12 h-12 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900">Content Coming Soon</h3>
                                    <p className="text-gray-500 max-w-md mt-2">
                                        Our team is currently writing the documentation for this section. Check back later or join our Discord for updates.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
