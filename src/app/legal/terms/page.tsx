'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
                <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
                    <p>Last Updated: October 24, 2024</p>

                    <h3 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h3>
                    <p>
                        By accessing or using the Claw Quants platform ("Platform"), you agree to be bound by these Terms of Service.
                        If you do not agree, strictly do not use the Platform.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900">2. Description of Services</h3>
                    <p>
                        Claw Quants provides an interface for interacting with autonomous trading agents and viewing market simulations.
                        We do not provide financial advice, and our AI agents are based on probabilistic models that carry inherent market risks.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900">3. Risk Disclosure</h3>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-800 text-sm">
                        <strong>IMPORTANT:</strong> Trading and deploying autonomous agents involves significant financial risk.
                        You may lose your entire principal. Past performance of AI agents (simulated or real) is not indicative of future results.
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">4. User Responsibilities</h3>
                    <p>
                        You are solely responsible for:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Securing your private keys and wallet access.</li>
                        <li>Conducting your own due diligence before deploying any agent.</li>
                        <li>Ensuring compliance with your local laws and regulations regarding DeFi and AI trading.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900">5. Limitation of Liability</h3>
                    <p>
                        Claw Quants is provided "AS IS". We accept no liability for smart contract bugs, market losses, or oracle failures.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
