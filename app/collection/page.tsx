"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      <Navbar />

      <section className="container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-[#FFC300] mb-4 block">
            The 2024 Harvest
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 text-shimmer leading-[0.85]">
            OUR PREMIER<br />MANGO COLLECTION
          </h1>
          <p className="text-xl md:text-2xl text-[#f5e6c8]/60 font-medium max-w-2xl leading-tight">
            Curating only the most exceptional Alphonso mangoes from our heritage orchards in Ratnagiri.
          </p>
        </motion.div>

        {/* Categories / Grid Placeholder */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * i, duration: 0.8 }}
              className="h-[500px] rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl p-10 flex flex-col justify-end group transition-all hover:bg-white/[0.08]"
            >
              <h3 className="text-3xl font-black mb-2">Collection {i}</h3>
              <p className="text-[#f5e6c8]/40 mb-6 font-medium lowercase">Exclusive selection · Limited batch</p>
              <div className="flex justify-between items-center text-[#FFC300] font-black uppercase text-xs tracking-widest">
                Explore Box →
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA mockup */}
      <footer className="py-20 text-center text-[#f5e6c8]/20 text-xs font-bold uppercase tracking-[1em]">
        MONA MANGOES · Est. 2024
      </footer>
    </main>
  );
}
