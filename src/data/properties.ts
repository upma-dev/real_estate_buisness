export interface Property {
  id: string;
  title: string;
  hindiTitle?: string;
  type: 'Bungalow' | 'House' | 'Flat' | 'Farm House' | 'Commercial' | 'Plot';
  price: number; // in Lakhs (e.g., 120 = 1.2 Crore)
  priceFormatted: string;
  neighborhood: string;
  bhk: number;
  size: string; // e.g. "2400 sq.ft."
  status: 'Ready to Move' | 'Under Construction' | 'Booking Open';
  description: string;
  tagline: string;
  image: string; // High-quality architectural render representation
  images: string[];
  features: string[];
  ownerNumber: string;
  locationDetails: string;
}

export const ujjainNeighborhoods = [
  "Freeganj",
  "Nanakheda",
  "Mahananda Nagar",
  "Rishi Nagar",
  "Mahakal Marg",
  "Sanwer Road",
  "Vasant Vihar"
];

export const propertiesData: Property[] = [
  {
    id: "prop-1",
    title: "Shree Maa Signature Elite Villa",
    hindiTitle: "श्री माँ सिग्नेचर एलीट विला",
    type: "Bungalow",
    price: 165, // 1.65 Crore
    priceFormatted: "₹1.65 Crore",
    neighborhood: "Nanakheda",
    bhk: 4,
    size: "3,200 sq.ft.",
    status: "Ready to Move",
    tagline: "Ultra-modern architectural marvel with wooden detailing & ambient terrace lighting.",
    description: "A premium 4 BHK double-story custom villa with rich wood finish cladding, dark grey accent bounds, custom balcony planters, and architectural cove light ceilings. Fully modular kitchen, Italian marble floors, and 24x7 water safety.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["4 BHK Duplex", "Modular Kitchen", "Terrace Garden Space", "Italian Marble Flooring", "Vastu Compliant"],
    ownerNumber: "+919755521300",
    locationDetails: "Near Nanakheda Stadium, Ujjain"
  },
  {
    id: "prop-2",
    title: "Modern Elegance Duplex House",
    hindiTitle: "मॉडर्न एलिगेंस डुप्लेक्स हाउस",
    type: "House",
    price: 95, // 95 Lakhs
    priceFormatted: "₹95 Lakhs",
    neighborhood: "Mahananda Nagar",
    bhk: 3,
    size: "2,100 sq.ft.",
    status: "Under Construction",
    tagline: "Stylish, highly efficient G+1 duplex with custom slate-stone facade.",
    description: "Active high-quality construction project. Perfect execution of concrete tile facades, double glazed window fixtures, and beautiful exterior grey textured plaster. Perfect for a family looking to customize the final paint & tiles.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["3 BHK G+1 Duplex", "Private Car Parking", "Slate Stone Facade", "Customizable Interiors", "Bank Loan Approved"],
    ownerNumber: "+918733092779",
    locationDetails: "Behind Mahananda Nagar Garden, Ujjain"
  },
  {
    id: "prop-3",
    title: "The Royal Ujjain Bungalow 123",
    hindiTitle: "द रॉयल उज्जैन बंगला १२३",
    type: "Bungalow",
    price: 210, // 2.1 Crore
    priceFormatted: "₹2.10 Crore",
    neighborhood: "Freeganj",
    bhk: 5,
    size: "4,500 sq.ft.",
    status: "Ready to Move",
    tagline: "Elite stone-wrapped landmark with wooden gates, luxury balconies, and manicured lawns.",
    description: "Designed for premium buyers. Features premium structural cantilever layouts, natural sandstone cladding, warm up-lighting elevations, and majestic black metal gates. Set right in the heart of Ujjain's posh sector.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["5 BHK Luxury Bungalow", "Double Height Living Room", "Stone Cladding Facade", "Smart Home Integration", "Premium Freeganj Location"],
    ownerNumber: "+919755521300",
    locationDetails: "Posh Colony, Behind Shahid Park, Freeganj, Ujjain"
  },
  {
    id: "prop-4",
    title: "Premium Luxury Highrise Penthouse",
    hindiTitle: "प्रीमियम लक्ज़री पेंटहाउस",
    type: "Flat",
    price: 110, // 1.10 Crore
    priceFormatted: "₹1.10 Crore",
    neighborhood: "Nanakheda",
    bhk: 3,
    size: "2,400 sq.ft.",
    status: "Ready to Move",
    tagline: "Spectacular panoramic city views from highly ventilated top-floor luxury flats.",
    description: "Located on the uppermost floors with complete cross-ventilation, wooden vitrified decks, premium bath fittings, and direct lift accessibility. Secure gated society with high levels of landscaping and children play areas.",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["3 BHK Premium Penthouse", "3 Large Balconies", "24x7 Power Backup", "Covered Basement Parking", "Modern Clubhouse Access"],
    ownerNumber: "+919755521300",
    locationDetails: "Premium Heights, Harifatak Overpass Road, Nanakheda, Ujjain"
  },
  {
    id: "prop-5",
    title: "Kshipra River Breeze Farmhouse",
    hindiTitle: "शिप्रा रिवर ब्रीज फार्महाउस",
    type: "Farm House",
    price: 240, // 2.40 Crore
    priceFormatted: "₹2.40 Crore",
    neighborhood: "Sanwer Road",
    bhk: 4,
    size: "6,000 sq.ft. (Plot: 20k sq.ft.)",
    status: "Booking Open",
    tagline: "Elite nature retreat near the sacred Kshipra river with organic orchards & swimming pool.",
    description: "Experience absolute calmness away from Ujjain city traffic. Built with local sandstone accents, majestic high wooden roofs, spacious modular lounges, and an expansive organic farming acreage ideal for multi-generational rest.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["4 BHK Luxury Estate", "Private Swimming Pool", "Fully Landscaped Garden", "20,000 sq.ft. Land Parcel", "24/7 Security Patrol"],
    ownerNumber: "+918733092779",
    locationDetails: "Sanwer Road, Near Shipra River Ghat, Ujjain"
  },
  {
    id: "prop-6",
    title: "Mahakal Commercial Plaza & Shops",
    hindiTitle: "महाकाल कमर्शियल प्लाजा और शॉप्स",
    type: "Commercial",
    price: 75, // Starting from 75 Lakhs
    priceFormatted: "₹75 Lakhs - ₹2.5 Cr",
    neighborhood: "Mahakal Marg",
    bhk: 0,
    size: "500 - 1,800 sq.ft.",
    status: "Booking Open",
    tagline: "Prime location commercial units targeting high devout tourism footfall.",
    description: "Excellent commercial investment opportunities directly on the newly expanded Mahakal Marg. Ground level showrooms & upper floor corporate office suites. High ROI prospect due to central religious tourism focus.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Double height entry lobby", "100% Power backup", "High-speed capsule lifts", "Dedicated client valet parking", "Fire suppression safety guidelines"],
    ownerNumber: "+919755521300",
    locationDetails: "Mahakal Corridor Entrance Highway, Ujjain"
  },
  {
    id: "prop-7",
    title: "Rishi Nagar Classic Apartments",
    hindiTitle: "ऋषि नगर क्लासिक अपार्टमेंट्स",
    type: "Flat",
    price: 52, // 52 Lakhs
    priceFormatted: "₹52 Lakhs",
    neighborhood: "Rishi Nagar",
    bhk: 2,
    size: "1,150 sq.ft.",
    status: "Ready to Move",
    tagline: "Affordable premium 2 BHK flat inside quiet, residential sector of Rishi Nagar.",
    description: "Highly practical, beautifully planned 2 BHK flat layout with custom modular woodwork, separate prayer room, covered parking, and solar water heaters. Close to premium schools and healthcare clinics.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["2 BHK Spacious Layout", "Solar Water Heating", "Vastu Compliant Orient", "Gated Security", "Intercom Facility"],
    ownerNumber: "+919755521300",
    locationDetails: "Near Sai Mandir Ground, Rishi Nagar, Ujjain"
  }
];

export const clientReviews = [
  {
    id: "rev-1",
    author: "Kamlesh Sharma",
    role: "Bungalow Owner, Freeganj",
    review: "Shree Maa Property built our beautiful duplex in Freeganj. Ajay Verma ji's construction quality is second to none. Best builders in Ujjain with 24 years of absolute trust!",
    stars: 5,
    date: "May 2026"
  },
  {
    id: "rev-2",
    author: "Dr. Rajesh Vyas",
    role: "Retrenched Prof, Nanakheda",
    review: "Highly transparent dealings. They helped with clear title checking, bank loans, and delivered our Ready-To-Move villa ahead of schedule. Truly professional team.",
    stars: 5,
    date: "April 2026"
  },
  {
    id: "rev-3",
    author: "Pradeep Agrawal",
    role: "Commercial Investor",
    review: "Shree Maa Team's market analysis has been perfect. Their suggestion to invest near the Mahakal corridor yielded remarkable early appreciation. Strongly recommended!",
    stars: 5,
    date: "June 2026"
  }
];
