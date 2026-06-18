import React, { useState, useEffect } from "react";
import { Phone, MapPin, Award, Building2, Menu, X, MessageSquareCode } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  onOpenChat: () => void;
  onContactClick: () => void;
}

export default function Header({ onOpenChat, onContactClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md py-3 border-b border-gold-500/20 shadow-lg"
          : "bg-gradient-to-b from-slate-950/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand/Logo Design */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center shadow-lg border border-gold-200/20 transform group-hover:scale-105 transition-all duration-300">
                <Building2 className="w-6 h-6 text-slate-950 stroke-[1.5]" />
              </div>
              <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-[9px] font-bold tracking-wider px-1 py-0.5 rounded text-white uppercase border border-slate-950">
                24 YRS
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gold-400">
                  Shree Maa
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white/50">
                  Builders
                </span>
              </div>
              <p className="text-[10px] text-white/60 tracking-wider font-light uppercase">
                Property & Construction
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm font-medium text-white/80 hover:text-gold-400 transition-colors tracking-wide"
            >
              Our Trust
            </a>
            <a
              href="#properties"
              className="text-sm font-medium text-white/80 hover:text-gold-400 transition-colors tracking-wide"
            >
              Current Properties
            </a>
            <a
              href="#map-section"
              className="text-sm font-medium text-white/80 hover:text-gold-400 transition-colors tracking-wide"
            >
              Ujjain Map
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-white/80 hover:text-gold-400 transition-colors tracking-wide"
            >
              Testimonials
            </a>
          </nav>

          {/* Desktop Callouts & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Trust badge */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-gold-500/20 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-white/90">24x7 Active Executive</span>
            </div>

            {/* AI Advisor Trigger Button */}
            <button
              onClick={onOpenChat}
              className="flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-gold-400 border border-gold-500/30 font-medium text-xs px-4 py-2 rounded-lg transition-all duration-300 transform active:scale-95 shadow"
            >
              <MessageSquareCode className="w-4 h-4 text-gold-400" />
              Talk AI Advisor
            </button>

            {/* Direct Quick Enquiry */}
            <button
              onClick={onContactClick}
              className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-bold text-xs px-5 py-2 rounded-lg transition-all duration-300 transform active:scale-95 shadow-md shadow-gold-500/10 hover:shadow-gold-500/30"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Free Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Action Icon */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenChat}
              className="p-2 bg-slate-900/60 border border-gold-500/20 text-gold-400 rounded-lg text-xs"
              title="Speak to AI Executive"
            >
              <MessageSquareCode className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-gold-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-950 border-b border-gold-500/20"
        >
          <div className="px-4 pt-2 pb-6 space-y-3">
            <div className="flex flex-col gap-1 text-slate-400 text-xs px-2 pb-2 border-b border-slate-900">
              <span className="flex items-center gap-1.5 text-gold-400/90 font-medium">
                <Award className="w-3.5 h-3.5" /> 24 Years Trusted Presence in Ujjain
              </span>
              <span className="flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5" /> Freeganj, Ujjain, MP
              </span>
            </div>
            
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white/90 hover:bg-slate-900 hover:text-gold-400 rounded-md"
            >
              Our Trust Legacy
            </a>
            <a
              href="#properties"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white/90 hover:bg-slate-900 hover:text-gold-400 rounded-md"
            >
              Current Properties
            </a>
            <a
              href="#map-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white/90 hover:bg-slate-900 hover:text-gold-400 rounded-md"
            >
              Google Maps Location
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white/90 hover:bg-slate-900 hover:text-gold-400 rounded-md"
            >
              Client Reviews
            </a>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-gold-400 border border-gold-500/30 font-semibold p-3 rounded-lg"
              >
                <MessageSquareCode className="w-5 h-5" />
                Talk Custom AI Assistant
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold p-3 rounded-lg"
              >
                <Phone className="w-4 h-4" />
                Book Free Consultation
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
