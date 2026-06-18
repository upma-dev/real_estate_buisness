import React, { useState } from "react";
import { MapPin, Navigation, Compass, Star, Route, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface LocationNode {
  id: string;
  name: string;
  type: string;
  address: string;
  coordinates: string;
  desc: string;
  distFromMahakal: string;
  distFromStation: string;
  safetyRating: string;
}

const MAP_LOCATIONS: LocationNode[] = [
  {
    id: "hq-office",
    name: "Shree Maa Corporate Head Office",
    type: "HQ & Builders Showroom",
    address: "Behind V-Mart, Shahid Park, Freeganj, Ujjain, MP",
    coordinates: "4.9★ (Shahid Road Sector)",
    desc: "Main consulting location. Meets with senior manager Ajay Verma. Blueprints, construction portfolios, and legal title documents are preserved here.",
    distFromMahakal: "3.2 km (8 minutes drive)",
    distFromStation: "1.4 km (4 minutes drive)",
    safetyRating: "5.0/5.0 Commercial Posh Zone"
  },
  {
    id: "nanakheda-site",
    name: "Shree Maa Signature Elite Duplexes",
    type: "Luxury Residential Site",
    address: "Near Stadium Corridor, Nanakheda, Ujjain, MP",
    coordinates: "4.8★ (Garden View)",
    desc: "Our highest premium active 4 BHK row-houses location. Complete smart concrete structures and beautiful wide roads.",
    distFromMahakal: "4.5 km (11 minutes drive)",
    distFromStation: "2.8 km (7 minutes drive)",
    safetyRating: "4.9/5.0 Quiet Elite Gated Sector"
  },
  {
    id: "mahakal-plaza",
    name: "Mahakal Corridor Commercial Hub",
    type: "Shops & Executive Suites",
    address: "Entrance Highway, Mahakal Marg, Ujjain, MP",
    coordinates: "5.0★ (Corridor Touch)",
    desc: "Premium commercial showrooms. Targets devout pilgrim traffic of over 1.5 Lakh visitors/day.",
    distFromMahakal: "0.2 km (2 minutes stroll)",
    distFromStation: "2.1 km (6 minutes drive)",
    safetyRating: "5.0/5.0 Devotional High Security"
  },
  {
    id: "kshipra-greens",
    name: "Kshipra Breeze Farmhouses & Plots",
    type: "Riverside Resort Plots",
    address: "Sanwer Highway Ghat, near Shipra River, Ujjain, MP",
    coordinates: "4.7★ (River Breeze)",
    desc: "Luxury weekend escape land parcel with private wellness pools, organic orchards, and quiet morning views.",
    distFromMahakal: "6.8 km (14 minutes drive)",
    distFromStation: "5.2 km (11 minutes drive)",
    safetyRating: "4.8/5.0 Guarded Wellness Zone"
  }
];

export default function LocalMapHolder() {
  const [selectedNode, setSelectedNode] = useState<LocationNode>(MAP_LOCATIONS[0]);

  return (
    <section id="map-section" className="py-24 bg-slate-900 border-y border-gold-500/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest block">
              Google Maps & Local Grid Integration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Interactive Ujjain <span className="text-gold-400 italic">Location Hub</span>
            </h2>
            <p className="text-sm text-white/60 font-light max-w-xl">
              Browse Shree Maa’s central office in Freeganj alongside our high-end construction sites. Select any marker to view real-world distances and transit benchmarks.
            </p>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <a
              href="https://maps.google.com/?q=Behind+V-Mart+Shahid+Park+Freeganj+Ujjain"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-950/80 border border-gold-500/20 text-gold-400/90 font-bold px-5 py-3 rounded-xl text-xs transition-all shadow"
            >
              <span>Launch Google Maps Route</span>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>

        {/* Layout Board: List on Left, Beautiful styled mock map space on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-950 rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
          
          {/* Sites Selector list */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 max-h-[500px] overflow-y-auto border-r border-white/5 bg-slate-950/90">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-gold-400" /> Currently Active Locations
            </p>

            <div className="space-y-2.5">
              {MAP_LOCATIONS.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                    selectedNode.id === node.id
                      ? "bg-gold-500/10 border-gold-400/80 text-white"
                      : "bg-slate-900/60 hover:bg-slate-900 border-white/5 text-white/70"
                  }`}
                  type="button"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    selectedNode.id === node.id ? "bg-gold-400 text-slate-950 font-bold" : "bg-slate-950 text-white/40"
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className={`font-serif text-sm font-semibold ${
                        selectedNode.id === node.id ? "text-gold-400" : "text-white"
                      }`}>
                        {node.name}
                      </h4>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide text-white/40 font-semibold block mt-0.5">{node.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Styled Spatial Map with interactive visual benchmarks */}
          <div className="lg:col-span-7 relative h-[420px] lg:h-[500px] bg-slate-950 flex flex-col justify-between overflow-hidden">
            
            {/* Visual Grid Design - styled like a tactical engineering map area */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30" />
            
            {/* Soft concentric circles representing coordinates distance ranges near Shahid Park */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-gold-500/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-gold-500/5 rounded-full pointer-events-none" />

            {/* Custom interactive pins representing the locations */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* HQ Office Pin in Freeganj Central */}
              <div 
                className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${
                  selectedNode.id === "hq-office" ? "scale-110 pointer-events-auto" : "scale-95 pointer-events-auto opacity-60"
                }`}
                style={{ top: "35%", left: "45%" }}
              >
                <button 
                  onClick={() => setSelectedNode(MAP_LOCATIONS.find(n => n.id === "hq-office")!)}
                  className="relative group cursor-pointer focus:outline-none"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-gold-500/30 text-[10px] font-bold px-2 py-1 rounded text-white shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Freeganj Office
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border animate-pulse ${
                    selectedNode.id === "hq-office" ? "bg-gold-500 border-gold-300 text-slate-950" : "bg-slate-900 border-white/20 text-gold-400"
                  }`}>
                    <Star className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {/* Nanakheda Site Pin */}
              <div 
                className={`absolute transition-transform duration-500 ${
                  selectedNode.id === "nanakheda-site" ? "scale-110 pointer-events-auto" : "scale-95 pointer-events-auto opacity-60"
                }`}
                style={{ top: "65%", left: "60%" }}
              >
                <button 
                  onClick={() => setSelectedNode(MAP_LOCATIONS.find(n => n.id === "nanakheda-site")!)}
                  className="relative group cursor-pointer focus:outline-none"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-gold-500/30 text-[10px] font-bold px-2 py-1 rounded text-white shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Nanakheda Elite
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    selectedNode.id === "nanakheda-site" ? "bg-gold-500 border-gold-300 text-slate-950" : "bg-slate-900 border-white/20 text-gold-400"
                  }`}>
                    <Navigation className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {/* Mahakal Plaza Pin */}
              <div 
                className={`absolute transition-transform duration-500 ${
                  selectedNode.id === "mahakal-plaza" ? "scale-110 pointer-events-auto" : "scale-95 pointer-events-auto opacity-60"
                }`}
                style={{ top: "45%", left: "20%" }}
              >
                <button 
                  onClick={() => setSelectedNode(MAP_LOCATIONS.find(n => n.id === "mahakal-plaza")!)}
                  className="relative group cursor-pointer focus:outline-none"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-gold-500/30 text-[10px] font-bold px-2 py-1 rounded text-white shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Mahakal Plaza Area
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    selectedNode.id === "mahakal-plaza" ? "bg-gold-500 border-gold-300 text-slate-950" : "bg-slate-900 border-white/20 text-gold-400"
                  }`}>
                    <Route className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {/* Kshipra Greens Pin */}
              <div 
                className={`absolute transition-transform duration-500 ${
                  selectedNode.id === "kshipra-greens" ? "scale-110 pointer-events-auto" : "scale-95 pointer-events-auto opacity-60"
                }`}
                style={{ top: "18%", left: "75%" }}
              >
                <button 
                  onClick={() => setSelectedNode(MAP_LOCATIONS.find(n => n.id === "kshipra-greens")!)}
                  className="relative group cursor-pointer focus:outline-none"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-gold-500/30 text-[10px] font-bold px-2 py-1 rounded text-white shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Kshipra Retreat
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    selectedNode.id === "kshipra-greens" ? "bg-gold-500 border-gold-300 text-slate-950" : "bg-slate-900 border-white/20 text-gold-400"
                  }`}>
                    <Compass className="w-4 h-4" />
                  </div>
                </button>
              </div>

            </div>

            {/* Quick visual map legend watermarks */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="text-[10px] tracking-wider uppercase font-bold text-white/40 bg-slate-900/60 border border-white/5 py-1 px-2.5 rounded-md backdrop-blur-sm">
                Map Scale: 1:15,000 | Sector-5 Sectorial Grid
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 pointer-events-none text-right">
              <p className="text-xs font-semibold text-white/40">Ujjain Corridor, MP</p>
              <p className="text-[9px] font-mono text-gold-400/60 leading-none">23.1760° N, 75.7885° E</p>
            </div>

            {/* Selected Node Details Card Overlay (Floating on bottom layer) */}
            <div className="mt-auto m-5 z-20 bg-slate-900/90 backdrop-blur-md border border-gold-500/25 p-5 rounded-xl shadow-xl space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest">{selectedNode.type}</span>
                  <h4 className="font-serif text-base font-bold text-white mt-0.5">{selectedNode.name}</h4>
                  <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-500/70" /> {selectedNode.address}
                  </p>
                </div>
                <span className="text-xs bg-slate-950 border border-white/15 py-1 px-2 rounded font-semibold text-gold-200 whitespace-nowrap font-mono">{selectedNode.coordinates}</span>
              </div>

              <p className="text-xs text-white/75 font-light leading-relaxed border-t border-white/5 pt-3">
                {selectedNode.desc}
              </p>

              {/* Distances grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-white/5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px]">Distance to Mahakal Temple</span>
                  <span className="font-medium text-white/95">{selectedNode.distFromMahakal}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white/40 text-[10px]">Safety & Neighborhood tier</span>
                  <span className="font-medium text-gold-400">{selectedNode.safetyRating}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
