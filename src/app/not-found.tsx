'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-start pt-32 justify-center relative overflow-hidden">
            {/* Background Grid Effect */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Glow Orbs - Adjusted for Light Theme */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-100/50 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />

            <div className="relative z-10 text-center px-4">
                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-b from-gray-200 via-gray-400 to-gray-600 bg-clip-text text-transparent select-none drop-shadow-sm">
                        404
                    </h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-4 mb-8"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved to another location.
                    </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href="/"
                        className="group relative px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white overflow-hidden transition-all duration-300 shadow-lg shadow-red-500/30"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 border border-gray-200 bg-white rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 shadow-sm"
                    >
                        Go Back
                    </button>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 flex items-center justify-center gap-3 text-gray-400"
                >
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                    <span className="text-sm font-medium">Claw Quants</span>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
}

