import React, { useState, useRef } from "react";
import { 
  propertiesData, 
  Property, 
  ujjainNeighborhoods 
} from "../data/properties.js";
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Maximize2, 
  BedDouble, 
  ChevronRight, 
  ChevronLeft, 
  PhoneCall, 
  Share2, 
  FileCheck2, 
  Compass, 
  Layers, 
  X, 
  Activity, 
  TrendingUp,
  Search,
  SlidersHorizontal,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PropertiesGalleryProps {
  onContactSelect: (propertyTitle: string) => void;
}

export default function PropertiesGallery({ onContactSelect }: PropertiesGalleryProps) {
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  
  // Dialog Lightbox State
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Property Card Image Indices for inline card sliders
  const [cardImageIndices, setCardImageIndices] = useState<Record<string, number>>({});

  // Lightbox Image index
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  // Search input element reference to focus from Hero
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Setup inline slider next/prev handlers
  const handleNextCardImage = (e: React.MouseEvent, propId: string, maxImages: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => {
      const current = prev[propId] || 0;
      return { ...prev, [propId]: (current + 1) % maxImages };
    });
  };

  const handlePrevCardImage = (e: React.MouseEvent, propId: string, maxImages: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => {
      const current = prev[propId] || 0;
      return { ...prev, [propId]: (current - 1 + maxImages) % maxImages };
    });
  };

  // Safe WhatsApp link builder helper
  const getWhatsAppURLLink = (property: Property) => {
    const defaultText = `Namaste Shree Maa Property & Construction. I am extremely interested in your property: "${property.title}" listed in "${property.neighborhood}" neighborhood for ${property.priceFormatted}. Please share actual photos, video site tours, and organize a personal visit structure for us.`;
    return `https://wa.me/919755521300?text=${encodeURIComponent(defaultText)}`;
  };

  // Perform multi-dimensional client-side filtering
  const filteredProperties = propertiesData.filter((property) => {
    // 1. Search Query text match
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = property.title.toLowerCase().includes(searchLower);
    const descMatch = property.description.toLowerCase().includes(searchLower);
    const typeMatchText = property.type.toLowerCase().includes(searchLower);
    const matchesSearch = titleMatch || descMatch || typeMatchText;

    // 2. Neighborhood filter
    const matchesNeighborhood = selectedNeighborhood === "All" || property.neighborhood === selectedNeighborhood;

    // 3. Property Type filter
    const matchesType = selectedType === "All" || property.type === selectedType;

    // 4. Price range filter (1.0 Cr is 100 Lakhs, 60 Lakhs is 60)
    let matchesPrice = true;
    if (selectedPriceRange === "under-60") {
      matchesPrice = property.price <= 60;
    } else if (selectedPriceRange === "60-120") {
      matchesPrice = property.price > 60 && property.price <= 120;
    } else if (selectedPriceRange === "above-120") {
      matchesPrice = property.price > 120;
    }

    return matchesSearch && matchesNeighborhood && matchesType && matchesPrice;
  });

  // Sorting logic handler
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "Price: Low to High") {
      return a.price - b.price;
    }
    if (sortBy === "Price: High to Low") {
      return b.price - a.price;
    }
    if (sortBy === "Size: Large to Small") {
      const sizeA = parseInt(a.size.replace(/[^0-9]/g, "")) || 0;
      const sizeB = parseInt(b.size.replace(/[^0-9]/g, "")) || 0;
      return sizeB - sizeA;
    }
    // "Featured" / Default sort, maintain natural order
    return 0;
  });

  return (
    <section id="properties" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-500/20 px-3 py-1 rounded-full text-xs text-gold-400 font-semibold tracking-wider uppercase">
            <Bookmark className="w-3 h-3 text-gold-400 animate-pulse" />
            Premium Portfolio Listings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
            Curated Signature <span className="text-gold-400 italic">Elevations</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            Filter our certified properties in Freeganj, Nanakheda, and Mahakal Corridor. Call Ajay Verma directly for premium custom map bookings.
          </p>
        </div>

        {/* Dynamic Filters Control Panel */}
        <div className="bg-slate-900/60 border border-gold-500/15 p-6 rounded-2xl mb-12 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input Box */}
            <div className="relative md:col-span-4">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-white/40" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Bungalow, Duplex, Flat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950/90 border border-gold-500/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-400 text-sm placeholder-white/30 transition-all"
              />
            </div>

            {/* Neighborhood Tabs Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full px-4.5 py-3 bg-slate-950/90 border border-gold-500/20 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
              >
                <option value="All">All Neighborhoods (सभी क्षेत्र)</option>
                {ujjainNeighborhoods.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Price Brackets Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full px-4.5 py-3 bg-slate-950/90 border border-gold-500/20 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all"
              >
                <option value="All">All Prices (सभी बजट)</option>
                <option value="under-60">Under ₹60 Lakhs</option>
                <option value="60-120">₹60 Lakhs - ₹1.2 Crore</option>
                <option value="above-120">Luxury: Above ₹1.2 Crore</option>
              </select>
            </div>

            {/* Premium Sorting Method */}
            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4.5 py-3 bg-slate-950/90 border border-gold-500/20 rounded-xl text-sm font-semibold text-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-all cursor-pointer"
              >
                <option value="Featured">🔍 Featured</option>
                <option value="Price: Low to High">📊 Price: Low to High</option>
                <option value="Price: High to Low">📊 Price: High to Low</option>
                <option value="Size: Large to Small">📏 Size: Large to Small</option>
              </select>
            </div>

          </div>

          {/* Quick Filter Tag Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-xs text-white/40 mr-2 flex items-center gap-1.5 font-medium">
              <SlidersHorizontal className="w-3 h-3 text-gold-400" /> Filter Type:
            </span>
            {["All", "Bungalow", "House", "Flat", "Farm House", "Commercial"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  selectedType === type
                    ? "bg-gold-500 text-slate-950 font-bold"
                    : "bg-slate-950/80 hover:bg-slate-800 text-white/85 border border-white/5 hover:border-gold-500/30"
                }`}
              >
                {type === "All" ? "All Types (सभी)" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        <AnimatePresence mode="popLayout">
          {sortedProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-slate-900/30 border border-dashed border-gold-500/10 rounded-2xl"
            >
              <Building2 className="w-12 h-12 text-gold-500/40 mx-auto mb-4" />
              <p className="text-lg font-serif">No Custom Matches Found</p>
              <p className="text-sm text-white/40 mt-1.5">Try relaxing your search/budget or filter by another neighborhood area.</p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedNeighborhood("All");
                  setSelectedType("All");
                  setSelectedPriceRange("All");
                }}
                className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-gold-400 underline hover:text-gold-300"
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {sortedProperties.map((property) => {
                const activeImgIdx = cardImageIndices[property.id] || 0;
                
                return (
                  <motion.div
                    layout
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-slate-900 border border-white/5 hover:border-gold-500/25 rounded-xl overflow-hidden group shadow-lg transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5"
                  >
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-md ${
                        property.status === "Ready to Move"
                          ? "bg-emerald-950 border border-emerald-500/30 text-emerald-300"
                          : property.status === "Under Construction"
                          ? "bg-amber-950 border border-amber-500/30 text-amber-300"
                          : "bg-blue-950 border border-blue-500/30 text-blue-300"
                      }`}>
                        {property.status}
                      </span>
                    </div>

                    {/* Interactive Sub-image Slider Inside Card */}
                    <div className="relative h-64 overflow-hidden bg-slate-950">
                      <img
                        src={property.images[activeImgIdx]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Left/Right Slideshow Arrows */}
                      {property.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => handlePrevCardImage(e, property.id, property.images.length)}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-slate-950 border border-white/10 flex items-center justify-center text-white transition-opacity opacity-0 group-hover:opacity-100 z-20"
                            title="Previous structural view"
                            type="button"
                          >
                            <ChevronLeft className="w-4 h-4 text-gold-200" />
                          </button>
                          <button
                            onClick={(e) => handleNextCardImage(e, property.id, property.images.length)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-slate-950 border border-white/10 flex items-center justify-center text-white transition-opacity opacity-0 group-hover:opacity-100 z-20"
                            title="Next structural view"
                            type="button"
                          >
                            <ChevronRight className="w-4 h-4 text-gold-200" />
                          </button>
                        </>
                      )}

                      {/* Dot indicators in the bottom layer */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-slate-950/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {property.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === activeImgIdx ? "bg-gold-400 w-3" : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      
                      {/* Price & Location Title line */}
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-xl font-bold text-gold-400 font-mono">
                          {property.priceFormatted}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-white/50 tracking-wider uppercase">
                          <MapPin className="w-3.5 h-3.5 text-gold-500/70" />
                          {property.neighborhood}
                        </span>
                      </div>

                      {/* Display Header */}
                      <h3 className="font-serif text-lg font-semibold tracking-tight text-white mb-1.5 hover:text-gold-400 transition-colors">
                        {property.title}
                      </h3>
                      {property.hindiTitle && (
                        <p className="text-xs text-gold-200/60 italic font-serif mb-3">
                          {property.hindiTitle}
                        </p>
                      )}

                      {/* Short Tagline */}
                      <p className="text-xs text-white/60 font-light line-clamp-2 mb-4 leading-relaxed flex-grow">
                        {property.tagline}
                      </p>

                      {/* Custom structural layout stats */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-5 text-center text-xs font-medium">
                        <div className="flex flex-col items-center justify-center text-white/40">
                          <BedDouble className="w-4 h-4 text-gold-400/80 mb-1" />
                          <span>{property.bhk > 0 ? `${property.bhk} BHK` : "N/A Plot"}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-white/40 border-x border-white/5">
                          <Maximize2 className="w-4 h-4 text-gold-400/80 mb-1" />
                          <span className="truncate w-full px-1">{property.size}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-white/40">
                          <Layers className="w-4 h-4 text-gold-400/80 mb-1" />
                          <span className="truncate w-full px-1">{property.type}</span>
                        </div>
                      </div>

                      {/* Key features highlight */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {property.features.slice(0, 2).map((feat, idx) => (
                          <span key={idx} className="bg-slate-950/60 border border-white/5 text-[10px] text-white/50 px-2.5 py-0.5 rounded">
                            ✓ {feat}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Bottom Actions */}
                      <div className="grid grid-cols-12 gap-2 mt-auto">
                        
                        {/* More specs triggers Lightbox modal */}
                        <button
                          onClick={() => {
                            setLightboxImageIndex(0);
                            setSelectedProperty(property);
                          }}
                          className="col-span-4 bg-slate-950 hover:bg-slate-800 text-xs text-white/90 font-semibold py-2.5 rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                          title="View 4K structural specifications"
                        >
                          Specs
                        </button>

                        {/* WhatsApp pre-filled booking */}
                        <a
                          href={getWhatsAppURLLink(property)}
                          target="_blank"
                          rel="noreferrer"
                          className="col-span-8 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-extrabold py-2.5 rounded-lg flex items-center justify-center gap-1.5 group/wa shadow-sm shadow-emerald-950"
                        >
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.7 1.45 5.516 0 10.002-4.484 10.006-9.998.002-2.671-1.036-5.18-2.924-7.07C16.443 1.644 13.939.605 11.27.605 5.753.605 1.267 5.093 1.263 10.61c-.001 1.74.453 3.442 1.316 4.957l-1.01 3.684 3.784-.993zm11.533-7.534c-.312-.156-1.848-.912-2.131-1.015-.282-.104-.489-.156-.693.156-.204.312-.792.992-.971 1.2-.178.207-.357.234-.67.078-.312-.156-1.318-.485-2.51-1.548-.928-.827-1.554-1.85-1.737-2.16-.183-.31-.02-.477.136-.633.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.207.052-.39-.026-.546-.078-.156-.693-1.67-.95-2.285-.25-.6-.525-.52-.722-.53-.186-.01-.4-.01-.613-.01-.213 0-.56.08-.853.4-.293.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.307 3.32.157.21 2.26 3.45 5.476 4.84.765.33 1.36.53 1.826.68.77.24 1.47.21 2.02.13.61-.09 1.85-.75 2.11-1.44.26-.69.26-1.29.18-1.41-.08-.12-.28-.2-.59-.356z"/>
                          </svg>
                          <span>Direct Enquiry</span>
                        </a>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed Lightbox specification dialog block */}
        <AnimatePresence>
          {selectedProperty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 15 }}
                className="bg-slate-900 border border-gold-500/25 max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 bg-slate-950 hover:bg-slate-800 border border-white/10 w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:text-white z-20 cursor-pointer"
                  title="Close Dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12">
                  
                  {/* Left Column: Huge Interactive Images Slider */}
                  <div className="md:col-span-6 relative bg-slate-950 h-72 md:h-auto min-h-[300px]">
                    <img
                      src={selectedProperty.images[lightboxImageIndex]}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Left/Right Slideshow Trigger Arrows */}
                    {selectedProperty.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setLightboxImageIndex((prev) => (prev - 1 + selectedProperty.images.length) % selectedProperty.images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-white cursor-pointer"
                          title="Previous image spec"
                        >
                          <ChevronLeft className="w-5 h-5 text-gold-200" />
                        </button>
                        <button
                          onClick={() => setLightboxImageIndex((prev) => (prev + 1) % selectedProperty.images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-white cursor-pointer"
                          title="Next image spec"
                        >
                          <ChevronRight className="w-5 h-5 text-gold-200" />
                        </button>
                      </>
                    )}

                    {/* Selection indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-950/60 backdrop-blur px-3 py-1.5 rounded-full">
                      {selectedProperty.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setLightboxImageIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full ${
                            idx === lightboxImageIndex ? "bg-gold-400" : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Key specifications / 5 Year Appreciation analysis details */}
                  <div className="md:col-span-6 p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto">
                    
                    <div className="text-xs font-semibold text-gold-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" /> Checked & Gated in {selectedProperty.neighborhood}
                    </div>

                    <h3 className="font-serif text-2xl font-bold tracking-tight text-white mb-2">
                      {selectedProperty.title}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-gold-400 font-mono">
                        {selectedProperty.priceFormatted}
                      </span>
                      <span className="text-xs text-white/40">Estimated Land + Superstructure rate</span>
                    </div>

                    <p className="text-sm text-white/70 font-light leading-relaxed mb-5">
                      {selectedProperty.description}
                    </p>

                    {/* Structural Features Sheet */}
                    <div className="space-y-4 mb-6">
                      <p className="text-xs font-bold text-gold-300 uppercase tracking-widest">Premium Architectural Specifications</p>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-slate-950/60 border border-white/5 p-2.5 rounded">
                          <span className="text-white/40 block mb-0.5">Physical Area Size</span>
                          <span className="font-semibold text-white/95">{selectedProperty.size}</span>
                        </div>
                        <div className="bg-slate-950/60 border border-white/5 p-2.5 rounded">
                          <span className="text-white/40 block mb-0.5">Property Configuration</span>
                          <span className="font-semibold text-white/95">{selectedProperty.bhk > 0 ? `${selectedProperty.bhk} BHK Premium` : "Commercial"}</span>
                        </div>
                        <div className="bg-slate-950/60 border border-white/5 p-2.5 rounded">
                          <span className="text-white/40 block mb-0.5">Legal Status Certificate</span>
                          <span className="font-semibold text-white/95 flex items-center gap-1">
                            <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                            Approved Maps
                          </span>
                        </div>
                        <div className="bg-slate-950/60 border border-white/5 p-2.5 rounded">
                          <span className="text-white/40 block mb-0.5">Water & Grid Line</span>
                          <span className="font-semibold text-white/95">24x7 Guaranteed</span>
                        </div>
                      </div>
                    </div>

                    {/* 5-Year Investment & Price appreciation model */}
                    <div className="bg-slate-950/80 border border-white/5 p-4 rounded-xl mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white/90 uppercase tracking-wider flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-emerald-400" /> Direct Smart Market trend (Ujjain)
                        </span>
                        <span className="text-[10px] text-emerald-400 tracking-wide bg-emerald-950 px-1.5 py-0.5 rounded font-mono">+12.5% Avg/Yr</span>
                      </div>
                      <p className="text-[11px] text-white/50 leading-relaxed mb-3">
                        Following the expansion of the spiritual corridor, properties in {selectedProperty.neighborhood} have shown premium growth multipliers. Our builds are priced 10% lower than standard competitors with higher material grade.
                      </p>

                      {/* Interactive Apprec. simple SVG graph represent */}
                      <div className="h-16 w-full flex items-end justify-between pt-1 gap-1">
                        {[
                          { year: "2022", value: "35%", h: "25%" },
                          { year: "2023", value: "48%", h: "40%" },
                          { year: "2024", value: "65%", h: "60%" },
                          { year: "2025", value: "82%", h: "78%" },
                          { year: "2026", value: "100%", h: "100%" }
                        ].map((yearData, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center">
                            <div className="w-full bg-slate-900 border border-white/5 rounded-t-sm relative group h-12 flex items-end">
                              <div 
                                className="w-full bg-gradient-to-t from-gold-600 to-gold-400 hover:from-gold-400 hover:to-gold-300 rounded-t-sm transition-all duration-500"
                                style={{ height: yearData.h }}
                              />
                            </div>
                            <span className="text-[9px] text-white/40 mt-1 font-mono">{yearData.year}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Panel in Modal */}
                    <div className="grid grid-cols-2 gap-3 mt-auto">
                      
                      {/* Enquiry form trigger */}
                      <button
                        onClick={() => {
                          onContactSelect(selectedProperty.title);
                          setSelectedProperty(null);
                        }}
                        className="bg-slate-950 hover:bg-slate-800 text-gold-400 border border-gold-500/20 font-bold p-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                        <span>Book Site Visit</span>
                      </button>

                      {/* WhatsApp Trigger */}
                      <a
                        href={getWhatsAppURLLink(selectedProperty)}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold p-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow"
                      >
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                          <path d="M12.008.01C5.397.01.06 5.348.057 12.008c0 2.097.546 4.142 1.587 5.946L.057 24l6.162-1.616c1.751.955 3.719 1.456 5.724 1.457 6.613 0 11.949-5.34 11.953-11.997.002-3.204-1.239-6.216-3.505-8.484C20.22 1.256 17.21.01 12.008.01zm-5.418 19.15l-.378-.225c-1.602-.953-3.1-1.453-4.704-1.453l-2.453.644.656-2.41c-.863-1.515-1.317-3.217-1.316-4.957.004-5.516 4.49-10.004 10.007-10.004 2.67 0 5.174 1.039 7.062 2.929 1.888 1.89 2.926 4.399 2.924 7.072-.008 5.516-4.494 10.004-10.01 10.004-1.6 0-3.1-.5-4.704-1.453z"/>
                        </svg>
                        <span>WhatsApp Ajay</span>
                      </a>

                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
