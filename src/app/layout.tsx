import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { Layers, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PeerLoop | AI-Powered Skill Barter & Mentorship',
  description: 'A decentralized campus skill barter and micro-mentorship platform powered by AWS Bedrock for Amazon Code Conquest.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900">
        <Navbar />
        
        <main className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 mt-16 text-xs text-slate-500 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight">Peer<span className="text-amazon-orange">Loop</span></span>
              <span className="text-slate-300">|</span>
              <span>Amazon Code Conquest 2026</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Problem Statement 01: Skill Exchange</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/architecture" className="flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-medium transition-colors">
                <Layers className="w-3.5 h-3.5" />
                <span>AWS Architecture</span>
              </Link>
              <Link href="/sos" className="hover:text-slate-900 transition-colors">
                SOS Flash Desk
              </Link>
              <Link href="/explore" className="hover:text-slate-900 transition-colors">
                Skill Directory
              </Link>
              <span className="text-slate-400">Built for VSSUT Campus</span>
            </div>

          </div>
        </footer>
      </body>
    </html>
  );
}

