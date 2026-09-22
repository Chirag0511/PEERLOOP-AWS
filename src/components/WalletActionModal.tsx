'use client';

import React, { useState } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';

interface WalletActionModalProps {
  isOpen: boolean;
  mode: 'deposit' | 'withdraw';
  onClose: () => void;
}

export const WalletActionModal: React.FC<WalletActionModalProps> = ({
  isOpen,
  mode,
  onClose
}) => {
  const { user, depositMoney, withdrawMoney } = useAppStore();
  const [amount, setAmount] = useState<number>(mode === 'deposit' ? 250 : 100);
  const [upiId, setUpiId] = useState('student@oksbi');
  const [selectedPreset, setSelectedPreset] = useState<number>(mode === 'deposit' ? 250 : 100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const presets = mode === 'deposit' ? [100, 250, 500, 1000] : [100, 200, 500];

  const handlePreset = (val: number) => {
    setSelectedPreset(val);
    setAmount(val);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (amount <= 0) {
      setErrorMsg('Please enter a valid amount greater than ₹0');
      return;
    }

    if (mode === 'withdraw' && amount > user.rupeeBalance) {
      setErrorMsg(`Insufficient balance. Maximum withdrawable is ₹${user.rupeeBalance}`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      if (mode === 'deposit') {
        depositMoney(amount, 'Instant UPI (Google Pay / PhonePe)');
      } else {
        withdrawMoney(amount, upiId);
      }
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1300);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 ring-8 ring-emerald-50 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {mode === 'deposit' ? 'Money Added Successfully!' : 'Withdrawal Initiated!'}
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-mono">
              {mode === 'deposit'
                ? `₹${amount} credited to your Campus Wallet.`
                : `₹${amount} transferred to ${upiId}.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`p-2.5 rounded-xl border ${
                  mode === 'deposit'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-sky-50 text-sky-700 border-sky-200'
                }`}
              >
                {mode === 'deposit' ? (
                  <ArrowDownLeft className="w-5 h-5" />
                ) : (
                  <ArrowUpRight className="w-5 h-5" />
                )}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {mode === 'deposit' ? 'Add Money to Wallet' : 'Withdraw to Bank / UPI'}
                </h2>
                <p className="text-xs text-slate-500">
                  Current Balance: <strong className="text-emerald-700 font-mono">₹{user.rupeeBalance}</strong>
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Select Amount (in ₹)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePreset(p)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                      amount === p
                        ? 'bg-amazon-orange text-slate-950 shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    ₹{p}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Or Enter Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-sm font-bold text-emerald-600 font-mono">₹</span>
                <input
                  type="number"
                  min="1"
                  value={amount || ''}
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    setErrorMsg('');
                  }}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm focus:bg-white focus:outline-none focus:border-amber-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            {/* UPI ID / Payment Target */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                {mode === 'deposit' ? 'Payment Method (UPI VPA)' : 'Transfer to UPI ID'}
              </label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. yourname@oksbi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-amber-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Supports Google Pay, PhonePe, Paytm, BHIM & Bank IMPS.
              </span>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Action Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50 mt-2 ${
                mode === 'deposit'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                  : 'bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950'
              }`}
            >
              {isProcessing ? (
                <span>Processing via Payment Gateway...</span>
              ) : mode === 'deposit' ? (
                `Add ₹${amount} to Wallet`
              ) : (
                `Withdraw ₹${amount} to UPI`
              )}
            </button>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>256-Bit Encrypted Campus Ledger Transfer</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
export default WalletActionModal;
