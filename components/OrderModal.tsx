"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderModal({ isOpen, onClose }: OrderModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/20 bg-[#1a1a1a]/90 p-8 md:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {/* Mango Glow Background */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FFC300]/10 blur-[80px]" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#FF6A00]/10 blur-[80px]" />

            {/* Header */}
            <div className="relative z-10 mb-8 text-center">
              <h2 className="text-3xl font-black tracking-tighter text-white md:text-4xl text-shimmer">
                RESERVE YOUR <span className="text-[#FFC300]">HARVEST</span>
              </h2>
              <p className="mt-2 font-medium text-[#f5e6c8]/60">
                Experience the world&apos;s finest Ratnagiri Alphonso.
              </p>
            </div>

            {/* Form */}
            <form className="relative z-10 flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFC300]/80 px-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/20 outline-none transition-all focus:border-[#FFC300]/50 focus:bg-white/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#FFC300]/80 px-1">Quantity (Dozens)</label>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all focus:border-[#FFC300]/50 focus:bg-white/10"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#FFC300]/80 px-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/20 outline-none transition-all focus:border-[#FFC300]/50 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#FFC300]/80 px-1">Delivery Address</label>
                <textarea
                  placeholder="Enter your full address..."
                  rows={3}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/20 outline-none transition-all focus:border-[#FFC300]/50 focus:bg-white/10"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-gradient-to-r from-[#FFC300] to-[#FF6A00] py-5 text-sm font-black uppercase tracking-widest text-[#1a1a1a] shadow-[0_8px_32px_rgba(255,195,0,0.3)] transition-all hover:scale-[1.02] active:scale-95"
              >
                Send Reserve Request
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-widest text-white/40 transition-colors hover:text-white"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
