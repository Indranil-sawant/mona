"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Submit logic would go here
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="relative w-full max-w-5xl md:h-[700px] overflow-hidden rounded-none md:rounded-[40px] border-y md:border border-white/10 bg-[#0a0a0a] flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
          >
            {/* CLOSE BUTTON */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* LEFT SIDE: Brand Visual / Info */}
            <div className="md:w-5/12 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-10 md:p-14 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative z-10">
                <span className="text-xs font-black uppercase tracking-[0.5em] text-[#FFC300] mb-4 block">Reservation Only</span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">
                  THE<br />
                  SEASON<br />
                  <span className="text-[#FFC300]">AWAITS</span>
                </h2>
                <div className="h-[2px] w-20 bg-[#FFC300] mt-8" />
              </div>

              <div className="relative z-10">
                <p className="text-[#f5e6c8]/40 text-sm font-medium leading-relaxed mb-6">
                  Due to the limited harvest of our Ratnagiri Alphonso crop, we operate on a priority reservation basis. Reserve your batch now for guaranteed seasonal delivery.
                </p>
                <div className="flex gap-4">
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#FFC300]">
                    Ratnagiri, MH
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-[#FFC300]">
                    Grade A+
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#FF6A00]/5 blur-[100px] pointer-events-none" />
            </div>

            {/* RIGHT SIDE: The Form */}
            <div className="flex-1 p-10 md:p-14 relative flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="mb-10">
                      <h3 className="text-2xl font-black tracking-tight text-white mb-2">Reserve Your Collection</h3>
                      <p className="text-white/40 text-sm">Please provide your details for delivery priority.</p>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                      <div className="group flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 group-focus-within:text-[#FFC300] transition-colors">Your Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Ex: Alexander Pierce"
                          className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-white/10 outline-none focus:border-[#FFC300] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 group-focus-within:text-[#FFC300] transition-colors">Phone Number</label>
                          <input
                            required
                            type="tel"
                            placeholder="+91 —— ——— ————"
                            className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-white/10 outline-none focus:border-[#FFC300] transition-all font-mono"
                          />
                        </div>
                        <div className="group flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 group-focus-within:text-[#FFC300] transition-colors">Desired Quantity (Dozens)</label>
                          <select className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-[#FFC300] transition-all appearance-none cursor-pointer">
                            <option className="bg-[#0a0a0a]">01 Dozen</option>
                            <option className="bg-[#0a0a0a]">02 Dozens</option>
                            <option className="bg-[#0a0a0a]">05 Dozens (Family Pack)</option>
                            <option className="bg-[#0a0a0a]">10+ Dozens (Gifting)</option>
                          </select>
                        </div>
                      </div>

                      <div className="group flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 group-focus-within:text-[#FFC300] transition-colors">Delivery Location</label>
                        <input
                          required
                          type="text"
                          placeholder="Your city / locality"
                          className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder-white/10 outline-none focus:border-[#FFC300] transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-6 w-full py-6 bg-[#FFC300] text-[#0a0a0a] font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-[#FFD54F] active:scale-[0.98] shadow-[0_20px_40px_rgba(255,195,0,0.15)]"
                      >
                        Confirm Reservation Request
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 rounded-full border-2 border-[#FFC300] flex items-center justify-center mx-auto mb-8 bg-[#FFC300]/5">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFC300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">RESERVATION SENT</h3>
                    <p className="text-white/40 max-w-xs mx-auto">Thank you. Our harvest concierge will contact you within 24 hours to confirm your seasonal batch.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Glow */}
              <div className="absolute right-[-100px] bottom-[-100px] h-64 w-64 rounded-full bg-[#FFC300]/5 blur-[80px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
