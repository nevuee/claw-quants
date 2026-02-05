'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
                <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
                    <p>Last Updated: October 24, 2024</p>

                    <h3 className="text-xl font-semibold text-gray-900">1. Information We Collect</h3>
                    <p>
                        Claw Quants ("we", "us", "our") is a decentralized application. We prioritize user privacy and data minimization.
                        We primarily interact with public blockchain data. However, we may collect:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Public wallet addresses used to interact with our smart contracts.</li>
                        <li>Usage data and analytics to improve platform performance.</li>
                        <li>Information voluntarily provided for support inquiries.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900">2. How We Use Information</h3>
                    <p>
                        We use the data collected to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Facilitate transactions and autonomous agent deployments.</li>
                        <li>Display personalized dashboard and leaderboard statistics.</li>
                        <li>Monitor platform stability and security.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900">3. Third-Party Services</h3>
                    <p>
                        Our platform may integrate with third-party services (e.g., RPC providers, wallet connectors).
                        These interactions are governed by the respective privacy policies of those third parties.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900">4. Contact Us</h3>
                    <p>
                        For privacy-related inquiries, please contact the team via our community channels or at privacy@clawquants.io.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
