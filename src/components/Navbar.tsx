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

      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/90 bg-white/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Campus affiliation */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amazon-orange via-amber-500 to-yellow-400 p-0.5 shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center border border-amber-200">
                    <span className="text-xl font-black text-amazon-orange">P</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1.5">
                    Peer<span className="text-amazon-orange">Loop</span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      AWS VSSUT
                    </span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">Campus Skill Barter & Mentorship</span>
                </div>
              </Link>
            </div>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-sm font-semibold'
                        : link.highlight
                        ? 'text-sky-700 hover:text-sky-800 hover:bg-sky-50 border border-sky-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : link.highlight ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>{link.name}</span>
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
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200 hover:border-emerald-300 transition-colors shadow-sm"
                    title="Rupee Balance & Campus Credits"
                  >
                    <span className="text-emerald-700 font-bold text-xs">₹</span>
                    <span className="text-sm font-bold text-emerald-800 font-mono">{user.rupeeBalance}</span>
                    <span className="text-emerald-300">|</span>
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-semibold text-amber-800">{user.campusCredits}</span>
                  </Link>

                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full ring-2 ring-amber-400/80 object-cover"
                      />
                      <span className="text-xs font-medium text-slate-700 hidden lg:inline">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 glass-panel bg-white border border-slate-200 rounded-2xl p-2 shadow-xl z-50 animate-fadeIn">
                        <div className="px-3 py-2 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-emerald-700 font-mono font-medium">
                            <span>₹{user.rupeeBalance} Balance</span>
                            <span>•</span>
                            <span>{user.campusCredits} Credits</span>
                          </div>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                          >
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Profile & Ledger</span>
                          </Link>

                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setIsLoginOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-700 hover:bg-amber-50 transition-colors text-left"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Switch Student Persona</span>
                          </button>
                        </div>

                        <div className="pt-1 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left font-semibold"
                          >
                            <LogOut className="w-3.5 h-3.5 text-rose-600" />
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-sm transition-all active:scale-95"
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
