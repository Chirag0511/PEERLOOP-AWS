import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import { Layers, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PeerLoop | AI-Powered Skill Barter & Mentorship',
  description: 'A decentralized peer skill barter and micro-mentorship platform powered by intelligent matchmaking and automated solution verification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('peerloop_theme');
                if (stored === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased selection:bg-amber-100 selection:text-amber-900 transition-colors duration-200">
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
              <span>Collaborative Learning Ecosystem</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Peer Skill Barter & Mentorship</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/architecture" className="flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-medium transition-colors">
                <Layers className="w-3.5 h-3.5" />
                <span>Architecture</span>
              </Link>
              <Link href="/sos" className="hover:text-slate-900 transition-colors">
                SOS Flash Desk
              </Link>
              <Link href="/explore" className="hover:text-slate-900 transition-colors">
                Skill Directory
              </Link>
              <ThemeToggle variant="pill" />
              <span className="text-slate-400">Open Community Learning</span>
            </div>

          </div>
        </footer>
      </body>
    </html>
  );
}

