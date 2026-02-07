'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

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

            {/* Glow Orbs - Light Theme Adjusted */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-100/50 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
            <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-yellow-100/50 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />

            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                {/* Error Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 border border-red-100 shadow-sm">
                        <svg
                            className="w-12 h-12 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Something Went Wrong
                    </h1>
                    <p className="text-gray-600 text-lg mb-2">
                        An unexpected error occurred while processing your request.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Our team has been notified and is working on a fix.
                    </p>
                </motion.div>

                {/* Error Details (only in development) */}
                {process.env.NODE_ENV === 'development' && error?.message && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-8 p-4 rounded-lg bg-gray-50 border border-gray-200 text-left shadow-inner"
                    >
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Error Details</p>
                        <code className="text-sm text-red-600 break-all">{error.message}</code>
                        {error.digest && (
                            <p className="text-xs text-gray-500 mt-2">Digest: {error.digest}</p>
                        )}
                    </motion.div>
                )}

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <button
                        onClick={reset}
                        className="group relative px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white overflow-hidden transition-all duration-300 shadow-lg shadow-red-500/30"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Try Again
                        </span>
                    </button>

                    <a
                        href="/"
                        className="px-8 py-3 border border-gray-200 bg-white rounded-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 flex items-center gap-2 shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </a>
                </motion.div>

                {/* Decorative Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 flex items-center justify-center gap-3 text-gray-400"
                >
                    <div className="w-2 h-2 rounded-full bg-red-400/40 animate-pulse" />
                    <span className="text-sm font-medium">Error Code: {error?.digest || 'Unknown'}</span>
                    <div className="w-2 h-2 rounded-full bg-red-400/40 animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
}
