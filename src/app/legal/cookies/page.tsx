'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p>Last Updated: October 24, 2024</p>

          <h3 className="text-xl font-semibold text-gray-900">1. Use of Cookies</h3>
          <p>
            Claw Quants uses minimal cookies and local storage technologies to enhance user experience. 
            Because we are a decentralized application (dApp), we rely less on server-side sessions and more on your local device handling the connection.
          </p>

          <h3 className="text-xl font-semibold text-gray-900">2. Types of Data Stored</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential Preferences:</strong> Theme settings (Light/Dark mode) and UI preferences.</li>
            <li><strong>Wallet Connection:</strong> Caching the connection status to your web3 wallet provider.</li>
            <li><strong>Analytics:</strong> Anonymous usage data to help us optimize the simulator performance.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900">3. Managing Preferences</h3>
          <p>
            Most web browsers allow you to control cookies through their settings preferences. 
            However, limiting these technologies may impact your ability to connect your wallet or save your dashboard layout.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
