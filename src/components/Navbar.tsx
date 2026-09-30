'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  BookOpen,
  Layers,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Bell,
  GraduationCap,
  Users,
  Compass,
  FileCheck,
  Award
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { LoginModal } from './LoginModal';
import { ThemeToggle } from './ThemeToggle';
import { UserRole } from '@/types';

interface NavbarProps {
  onOpenSosModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
  const { user, currentRole, switchRole, isLoggedIn, logout, announcements } = useAppStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);

  const navLinks = [
    { name: 'Courses & Tests', href: '/courses', icon: BookOpen },
    { name: 'Trainer Library', href: '/library', icon: Layers },
    { name: 'Competency Mapping', href: '/competency', icon: Compass },
    ...(currentRole === 'trainer'
      ? [{ name: 'Trainer Studio', href: '/trainer', icon: GraduationCap, highlight: true }]
      : []),
    ...(currentRole === 'admin'
      ? [{ name: 'Admin Console', href: '/admin', icon: Users, highlight: true }]
      : []),
    { name: 'Trainee Profile', href: '/profile', icon: User },
    { name: 'SOS Help', href: '/sos', icon: Zap, badge: 'Live' }
  ];

  const roleConfigs: Record<UserRole, { label: string; badge: string; color: string; icon: any }> = {
    trainee: {
      label: 'Trainee',
      badge: 'Learner Mode',
      color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
      icon: GraduationCap
    },
    trainer: {
      label: 'Trainer',
      badge: 'Faculty Mode',
      color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
      icon: BookOpen
    },
    admin: {
      label: 'Admin',
      badge: 'Director Console',
      color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/30',
      icon: Users
    }
  };

  const activeRoleData = roleConfigs[currentRole] || roleConfigs.trainee;
  const RoleIcon = activeRoleData.icon;

  return (
    <>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Platform Tag */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amazon-orange via-amber-500 to-yellow-400 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center border border-amber-200/50">
                    <span className="text-xl font-black text-amazon-orange">P</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                    Peer<span className="text-amazon-orange">Loop</span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                      SIH Edition
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Capacity Building & Training
                  </span>
                </div>
              </Link>
            </div>

            {/* Instant Role Switcher for SIH Prototype Showcase */}
            <div className="hidden lg:flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold">
              <span className="px-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">
                View As:
              </span>
              {(['trainee', 'trainer', 'admin'] as UserRole[]).map((r) => {
                const isActive = currentRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`px-3 py-1.5 rounded-xl transition-all capitalize flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold border border-slate-200/80 dark:border-slate-700'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {r === 'trainee' && <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />}
                    {r === 'trainer' && <BookOpen className="w-3.5 h-3.5 text-amber-500" />}
                    {r === 'admin' && <Users className="w-3.5 h-3.5 text-indigo-500" />}
                    <span>{r}</span>
                  </button>
                );
              })}
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-sm font-semibold'
                        : link.highlight
                        ? 'text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`} />
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

            {/* Right Actions: Announcements Bell, Theme Toggle & User Info */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Announcements Dropdown Bell */}
              <div className="relative">
                <button
                  onClick={() => setIsBellOpen(!isBellOpen)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                  title="Admin Announcements & Notices"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900"></span>
                </button>

                {isBellOpen && (
                  <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xl z-50 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-amber-500" />
                        Admin Notices & Updates
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold">
                        {announcements.length} New
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2 space-y-2">
                      {announcements.slice(0, 4).map((ann) => (
                        <div key={ann.id} className="pt-2 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {ann.category}
                            </span>
                            <span className="text-[9px] text-slate-400">{ann.publishedAt}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
                            {ann.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {ann.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                      <Link
                        href="/"
                        onClick={() => setIsBellOpen(false)}
                        className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        View all notices on homepage →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle (Dark / Light) */}
              <ThemeToggle variant="icon" />

              {isLoggedIn ? (
                <>
                  {/* Current Active Role Badge */}
                  <span
                    className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${activeRoleData.color}`}
                  >
                    <RoleIcon className="w-3.5 h-3.5" />
                    <span>{activeRoleData.label}</span>
                  </span>

                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full ring-2 ring-amber-400/80 object-cover"
                      />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-200 hidden lg:inline">
                        {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-60 glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-2xl z-50 animate-fadeIn">
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeRoleData.color}`}>
                              Role: {user.role.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              {user.status}
                            </span>
                          </div>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Profile, Qualifications & Certs</span>
                          </Link>

                          {user.role === 'trainer' && (
                            <Link
                              href="/trainer"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                              <span>Trainer Questionnaires & Materials</span>
                            </Link>
                          )}

                          {user.role === 'admin' && (
                            <Link
                              href="/admin"
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-indigo-700 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                            >
                              <Users className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Admin User Approval & Analytics</span>
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setIsLoginOpen(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Switch Account or Role</span>
                          </button>

                          <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800">
                            <ThemeToggle variant="dropdown-item" />
                          </div>
                        </div>

                        <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={() => {
                              setIsDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left font-semibold"
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
