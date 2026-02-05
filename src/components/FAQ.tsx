'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "How does Claw Quants AI work?",
        answer: "Our autonomous agents utilize deep reinforcement learning models trained on years of historical tick data. They execute trades directly on-chain via our TEE (Trusted Execution Environment) nodes, ensuring high-frequency performance with non-custodial security."
    },
    {
        question: "Is my capital safe?",
        answer: "Yes. Claw Quants is non-custodial. Your assets remain in your wallet or the smart contract vault which you control. Our Risk Engine also enforces strict drawdown limits (Circuit Breakers) to prevent significant losses during market volatility."
    },
    {
        question: "What is the minimum deposit?",
        answer: "There is no minimum deposit to explore the platform. However, to deploy a live copy trading agent, we recommend a minimum of 0.1 ETH or equivalent to cover gas fees and ensure efficient position sizing."
    },
    {
        question: "How do I withdraw my funds?",
        answer: "You can withdraw your funds at any time directly through the dashboard. Since all positions are on-chain, you interact directly with the smart contract to settle and retrieve your assets instantly."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6">
                        <HelpCircle className="w-4 h-4 text-[#FF6363]" />
                        <span className="text-sm font-medium text-gray-700">Frequently Asked Questions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Understand the <span className="text-[#FF6363]">Protocol</span>
                    </h2>
                    <p className="text-gray-600">
                        Everything you need to know about our decentralized autonomous trading infrastructure.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border border-gray-200 rounded-2xl bg-gray-50/50 overflow-hidden hover:border-[#FF6363]/30 transition-colors duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-[#FF6363]/10 text-[#FF6363]' : 'bg-gray-200 text-gray-500'}`}>
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
