import React, { useState, useEffect } from "react";
import { ArrowRight, MessageSquare, ShieldCheck, Award, ThumbsUp, Sparkles, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Curated selection of standard premium custom structural slides that correspond to Ujjain high-end builds
const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85",
    accent: "Nanakheda Signature Estate",
    tag: "High-End Double Story Architecture"
  },
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85",
    accent: "Posh Freeganj Luxury Villa 123",
    tag: "Wood-panels & Double Heights"
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85",
    accent: "Kshipra Green Retreat",
    tag: "Organic Orchards & Wellness Pools"
  },
  {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85",
    accent: "Mahananda Enclave Duplex",
    tag: "Elite Stone Cladding & Structural Perfection"
  }
];

interface HeroProps {
  onSearchFocus: () => void;
  onOpenChat: () => void;
}

export default function Hero({ onSearchFocus, onOpenChat }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide interval for high-end look
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-slate-950 flex items-center overflow-hidden pt-20">
      
      {/* Background Slideshow Container with Crossfade Transition */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>
        
        {/* Soft luxury vignettes and gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
      </div>

      {/* Floating active build accent label in the corner */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col items-end text-right">
        <div className="bg-slate-950/80 backdrop-blur-md border border-gold-500/20 px-4 py-2.5 rounded-lg">
          <p className="text-[10px] uppercase tracking-widest text-gold-400 font-bold">Featured Elevation Represent</p>
          <p className="text-sm font-semibold text-white/95">{HERO_SLIDES[currentSlide].accent}</p>
          <span className="text-[10px] text-white/50">{HERO_SLIDES[currentSlide].tag}</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 pt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* 24 Years Anniversary celebratory tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 bg-gold-400/10 border border-gold-500/30 rounded-full px-4.5 py-1.5 text-gold-400 text-xs font-semibold tracking-wide"
            >
              <Award className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '30s' }} />
              <span>Celebrating 24+ Years of Trust & Quality in Ujjain (Since 2002)</span>
            </motion.div>

            {/* Premium Big Typography */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight text-white"
              >
                Belief Brings <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-500 italic font-semibold">
                  The Change
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base sm:text-lg text-white/70 max-w-xl font-light leading-relaxed"
              >
                Under the legendary expertise of <span className="font-semibold text-white">Ajay Verma</span>, we design bespoke bungalows, luxury villas, modern apartments, and premium farmhouses that redefine the skyline of holy Ujjain. 
              </motion.p>
            </div>

            {/* Quick CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={onSearchFocus}
                className="group flex items-center justify-center gap-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold px-7 py-4 rounded-xl shadow-lg shadow-gold-500/20 transition-all duration-300 transform active:scale-95"
              >
                <span>Explore Premium Portfolio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenChat}
                className="flex items-center justify-center gap-2.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 hover:border-gold-500/30 font-medium px-6 py-4 rounded-xl transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-gold-400" />
                <span>Ask AI Property Agent</span>
              </button>
            </motion.div>

            {/* Trust highlights with pristine styling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-serif text-gold-400">24+</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Years of Trust</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-serif text-gold-400">550+</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Properties Sold</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold font-serif text-gold-400">100%</p>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Construct Approval</p>
              </div>
            </motion.div>

          </div>

          {/* Right Hero block: Elegant Visual Card demonstrating company services in Ujjain */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="bg-slate-900/90 border border-gold-500/25 p-7 rounded-2xl relative shadow-2xl luxury-glow"
            >
              <div className="absolute -top-3 -right-3 bg-red-600 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded text-white shadow">
                Ujjain Gated Sectors
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gold-400/10 rounded-lg text-gold-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-serif text-lg">Govt Approved Titles</h4>
                    <p className="text-xs text-white/50">100% verified legal papers & maps clearance.</p>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10" />

                <div className="space-y-2">
                  <p className="text-xs text-gold-400 uppercase tracking-wider font-semibold">Ajay Verma Ji&apos;s Core Guarantees</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      Premium Grade Concrete and Structural Steel
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      Modern double-cantilever exterior layout elevations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      100% Gated Secure Campus Colonies
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      Assured highest return rate near Mahakal Corridor
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <a
                    href="https://wa.me/919755521300?text=Hello%20Ajay%20Verma%20ji,%20I%20am%20interested%20in%20viewing%20your%20premium%20constructions%20in%20Ujjain.%20Please%20share%20site%20photos."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between bg-slate-950 hover:bg-slate-950/80 border border-gold-500/30 text-gold-400 font-bold p-3.5 rounded-xl transition-all duration-300 text-xs"
                  >
                    <span>Direct WhatsApp Call with Ajay Verma</span>
                    <PhoneCall className="w-4 h-4 text-emerald-500 animate-bounce" />
                  </a>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
