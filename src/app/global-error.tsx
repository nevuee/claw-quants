'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body style={{ margin: 0, padding: 0, backgroundColor: '#ffffff', color: '#171717', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Background Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '20%',
                        left: '30%',
                        width: '400px',
                        height: '400px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: '50%',
                        filter: 'blur(100px)',
                    }} />

                    <div style={{ textAlign: 'center', padding: '20px', position: 'relative', zIndex: 10 }}>
                        {/* Error Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto 24px',
                            borderRadius: '50%',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fee2e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <svg width="40" height="40" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#171717' }}>
                            Critical Error
                        </h1>
                        <p style={{ color: '#525252', marginBottom: '8px', fontSize: '18px' }}>
                            A critical error occurred in the application.
                        </p>
                        <p style={{ color: '#737373', marginBottom: '32px', fontSize: '14px' }}>
                            Please try refreshing the page or contact support if the problem persists.
                        </p>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={reset}
                                style={{
                                    padding: '12px 32px',
                                    background: '#ef4444',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.1), 0 2px 4px -1px rgba(239, 68, 68, 0.06)',
                                }}
                            >
                                Try Again
                            </button>

                            <a
                                href="/"
                                style={{
                                    padding: '12px 32px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    color: '#525252',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                }}
                            >
                                Return Home
                            </a>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}

