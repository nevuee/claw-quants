'use client';

import { motion } from 'framer-motion';

const industries = [
    "DeFi Protocols", "Hedge Funds", "Market Makers", "Retail Investors"
];

export default function Industries() {
    return (
        <section className="py-24 bg-gray-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-12">
                    Trusted by <span className="text-[#FF6363]">Leaders</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
                    {industries.map((industry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="text-2xl font-bold text-gray-400"
                        >
                            {industry}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
