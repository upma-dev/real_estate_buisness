import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { propertiesData, clientReviews } from "./src/data/properties.js";

// Load env variables
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization pattern for Gemini API
let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (aiClient) return aiClient;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
  return aiClient;
}

// REST API endpoint: Get live properties data
app.get("/api/properties", (req, res) => {
  res.json({ properties: propertiesData });
});

// REST API endpoint: Get reviews
app.get("/api/reviews", (req, res) => {
  res.json({ reviews: clientReviews });
});

// AI Chatbot endpoint for Personalized property recommendation & Smart trend analysis
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    
    // Detailed system prompt that feeds Shree Maa credentials, 24 years reputation, Ujjain location, and properties list
    const systemPrompt = `
      You are "Aarav", the exclusive 24x7 AI Sales Executive and Real Estate Expert for "Shree Maa Property and Construction" in Ujjain, Madhya Pradesh, India.
      The company has build extreme trust over the last 24 years (since 2002) led by senior real estate developer Ajay Verma.
      
      Your goal is to impress high-value clients, provide premium property recommendations, and smart price analysis based on Ujjain market trends.
      
      Here is the catalog of currently active Shree Maa properties you have access to:
      ${JSON.stringify(propertiesData, null, 2)}
      
      Here is our client testimonials:
      ${JSON.stringify(clientReviews, null, 2)}
      
      Ujjain Real Estate Key Market Trends:
      - Since the development of the "Mahakal Lok Corridor", real estate demand in Ujjain has soared.
      - Freeganj is the downtown posh market (commercial and residential high-value land, prices around ₹8,000 to ₹15,000 per sq.ft.).
      - Nanakheda is the most premium upcoming residential sector with top infrastructure, stadium, gardens (prices around ₹4,000 to ₹7,000 per sq.ft.). Suitable for high-end villas.
      - Mahananda Nagar and Rishi Nagar are highly sought after peaceful residential colonies (prices around ₹3,500 to ₹6,000 per sq.ft.).
      - Sanwer Road near Kshipra River is rapidly expanding for farmhouse and weekend retreat land parcels (starting from ₹1,200 to ₹2,500 per sq.ft.).
      
      Guidelines:
      - Always communicate in a polite, premium, professional tone. Speak primarily in clear English, but occasionally blend polite Hindi terms if requested or relevant (e.g. "Namaste", "Verma Ji", "Bilkul", "Bharosa").
      - Highlight Shree Maa's 24 years of trust, 100% bank-loan approval assistance, and premium construction quality (custom G+1 elevations, stone claddings, teak woodwork).
      - For custom recommendations: Ask the user about their preferred neighborhood, property type (Bungalow/Flat/Farmhouse), bhk requirements, and budget. Proactively match properties from our catalog!
      - For smart price analysis: Compare their budget or property query with actual trends. Highlight why Shree Maa properties are reasonably priced but yield high appreciation due to top-tier materials.
      - Always encourage booking an in-person site visit, or talking directly to Ajay Verma on WhatsApp (+919755521300).
    `;

    if (!ai) {
      // Elegant mocked response fallback matching the style if the API key is not ready
      console.log("Using intelligent fallback response (No API Key configured yet)");
      let fallbackText = "Namaste! I am Aarav, your Shree Maa Real Estate Assistant. Let me help you.\n\n";
      const query = message.toLowerCase();
      
      if (query.includes("price") || query.includes("budget") || query.includes("trend") || query.includes("analysis")) {
        fallbackText += "📊 *Ujjain Price Analysis*: After the creation of the Mahakal Lok corridor, Ujjain has seen 30-40% property appreciation. Currently, premium residential setups like *Shree Maa Signature Elite Villa* in Nanakheda is ₹1.65 Crore, which is excellent value compared to other developers (market ranges up to ₹1.9 Crore). For flats, Rishi Nagar is highly economical at ₹52 Lakhs.\n\nWould you like me to match these against your active budget? Let me know your desired budget!";
      } else if (query.includes("recommend") || query.includes("house") || query.includes("bungalow") || query.includes("flat") || query.includes("list")) {
        fallbackText += "🏡 *Personalized Recommendation*:\nBased on premier options at Shree Maa:\n1. **For Elite Luxury**: *Shree Maa Signature Elite Villa* (4 BHK Duplex, Nanakheda, ₹1.65 Cr). Complete Italian marble and bespoke wood panelling.\n2. **For central premium space**: *The Royal Ujjain Bungalow 123* (5 BHK, Freeganj, ₹2.10 Cr).\n3. **For budget comfort**: *Rishi Nagar Classic Apartment* (2 BHK Flat, ₹52 Lakhs).\n\nWhich of these matches your family's choice? I can schedule a site visit with Ajay Verma ji right away!";
      } else {
        fallbackText += "Thank you for reaching out to Shree Maa Property & Construction. With over 24 years of trusted service in Ujjain (Freeganj), we have built beautiful bungalows, high-end commercial spaces, and dream farmhouses near Kshipra River.\n\nTell me: Are you looking to buy a Ready-to-Move Bungalow, a Flat, or looking for premium constructions in Freeganj, Nanakheda, or Mahananda Nagar?";
      }
      return res.json({ text: fallbackText, isMock: true });
    }

    // Prepare message contents with history
    const contents: any[] = [];
    
    // Inject system instructions as config, other systems handle contents
    // Let's format the chat payload
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((turn: any) => {
        contents.push({
          role: turn.sender === "user" ? "user" : "model",
          parts: [{ text: turn.text }]
        });
      });
    }
    
    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I am here to guide you to your ideal property in Uujjain. Could you please specify your preferred budget or BHK size?";
    res.json({ text: replyText, isMock: false });

  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: "Something went wrong with the AI assistant. " + error.message });
  }
});

// Web/Vite Assets Pipeline Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Shree Maa Real Estate App server running on http://localhost:${PORT}`);
  });
}

startServer();
