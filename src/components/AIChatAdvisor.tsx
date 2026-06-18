import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquareCode, 
  Send, 
  X, 
  Sparkles, 
  Bot, 
  User, 
  ArrowRight, 
  HelpCircle, 
  TrendingUp, 
  Home, 
  CornerDownRight,
  PhoneCall,
  Minimize2,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface AIChatAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyPrompt?: string;
}

const QUICK_PROMPTS = [
  {
    label: "Recommend 4 BHK in Nanakheda",
    text: "Please recommend a luxury 4 BHK bungalow in the Nanakheda neighborhood with detailed smart specifications.",
    icon: Home
  },
  {
    label: "Analyze Freeganj Price Trends",
    text: "Can you provide a smart price analysis of real estate in Freeganj, Ujjain compared to Mahananda Nagar?",
    icon: TrendingUp
  },
  {
    label: "Properties under ₹60 Lakhs",
    text: "What properties or apartments are available in Ujjain under a budget of ₹60 Lakhs with Shree Maa?",
    icon: HelpCircle
  }
];

export default function AIChatAdvisor({ isOpen, onClose, initialPropertyPrompt }: AIChatAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "message-init",
      sender: "ai",
      text: "Namaste! 🙏 I am **Aarav**, your 24x7 Shree Maa smart virtual advisor.\nWith over **24 years of construction legacy in Ujjain**, I can guide you on premium duplexes, available plots, and current market appreciation trends. \n\nHow can I help you realize your brick-and-mortar goals today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Trigger prompt if the user selects a property from the gallery
  useEffect(() => {
    if (initialPropertyPrompt && isOpen) {
      handleSend(initialPropertyPrompt);
    }
  }, [initialPropertyPrompt, isOpen]);

  // Scroll to bottom whenever messages list grows
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const rawMessage = textToSend || inputText;
    if (!rawMessage.trim()) return;

    if (!textToSend) {
      setInputText("");
    }

    // Append user message
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: rawMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: rawMessage,
          chatHistory: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error("Unable to establish connect with AI server.");
      }

      const data = await response.json();
      
      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        sender: "ai",
        text: data.text || "Apologies, I encountered a temporary signal mismatch. Please retry or contact senior advisor Ajay Verma on WhatsApp directly (+919755521300).",
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Fetch AI error:", err);
      const errorMsg: Message = {
        id: `msg-${Date.now()}-err`,
        sender: "ai",
        text: "System response fallback: I am experiencing network limits right now. In the meantime, you can easily obtain real-time custom quotes, layouts & pricing sheets directly by texting **Ajay Verma ji** at **+91 97555 21300**. Shall I help you redirect there?",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Simple custom text-to-HTML parser (handles **bold**, lists, and headers)
  const formatMessageText = (txt: string) => {
    const lines = txt.split("\n");
    return lines.map((line, lIdx) => {
      let formatted = line;
      
      // Look for list markdown like "1. " or "* "
      const isList = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      const isOrderedList = /^\d+\.\s/.test(line.trim());
      
      // Replacing bold indicators with robust style highlights
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-gold-300 font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const contentNode = parts.length > 0 ? parts : formatted;

      if (isList) {
        return (
          <li key={lIdx} className="ml-5 list-disc text-white/80 my-1 text-xs">
            {contentNode}
          </li>
        );
      }
      if (isOrderedList) {
        return (
          <div key={lIdx} className="ml-5 text-white/80 my-1 flex items-start gap-1.5 text-xs">
            <CornerDownRight className="w-3.5 h-3.5 text-gold-400 mt-0.5 shrink-0" />
            <span>{contentNode}</span>
          </div>
        );
      }

      return (
        <p key={lIdx} className="text-xs sm:text-sm text-white/90 leading-relaxed mb-2.5">
          {contentNode}
        </p>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] z-50 bg-slate-950 border-l border-gold-500/25 flex flex-col shadow-2xl overflow-hidden">
          
          {/* AI Header */}
          <div className="bg-slate-900 border-b border-gold-500/20 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-gold-400 to-gold-600 rounded-xl flex items-center justify-center text-slate-950 shadow-md">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
                  Shree Maa AI Expert
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Live Server Connected" />
                </h4>
                <p className="text-[10px] text-gold-400/80 uppercase tracking-widest font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-gold-400" />
                  Personalized advice & trends
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([
                  {
                    id: "message-init-renew",
                    sender: "ai",
                    text: "Namaste! 🙏 Thread renewed. I am Aarav. Tell me, are you searching for a property in Nanakheda, Freeganj or near Kshipra ghat? Let's analyze!",
                    timestamp: new Date()
                  }
                ])}
                className="p-2 hover:bg-slate-800 text-white/50 hover:text-white rounded-lg cursor-pointer"
                title="Reset Conversation Thread"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 text-white/50 hover:text-white rounded-lg cursor-pointer"
                title="Minimise Advisor Panel"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 overflow-y-auto p-5 scrollbar space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Profile Badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                  msg.sender === "user" 
                    ? "bg-gold-500 border-gold-400 text-slate-950" 
                    : "bg-slate-900 border-gold-500/25 text-gold-400"
                }`}>
                  {msg.sender === "user" ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
                </div>

                {/* Message Bubble */}
                <div className={`p-3.5 rounded-2xl text-xs sm:text-sm ${
                  msg.sender === "user"
                    ? "bg-gold-650/45 text-white border border-gold-500/30 rounded-tr-none"
                    : "bg-slate-900/90 text-white border border-white/5 rounded-tl-none shadow"
                }`}>
                  {formatMessageText(msg.text)}
                  <span className="text-[9px] text-white/30 block mt-1.5 text-right font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Waiting/Typing Loader */}
            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-900 border border-gold-500/25 text-gold-400 font-bold shrink-0">
                  <Bot className="w-4.5 h-4.5 animate-spin" />
                </div>
                <div className="p-4 bg-slate-900/90 rounded-2xl rounded-tl-none border border-white/5">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className="text-[10px] text-white/40 mt-2 font-mono uppercase tracking-widest leading-none">Aarav is analyzing market databases...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick interactive guidelines & prompts shown if no pending load */}
          {!loading && (
            <div className="p-4 bg-slate-950 border-t border-slate-900 space-y-2">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">Suggested Inquiries</p>
              <div className="flex flex-col gap-1.5">
                {QUICK_PROMPTS.map((prompt, idx) => {
                  const IconComp = prompt.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt.text)}
                      className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-900/80 border border-white/5 hover:border-gold-500/25 rounded-xl text-xs text-white/80 transition-all flex items-center gap-2"
                      type="button"
                    >
                      <IconComp className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span className="truncate">{prompt.label}</span>
                      <ArrowRight className="w-3 h-3 text-white/30 ml-auto shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input field */}
          <div className="p-4 bg-slate-900 border-t border-gold-500/20 flex gap-2">
            <input
              type="text"
              placeholder="Ask Aarav about property investment..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
              className="flex-1 bg-slate-950 border border-gold-500/20 focus:outline-none focus:ring-1 focus:ring-gold-400 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !inputText.trim()}
              className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-50 transition-colors shadow shadow-gold-500/10 cursor-pointer"
              title="Send Prompt message"
              type="button"
            >
              <Send className="w-4.5 h-4.5 text-slate-950 stroke-[2.5]" />
            </button>
          </div>

          {/* Prompt panel details redirect */}
          <div className="p-3 bg-slate-950 border-t border-slate-900 text-center text-[10px] text-white/40 flex items-center justify-center gap-2">
            <span>Talk with senior executive?</span>
            <a
              href="https://wa.me/919755521300?text=Hi%20Ajay%20Verma%20ji,%20I%20am%20chatting%20with%20your%20AI%20and%20would%20love%20to%20get%20a%20site%20visit."
              target="_blank"
              rel="noreferrer"
              className="font-bold text-gold-400 flex items-center gap-1 hover:underline"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" /> WhatsApp Ajay Verma
            </a>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
