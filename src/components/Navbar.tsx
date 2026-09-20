'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Zap, ShieldCheck, Coins, BookOpen, Layers, LogIn, LogOut, User, ChevronDown, IndianRupee } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { LoginModal } from './LoginModal';

interface NavbarProps {
  onOpenSosModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSosModal }) => {
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAppStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Discover & Barter', href: '/explore', icon: Sparkles },
    { name: 'SOS 15-Min Queue', href: '/sos', icon: Zap, badge: 'Live' },
    { name: 'My Profile & Badges', href: '/profile', icon: ShieldCheck },
    { name: 'AWS Architecture', href: '/architecture', icon: Layers, highlight: true }
  ];

  return (
    <>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Campus affiliation */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amazon-orange via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <span className="text-xl font-black text-amazon-orange">P</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                    Peer<span className="text-amazon-orange">Loop</span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-amazon-orange/10 text-amazon-orange border border-amazon-orange/20">
                      AWS VSSUT
                    </span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Campus Skill Barter & Mentorship</span>
                </div>
              </Link>
            </div>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-amazon-orange/15 text-amazon-orange border border-amazon-orange/30 shadow-sm'
                        : link.highlight
                        ? 'text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 border border-sky-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amazon-orange' : link.highlight ? 'text-sky-400' : 'text-slate-400'}`} />
                    {link.name}
                    {link.badge && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions, Rupee Wallet & User Dropdown */}
            <div className="flex items-center gap-3">
              
              {isLoggedIn ? (
                <>
                  {/* Indian Rupee Balance Badge */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors shadow-inner"
                    title="Rupee Balance & Campus Credits"
                  >
                    <span className="text-emerald-400 font-bold text-xs">₹</span>
                    <span className="text-sm font-bold text-emerald-300">{user.rupeeBalance}</span>
                    <span className="text-slate-600">|</span>
                    <Coins className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-300">{user.campusCredits}</span>
                  </Link>

                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full ring-2 ring-amazon-orange/50 object-cover"
                      />
                      <span className="text-xs font-medium text-slate-200 hidden lg:inline">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 glass-panel bg-slate-900 border border-slate-700/80 rounded-2xl p-2 shadow-2xl z-50 animate-fadeIn">
                        <div className="px-3 py-2 border-b border-slate-800">
                          <p className="text-xs font-bold text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-400 font-mono">
                            <span>₹{user.rupeeBalance} Balance</span>
                            <span>•</span>
                            <span>{user.campusCredits} Credits</span>
                          </div>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Profile & Ledger</span>
                          </Link>

                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setIsLoginOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-400 hover:bg-amber-500/10 transition-colors text-left"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Switch Student Persona</span>
                          </button>
                        </div>

                        <div className="pt-1 border-t border-slate-800">
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left font-semibold"
                          >
                            <LogOut className="w-3.5 h-3.5 text-rose-400" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Logged Out State: Sign In Button */
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amazon-orange hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

            </div>

          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
