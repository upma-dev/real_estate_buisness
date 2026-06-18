import React, { useState } from "react";
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EnquiryFormProps {
  preFilledProperty: string;
}

export default function EnquiryForm({ preFilledProperty }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    propertyInterest: preFilledProperty || "General Consultation",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto-sync preFilled changes from parent specs select triggers
  React.useEffect(() => {
    if (preFilledProperty) {
      setFormData((prev) => ({ ...prev, propertyInterest: preFilledProperty }));
    }
  }, [preFilledProperty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
       alert("Please provide at least Name and Mobile number.");
       return;
    }
    
    // Simulate API lead persist successfully
    setSubmitted(true);
  };

  const triggerWhatsAppLeadRedirect = () => {
    const defaultText = `Namaste Shree Maa Property & Construction. My name is ${formData.name}. I submitted an enquiry for "${formData.propertyInterest}". Mobile: ${formData.mobile}. My custom message: "${formData.message || 'Please schedule an in-person site visit.'}"`;
    const encoded = encodeURIComponent(defaultText);
    window.open(`https://wa.me/919755521300?text=${encoded}`, "_blank");
  };

  return (
    <section id="about" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Company details, 24 years of experience details */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-semibold text-gold-400 tracking-widest uppercase block">
                Since 2002 — Trust & Quality First
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                24 Years of <span className="text-gold-400 italic">Uncompromising</span> Building Standards
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
                Shree Maa Property and Construction has been a central pillar of trust in Ujjain’s premium architecture sector. Founded under the guidance of <strong>Ajay Verma</strong>, our focus has always been creating residential communities that endure generations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-900/60 border border-white/5 p-5 rounded-xl">
                <h4 className="text-white font-semibold font-serif mb-1">Corporate Office</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Behind V-Mart, Shahid Park, Freeganj, Ujjain, Madhya Pradesh 456010, India
                </p>
              </div>

              <div className="bg-slate-900/60 border border-white/5 p-5 rounded-xl">
                <h4 className="text-white font-semibold font-serif mb-1">Direct Contacts</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Ajay Verma: +91 97555 21300<br />
                  Office Line: +91 87330 92779
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs text-white/40 uppercase tracking-widest">Our Verified Building Capabilities</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Elite Bungalows", "Duplex Construction", "Flat Planning", "Farm Houses", "Vastu-Compliance", "Map Permissions", "Corporate Offices"].map((cap, idx) => (
                  <span key={idx} className="bg-slate-900 border border-gold-500/20 text-gold-400/90 px-3.5 py-1.5 rounded-full font-medium">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Core Interactive Lead capture form */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 border border-gold-500/30 rounded-2xl p-6 sm:p-8 relative shadow-2xl">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <span className="text-emerald-405 text-[10px] font-bold uppercase tracking-widest bg-emerald-450/10 border border-emerald-500/20 px-2.5 py-1 rounded-full inline-block mb-2 text-emerald-400">
                        ⚡ सबसे आसान तरीका / Easiest Option
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        <span>पूछताछ फॉर्म / Quick Enquiry</span>
                      </h3>
                      <p className="text-xs text-white/50 leading-relaxed">
                        नीचे दिया सरल फॉर्म भरें या सीधे नीचे दिए बटन को दबाकर व्हाट्सप्प (WhatsApp) पर बात करें। 
                      </p>
                    </div>

                    {/* Highly visible Easy WhatsApp bypass banner */}
                    <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl space-y-3 shadow-lg">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <svg className="w-5 h-5 fill-emerald-400 shrink-0" viewBox="0 0 24 24">
                          <path d="M12.008.01C5.397.01.06 5.348.057 12.008c0 2.097.546 4.142 1.587 5.946L.057 24l6.162-1.616c1.751.955 3.719 1.456 5.724 1.457 6.613 0 11.949-5.34 11.953-11.997.002-3.204-1.239-6.216-3.505-8.484C20.22 1.256 17.21.01 12.008.01zm-5.418 19.15l-.378-.225c-1.602-.953-3.1-1.453-4.704-1.453l-2.453.644.656-2.41c-.863-1.515-1.317-3.217-1.316-4.957.004-5.516 4.49-10.004 10.007-10.004 2.67 0 5.174 1.039 7.062 2.929 1.888 1.89 2.926 4.399 2.924 7.072-.008 5.516-4.494 10.004-10.01 10.004-1.6 0-3.1-.5-4.704-1.453z"/>
                        </svg>
                        <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400 font-sans">
                          बिना टाइप किए तुरंत जानकारी पाएं
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 leading-relaxed">
                        कोई फॉर्म भरना नहीं चाहते? इस हरे बटन को दबाएं, हम आपकी ओर से व्हाट्सएप पर खुद ही मैसेज तैयार कर देंगे!
                      </p>
                      <button
                        type="button"
                        onClick={triggerWhatsAppLeadRedirect}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 hover:scale-[1.01] active:scale-[0.99] text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md shadow-emerald-950 cursor-pointer"
                      >
                        <span>सीधे WhatsApp पर बात करें / 1-Tap Chat</span>
                      </button>
                    </div>

                    {/* Prefilled indicator if selected from gallery */}
                    {formData.propertyInterest && formData.propertyInterest !== "General Consultation" && (
                      <div className="bg-gold-550/10 border border-gold-550/30 p-3 rounded-xl text-xs text-gold-400 flex items-center justify-between">
                        <span>चयनित प्रॉपर्टी (Selected): <strong>{formData.propertyInterest}</strong></span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, propertyInterest: "General Consultation" }))}
                          className="text-[10px] uppercase font-bold text-red-400 hover:underline px-2 py-1"
                        >
                          बदलें (Change)
                        </button>
                      </div>
                    )}

                    {/* Step-by-Step simple form fields */}
                    <div className="space-y-4 pt-1">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/80 flex justify-between items-center">
                          <span>1. आपका नाम / Your Name <span className="text-red-500">*</span></span>
                          <span className="text-[10px] text-white/40 font-normal">पूरा नाम लिखें</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
                          <input
                            required
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="जैसे: राजेश शर्मा (Rajesh Sharma)"
                            className="bg-slate-950 border border-white/20 focus:border-gold-500/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 w-full pl-10 pr-4 py-3.5 text-xs sm:text-sm text-white"
                          />
                        </div>
                      </div>

                      {/* Mobile input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/80 flex justify-between items-center">
                          <span>2. मोबाइल नंबर / Mobile Number <span className="text-red-500">*</span></span>
                          <span className="text-[10px] text-emerald-400 font-normal">WhatsApp नंबर लिखें</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
                          <input
                            required
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="जैसे: 97555XXXXX (10 अंकों का मोबाइल)"
                            className="bg-slate-950 border border-white/20 focus:border-gold-500/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 w-full pl-10 pr-4 py-3.5 text-xs sm:text-sm text-white"
                          />
                        </div>
                      </div>

                      {/* Property Option Selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/80 block">
                          3. आप क्या ढूंढ रहे हैं? / What are you looking for?
                        </label>
                        <select
                          name="propertyInterest"
                          value={formData.propertyInterest}
                          onChange={handleInputChange}
                          className="bg-slate-950 border border-white/20 focus:border-gold-500/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 w-full px-4 py-3.5 text-xs sm:text-sm text-white cursor-pointer"
                        >
                          <option value="General Consultation">सामान्य जानकारी (General Consultation)</option>
                          <option value="Shree Maa Signature Elite Villa">श्री माँ सिग्नेचर एलीट बंगला (Premium Villa)</option>
                          <option value="The Royal Ujjain Bungalow 123">द रॉयल उज्जैन बंगला १२३ (Royal Bungalow)</option>
                          <option value="Modern Elegance Duplex House">मॉडर्न एलिगेंस डुप्लेक्स (Modern Duplex)</option>
                          <option value="Premium Luxury Highrise Penthouse">लक्ज़री फ्लैट/पेंटहाउस (Penthouse/Flats)</option>
                          <option value="Kshipra River Breeze Farmhouse">शिप्रा रिवर ब्रीज फार्महाउस (Farmhouse/Plots)</option>
                          <option value="Mahakal Commercial Plaza & Shops">कमर्शियल शॉप्स & प्लाजा (Commercial Shops)</option>
                          <option value="Rishi Nagar Classic Apartments">ऋषि नगर क्लासिक अपार्टमेंट (Rishi Nagar Flats)</option>
                          <option value="Architectural Blueprint Design">नक्शा और सिविल कंस्ट्रक्शन मार्गदर्शन (Architectural Design)</option>
                        </select>
                      </div>

                      {/* Custom Message query */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/80 block">
                          4. आपकी अन्य जरूरतें / Custom Message (Optional)
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-white/40" />
                          <textarea
                            rows={3}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="जैसे: मुझे 4 BHK मकान देखना है, या बजट बतायें..."
                            className="bg-slate-950 border border-white/20 focus:border-gold-500/80 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 w-full pl-10 pr-4 py-3 text-xs sm:text-sm text-white resize-none"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Actions Grid */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 hover:scale-[1.01] active:scale-[0.99] text-slate-950 font-bold py-4 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-gold-950"
                      >
                        <Send className="w-4 h-4 text-slate-950 shrink-0" />
                        <span>सुरक्षित पूछताछ भेजें / Submit Inquiry (Secure)</span>
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-6"
                    key="success"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl font-bold text-white">जानकारी सुरक्षित दर्ज हुई!</h4>
                      <p className="text-sm text-white/70 max-w-sm mx-auto">
                        नमस्ते <strong>{formData.name}</strong>, आपकी पूछताछ <strong>{formData.propertyInterest}</strong> के लिए श्री माँ ऑफिस में दर्ज कर ली गयी है।
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl max-w-sm mx-auto text-left border border-emerald-500/20 space-y-2.5">
                      <p className="text-xs text-gold-400 uppercase tracking-widest font-mono">⚡ तुरंत व्हाट्सएप से बातचीत लिंक</p>
                      <p className="text-xs text-white/70">
                        नक्शे, ब्लूप्रिंट या रेट-शीट तुरंत व्हाट्सएप पर पाने के लिए नीचे दिए बटन से वरिष्ठ मैनेजर अजय वर्मा जी को सीधे मैसेज भेज सकते हैं:
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 justify-center items-stretch max-w-sm mx-auto">
                      <button
                        onClick={triggerWhatsAppLeadRedirect}
                        className="bg-emerald-600 hover:bg-emerald-500 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 text-white shadow-lg cursor-pointer"
                      >
                        <span>WhatsApp पर सीधा मैसेज भेजें / Send chat</span>
                      </button>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", mobile: "", email: "", propertyInterest: "General Consultation", message: "" });
                        }}
                        className="text-xs text-gold-400 border border-gold-500/20 hover:bg-slate-800 px-5 py-3 rounded-xl transition-colors cursor-pointer"
                      >
                        दूसरा फॉर्म भरें / Submit Another
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
