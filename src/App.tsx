import React, { useState } from "react";
import { 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Bookmark, 
  Sparkles, 
  MessageCircleCode, 
  Star, 
  Quote, 
  UserCheck2,
  CheckCircle,
  Clock,
  Handshake,
  SearchCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import PropertiesGallery from "./components/PropertiesGallery.js";
import EnquiryForm from "./components/EnquiryForm.js";
import LocalMapHolder from "./components/LocalMapHolder.js";
import AIChatAdvisor from "./components/AIChatAdvisor.js";
import { clientReviews } from "./data/properties.js";

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [prefilledPropertyInterest, setPrefilledPropertyInterest] = useState("General Consultation");
  const [aiCustomPromptMessage, setAiCustomPromptMessage] = useState("");

  const handleOpenChatWithPrompt = (msgText: string) => {
    setAiCustomPromptMessage(msgText);
    setChatOpen(true);
  };

  const handleFocusSearch = () => {
    const propsSection = document.getElementById("properties");
    if (propsSection) {
      propsSection.scrollIntoView({ behavior: "smooth" });
      // Find search input and focus
      const searchInput = propsSection.querySelector("input");
      if (searchInput) {
        (searchInput as HTMLInputElement).focus();
      }
    }
  };

  const handleSelectPropertyForEnquiry = (propertyTitle: string) => {
    setPrefilledPropertyInterest(propertyTitle);
    const enquirySection = document.getElementById("about");
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const leaveReviewWhatsAppRedirect = () => {
    const defaultText = "Namaste Ajay Verma ji. I would love to leave a 5-star review for Shree Maa Property and Construction! My feedback is: ";
    window.open(`https://wa.me/919755521300?text=${encodeURIComponent(defaultText)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-gold-500 selection:text-slate-950 overflow-x-hidden antialiased">
      
      {/* Header */}
      <Header 
        onOpenChat={() => setChatOpen(true)} 
        onContactClick={() => {
          setPrefilledPropertyInterest("General Consultation");
          const aboutSection = document.getElementById("about");
          aboutSection?.scrollIntoView({ behavior: "smooth" });
        }} 
      />

      {/* Hero Section */}
      <Hero 
        onSearchFocus={handleFocusSearch} 
        onOpenChat={() => setChatOpen(true)} 
      />

      {/* Floating Sparkly AI Advisor prompt widget - catches attention */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <motion.button
          onClick={() => setChatOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-900/95 text-gold-400 border border-gold-500/30 pl-4.5 pr-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer hover:border-gold-400 max-w-sm luxury-glow"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-400 to-gold-600 flex items-center justify-center">
              <MessageCircleCode className="w-4.5 h-4.5 text-slate-950" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-slate-900" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-[#aa842c] font-extrabold leading-none">24x7 Virtual Guide</p>
            <p className="text-xs font-semibold text-white/90 mt-1">Talk to Real Estate AI Agent</p>
          </div>
        </motion.button>
      </div>

      {/* Properties Showcase with sorting & interactive spec Lightbox sheets */}
      <PropertiesGallery onContactSelect={handleSelectPropertyForEnquiry} />

      {/* Interactive Google Maps Hub & neighborhood rates dashboard */}
      <LocalMapHolder />

      {/* Company Experience & Gated Trust metrics */}
      <section className="py-20 bg-slate-950/80 border-t border-white/5 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-xl space-y-3">
              <Clock className="w-8 h-8 text-gold-400" />
              <h4 className="font-serif text-lg font-bold">24x7 Active Desk</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Whether seeking a customized price model or scheduling a holiday site tour, Ajay Verma ji’s sales desk is perpetually online for our clients.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-xl space-y-3">
              <Award className="w-8 h-8 text-gold-400" />
              <h4 className="font-serif text-lg font-bold">24 Years Legacy</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Established in 2002. Since then, we have built absolute trust near Shahid Park, Freeganj, and are respected as core civil contractors in Ujjain.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-xl space-y-3">
              <Handshake className="w-8 h-8 text-gold-400" />
              <h4 className="font-serif text-lg font-bold">Bank Loan approved</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                We maintain active title clearances with State Bank of India (SBI), HDFC, can secure 90% loan approvals within 7 working days.
              </p>
            </div>

            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-xl space-y-3">
              <UserCheck2 className="w-8 h-8 text-gold-400" />
              <h4 className="font-serif text-lg font-bold">Vastu Clearance</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                All row houses and flats designed by our senior architects follow strict Vastu rules for healthy living, prosperity, and peace.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Client Reviews Section with direct link to WhatsApp feedback */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest block">
              Grounded Testimonials — 24 Years Trust
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              What Ujjain <span className="text-gold-400 italic">Says About Us</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50">
              Trusted by professionals, doctors, and commercial managers. Read our real clients’ reviews or join over 500+ satisfied families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {clientReviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-slate-950/90 border border-white/5 p-6 sm:p-8 rounded-2xl relative flex flex-col justify-between shadow-lg"
              >
                <div className="absolute top-6 right-6 text-gold-500/25">
                  <Quote className="w-8 h-8" />
                </div>

                <div className="space-y-4">
                  {/* Stars block */}
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400" />
                    ))}
                  </div>

                  {/* Paragraph text */}
                  <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed italic">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 mt-6 border-t border-white/5 pt-4">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white">{rev.author}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">{rev.role}</p>
                  </div>
                  <span className="text-[10px] font-mono text-gold-500/70">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to leave review or feedback - satisfies review direct whatsapp requirement */}
          <div className="bg-slate-950 border border-gold-500/15 p-6 rounded-2xl max-w-2xl mx-auto text-center space-y-4 shadow">
            <div className="flex items-center justify-center gap-1.5 text-gold-300">
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Help us grow our Ujjain presence</span>
              <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-lg mx-auto">
              Are you a proud Shree Maa property buyer? Tap below to automatically compose an enquiry, leave a review feedback or send a direct rating message to Ajay Verma ji!
            </p>
            <button
              onClick={leaveReviewWhatsAppRedirect}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs px-6 py-3 rounded-lg transition-all"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12.008.01C5.397.01.06 5.348.057 12.008c0 2.097.546 4.142 1.587 5.946L.057 24l6.162-1.616c1.751.955 3.719 1.456 5.724 1.457 6.613 0 11.949-5.34 11.953-11.997.002-3.204-1.239-6.216-3.505-8.484C20.22 1.256 17.21.01 12.008.01zm-5.418 19.15l-.378-.225c-1.602-.953-3.1-1.453-4.704-1.453l-2.453.644.656-2.41c-.863-1.515-1.317-3.217-1.316-4.957.004-5.516 4.49-10.004 10.007-10.004 2.67 0 5.174 1.039 7.062 2.929 1.888 1.89 2.926 4.399 2.924 7.072-.008 5.516-4.494 10.004-10.01 10.004-1.6 0-3.1-.5-4.704-1.453z"/>
              </svg>
              <span>Compose Review on WhatsApp</span>
            </button>
          </div>

        </div>
      </section>

      {/* Direct Enquiry Section with prefilled states */}
      <EnquiryForm preFilledProperty={prefilledPropertyInterest} />

      {/* Floating AI Panel (Talk AI Advisor) */}
      <AIChatAdvisor 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        initialPropertyPrompt={aiCustomPromptMessage}
      />

      {/* Footer detailing rich SEO keywords for Google search visibility enhancement */}
      <footer className="bg-slate-950 border-t border-white/5 py-12 text-sm text-white/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4 border-b border-white/5 pb-8">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-bold tracking-tight text-gold-400">Shree Maa</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Builders</span>
              </div>
              <p className="text-[11px] text-white/40 uppercase tracking-widest font-light mt-1">Belief Brings the Change | Since 2002</p>
            </div>
            
            <p className="text-xs text-white/40">
              Senior Property Consultant: <span className="font-semibold text-white/80">Ajay Verma (+91 97555-21300)</span>
            </p>
          </div>

          {/* SEO keyword visual sheet - clearly explains to client how they will hit page ranks */}
          <div className="bg-slate-900/60 border border-white/5 p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-gold-400">
              <SearchCheck className="w-4.5 h-4.5 text-gold-400 animate-pulse" />
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#aa842c]">Google Search Visibility Indicators</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              We have integrated metadata structures and human-friendly semantic elements to optimize search rankings in Madhya Pradesh. Your prospective buyers looking up the following active keywords will discover your properties direct routes:
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-white/50 select-all font-mono">
              {[
                "Best Property in Freeganj Ujjain",
                "Shree Maa Property & Construction",
                "Ajay Verma Real Estate Builder Ujjain",
                "Buy 4 BHK Bungalow Nanakheda",
                "Durable Civil Contractors Ujjain",
                "Sacred Kshipra River Farmhouses buy",
                "Ready to move Duplex flats Rishi Nagar",
                "Commercial showrooms on Mahakal corridor highway",
                "Property Broker in Mahananda Nagar"
              ].map((term, i) => (
                <span key={i} className="bg-slate-950 border border-white/5 px-2.5 py-1 rounded">
                  {term}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/30 pt-4">
            <p>© 2026 Shree Maa Property & Construction. All Rights Reserved. Co-crafted by AI Builder Workspace.</p>
            <p className="mt-2 sm:mt-0 flex items-center gap-1">
              Registered RERA Madhya Pradesh | Certified Vastu Planners
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
