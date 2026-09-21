'use client';

import { useState, useEffect } from 'react';
import { Student, SOSRequest, CreditTransaction, ProofBadge, SessionData } from '@/types';
import { CURRENT_USER, MOCK_STUDENTS, MOCK_SOS_REQUESTS, MOCK_TRANSACTIONS } from './mockData';

const STORAGE_KEYS = {
  USER: 'peerloop_user_v2',
  IS_LOGGED_IN: 'peerloop_logged_in_v2',
  SOS_LIST: 'peerloop_sos_list_v2',
  TRANSACTIONS: 'peerloop_transactions_v2',
  SESSIONS: 'peerloop_sessions_v2'
};

export function useAppStore() {
  const [user, setUser] = useState<Student>(CURRENT_USER);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [sosList, setSosList] = useState<SOSRequest[]>(MOCK_SOS_REQUESTS);
  const [transactions, setTransactions] = useState<CreditTransaction[]>(MOCK_TRANSACTIONS);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      const savedSos = localStorage.getItem(STORAGE_KEYS.SOS_LIST);
      const savedTx = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      const savedSessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedLoggedIn !== null) setIsLoggedIn(JSON.parse(savedLoggedIn));
      if (savedSos) setSosList(JSON.parse(savedSos));
      if (savedTx) setTransactions(JSON.parse(savedTx));
      if (savedSessions) setSessions(JSON.parse(savedSessions));
    } catch (e) {
      console.error('Failed to load from storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes
  const saveUserData = (updated: Student) => {
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  };

  // Auth: Login
  const login = (studentToLogin: Student) => {
    setUser(studentToLogin);
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(studentToLogin));
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, JSON.stringify(true));
  };

  // Auth: Logout
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, JSON.stringify(false));
  };

  // Auth: Switch persona among demo students
  const switchUser = (studentId: string) => {
    if (studentId === CURRENT_USER.id) {
      login(CURRENT_USER);
      return;
    }
    const found = MOCK_STUDENTS.find((s) => s.id === studentId);
    if (found) {
      login(found);
    }
  };

  // Post SOS with Rupee bounty & credit
  const addSosRequest = (newRequest: Omit<SOSRequest, 'id' | 'createdAt' | 'status' | 'studentId' | 'studentName' | 'studentDept' | 'studentAvatar'>) => {
    const created: SOSRequest = {
      ...newRequest,
      id: `sos-${Date.now()}`,
      studentId: user.id,
      studentName: user.name,
      studentDept: `${user.department} (${user.year.split(' ')[0]})`,
      studentAvatar: user.avatar,
      createdAt: 'Just now',
      status: 'Open'
    };
    const updatedList = [created, ...sosList];
    setSosList(updatedList);
    localStorage.setItem(STORAGE_KEYS.SOS_LIST, JSON.stringify(updatedList));

    // Deduct bounty in Rupees
    if (newRequest.bountyInRupees > 0) {
      const updatedUser = {
        ...user,
        rupeeBalance: Math.max(0, user.rupeeBalance - newRequest.bountyInRupees)
      };
      saveUserData(updatedUser);

      // Add transaction
      const newTx: CreditTransaction = {
        id: `tx-${Date.now()}`,
        timestamp: 'Just now',
        amountRupees: -newRequest.bountyInRupees,
        type: 'Spent',
        description: `Bounty posted for SOS: ${newRequest.topic}`,
        counterpart: 'PeerLoop Escrow'
      };
      const updatedTx = [newTx, ...transactions];
      setTransactions(updatedTx);
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTx));
    }

    return created;
  };

  const acceptSosRequest = (sosId: string) => {
    const target = sosList.find((s) => s.id === sosId);
    if (!target) return null;

    const updatedList = sosList.map((s) => {
      if (s.id === sosId) {
        return {
          ...s,
          status: 'In-Progress' as const,
          acceptedBy: user.id,
          acceptedByName: user.name
        };
      }
      return s;
    });

    setSosList(updatedList);
    localStorage.setItem(STORAGE_KEYS.SOS_LIST, JSON.stringify(updatedList));
    return target;
  };

  const completeSessionAndAward = (
    sessionId: string,
    topic: string,
    rupeesEarned: number,
    creditsEarned: number = 1,
    badgeAwarded?: ProofBadge
  ) => {
    // Increment rupees & credits
    const updatedUser = {
      ...user,
      rupeeBalance: user.rupeeBalance + rupeesEarned,
      campusCredits: user.campusCredits + creditsEarned,
      totalSessions: user.totalSessions + 1,
      badges: badgeAwarded ? [badgeAwarded, ...user.badges] : user.badges
    };
    saveUserData(updatedUser);

    // Record transaction
    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: 'Just now',
      amountRupees: rupeesEarned,
      amountCredits: creditsEarned,
      type: 'Earned',
      description: `Completed mentoring session on "${topic}"`,
      counterpart: 'Campus Peer'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTx));
  };

  const depositMoney = (amount: number, method: string = 'Instant UPI') => {
    const updatedUser = {
      ...user,
      rupeeBalance: user.rupeeBalance + amount
    };
    saveUserData(updatedUser);

    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: 'Just now',
      amountRupees: amount,
      type: 'Earned',
      description: `Added ₹${amount} via ${method}`,
      counterpart: 'UPI / Bank Deposit'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTx));
  };

  const withdrawMoney = (amount: number, upiId: string) => {
    const updatedUser = {
      ...user,
      rupeeBalance: Math.max(0, user.rupeeBalance - amount)
    };
    saveUserData(updatedUser);

    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: 'Just now',
      amountRupees: -amount,
      type: 'Spent',
      description: `Payout of ₹${amount} transferred to ${upiId}`,
      counterpart: 'Bank / UPI Withdrawal'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTx));
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
    switchUser,
    setUser: saveUserData,
    sosList,
    addSosRequest,
    acceptSosRequest,
    transactions,
    sessions,
    completeSessionAndAward,
    depositMoney,
    withdrawMoney,
    isLoaded
  };
}
