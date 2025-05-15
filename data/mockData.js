// Mock data for development purposes
import * as Crypto from 'expo-crypto';

// Funzione per generare UUID utilizzando expo-crypto
const generateUUID = () => {
  return Crypto.randomUUID();
};

// Reference coordinates - Lecce, Italy
const LECCE_COORDS = {
  latitude: 40.351,
  longitude: 18.1719
};

// Mock events data
export const events = [
  {
    id: generateUUID(),
    title: "Ballast",
    organizerName: "Alezio",
    time: "22:00",
    date: new Date(2025, 4, 13), // May 13, 2025
    location: {
      name: "Alezio",
      latitude: 40.0648,
      longitude: 18.058,
      distanceKm: 9.8,
    },
    image: "https://via.placeholder.com/400x300/FF458F/FFFFFF?text=Ballast",
    description: "Evento musicale con artisti locali e internazionali",
    featured: true,
    tags: ["musica", "live", "dj"],
    vendors: ["v1", "v2", "v3"]
  },
  {
    id: generateUUID(),
    title: "Tuesday Vibes MC",
    organizerName: "Morrison's Pub",
    time: "22:30",
    date: new Date(2025, 4, 14), // May 14, 2025
    location: {
      name: "Martano",
      latitude: 40.1987,
      longitude: 18.3127,
      distanceKm: 18.4,
    },
    image: "https://via.placeholder.com/400x300/A269FF/FFFFFF?text=Tuesday+Vibes",
    description: "Serata di musica e divertimento al Morrison's Pub",
    featured: false,
    tags: ["pub", "dj", "cocktail"],
    vendors: ["v4", "v5"]
  },
  {
    id: generateUUID(),
    title: "Jam Session",
    organizerName: "Marquinhos",
    time: "21:30",
    date: new Date(2025, 4, 14), // May 14, 2025
    location: {
      name: "Uggiano La Chiesa",
      latitude: 40.097,
      longitude: 18.4308,
      distanceKm: 24.1,
    },
    image: "https://via.placeholder.com/400x300/FF7A3D/FFFFFF?text=Jam+Session",
    description: "Jam session aperta a tutti i musicisti. Porta il tuo strumento!",
    featured: false,
    tags: ["musica", "live", "jam"],
    vendors: ["v6"]
  },
  {
    id: generateUUID(),
    title: "Mandrake & Soci on Stage",
    organizerName: "The Lesionati Band",
    time: "22:00",
    date: new Date(2025, 4, 26), // May 26, 2025
    location: {
      name: "Lecce",
      latitude: 40.351,
      longitude: 18.1719,
      distanceKm: 0.5,
    },
    image: "https://via.placeholder.com/400x300/A269FF/FFFFFF?text=Mandrake+%26+Soci",
    description: "Concerto live di Mandrake & Soci al Cantiere Hambirreria",
    featured: true,
    tags: ["concerto", "rock", "birra"],
    vendors: ["v7", "v8"]
  },
  {
    id: generateUUID(),
    title: "Maurizio Macrì & Michel Cleis DJ",
    organizerName: "MOI Salento",
    time: "23:59",
    date: new Date(2025, 4, 26), // May 26, 2025
    location: {
      name: "Lequile",
      latitude: 40.3203,
      longitude: 18.1385,
      distanceKm: 3.8,
    },
    image: "https://via.placeholder.com/400x300/FF458F/FFFFFF?text=Macrì+%26+Cleis",
    description: "Serata di musica elettronica con Maurizio Macrì e Michel Cleis",
    featured: true,
    tags: ["elettronica", "dj", "dance"],
    vendors: ["v9", "v10"]
  },
  {
    id: generateUUID(),
    title: "I Fanffarroni",
    organizerName: "Jungle - Parco Raho",
    time: "22:00",
    date: new Date(2025, 4, 26), // May 26, 2025
    location: {
      name: "Nardò",
      latitude: 40.1758,
      longitude: 18.0323,
      distanceKm: 22.5,
    },
    image: "https://via.placeholder.com/400x300/FF7A3D/FFFFFF?text=I+Fanffarroni",
    description: "I Fanffarroni in concerto al Jungle - Parco Raho",
    featured: false,
    tags: ["concerto", "folk", "popolare"],
    vendors: ["v11"]
  },
  {
    id: generateUUID(),
    title: "Squerèz LIVE",
    organizerName: "Birrificio - Cremonini Tributo",
    time: "21:30",
    date: new Date(2025, 4, 26), // May 26, 2025
    location: {
      name: "Lecce",
      latitude: 40.345,
      longitude: 18.1744,
      distanceKm: 0.8,
    },
    image: "https://via.placeholder.com/400x300/A269FF/FFFFFF?text=Squerèz+LIVE",
    description: "Tributo a Cesare Cremonini con la band Squerèz",
    featured: false,
    tags: ["tributo", "pop", "rock"],
    vendors: ["v12", "v13"]
  },
  {
    id: generateUUID(),
    title: "Viaggio Popolare",
    organizerName: "Arakenamun",
    time: "21:00",
    date: new Date(2025, 4, 26), // May 26, 2025
    location: {
      name: "Anglano",
      latitude: 40.0476,
      longitude: 18.2518,
      distanceKm: 32.6,
    },
    image: "https://via.placeholder.com/400x300/FF458F/FFFFFF?text=Viaggio+Popolare",
    description: "Viaggio nella musica popolare salentina",
    featured: false,
    tags: ["folk", "popolare", "pizzica"],
    vendors: ["v14"]
  },
  {
    id: generateUUID(),
    title: "Rolling Stones Night",
    organizerName: "Forca Glam",
    time: "22:00",
    date: new Date(2025, 4, 27), // May 27, 2025
    location: {
      name: "Gallipoli",
      latitude: 40.0559,
      longitude: 17.9923,
      distanceKm: 33.7,
    },
    image: "https://via.placeholder.com/400x300/FF7A3D/FFFFFF?text=Rolling+Stones+Night",
    description: "Serata dedicata ai Rolling Stones con tributi live",
    featured: true,
    tags: ["tributo", "rock", "classic"],
    vendors: ["v15", "v16"]
  },
  {
    id: generateUUID(),
    title: "Tourdegradabile",
    organizerName: "Piazza Libertini",
    time: "22:00",
    date: new Date(2025, 4, 28), // May 28, 2025
    location: {
      name: "Lecce",
      latitude: 40.3508,
      longitude: 18.1716,
      distanceKm: 0.3,
    },
    image: "https://via.placeholder.com/400x300/A269FF/FFFFFF?text=Tourdegradabile",
    description: "Festival ecosostenibile con artisti locali",
    featured: true,
    tags: ["festival", "ecosostenibile", "musica"],
    vendors: ["v17", "v18", "v19"]
  }
];

// Mock vendors data
export const vendors = {
  v1: {
    id: "v1",
    name: "VinylMania",
    description: "Vendita vinili nuovi e usati di ogni genere musicale",
    image: "https://via.placeholder.com/400x300/FF458F/FFFFFF?text=VinylMania",
    products: [
      { id: generateUUID(), name: "Vinile Pink Floyd - Dark Side of the Moon", price: 35.00, image: "https://via.placeholder.com/400x300/000000/FFFFFF?text=Pink+Floyd" },
      { id: generateUUID(), name: "Vinile Beatles - Abbey Road", price: 30.00, image: "https://via.placeholder.com/400x300/FFFFFF/000000?text=Beatles" },
      { id: generateUUID(), name: "Vinile Daft Punk - Random Access Memories", price: 40.00, image: "https://via.placeholder.com/400x300/FFD700/000000?text=Daft+Punk" }
    ]
  },
  v2: {
    id: "v2",
    name: "Vintage Gear",
    description: "Strumenti musicali vintage e pezzi da collezione",
    image: "https://via.placeholder.com/400x300/A269FF/FFFFFF?text=Vintage+Gear",
    products: [
      { id: generateUUID(), name: "Chitarra Fender Stratocaster 1975", price: 1200.00, image: "https://via.placeholder.com/400x300/964B00/FFFFFF?text=Stratocaster" },
      { id: generateUUID(), name: "Amplificatore Marshall JCM800", price: 850.00, image: "https://via.placeholder.com/400x300/000000/FFFFFF?text=Marshall" }
    ]
  },
  // ... more vendors similar to the pattern above
  v3: {
    id: "v3",
    name: "Street Food Pugliese",
    description: "Specialità pugliesi da strada",
    image: "https://via.placeholder.com/400x300/FF7A3D/FFFFFF?text=Street+Food",
    products: [
      { id: generateUUID(), name: "Panzerotto Fritto", price: 3.50, image: "https://via.placeholder.com/400x300/FFA07A/000000?text=Panzerotto" },
      { id: generateUUID(), name: "Focaccia Barese", price: 4.00, image: "https://via.placeholder.com/400x300/F5DEB3/000000?text=Focaccia" },
      { id: generateUUID(), name: "Rustico Leccese", price: 2.50, image: "https://via.placeholder.com/400x300/DEB887/000000?text=Rustico" }
    ]
  }
};

// Generate additional vendors based on the pattern
for (let i = 4; i <= 19; i++) {
  const vendorId = `v${i}`;
  vendors[vendorId] = {
    id: vendorId,
    name: `Vendor ${i}`,
    description: `Description for vendor ${i}`,
    image: `https://via.placeholder.com/400x300/${i % 3 === 0 ? 'FF458F' : i % 3 === 1 ? 'A269FF' : 'FF7A3D'}/FFFFFF?text=Vendor+${i}`,
    products: [
      { 
        id: generateUUID(), 
        name: `Product ${i}-1`, 
        price: Math.round(Math.random() * 100) / 2, 
        image: `https://via.placeholder.com/400x300/CCCCCC/000000?text=Product+${i}-1` 
      },
      { 
        id: generateUUID(), 
        name: `Product ${i}-2`, 
        price: Math.round(Math.random() * 100) / 2, 
        image: `https://via.placeholder.com/400x300/CCCCCC/000000?text=Product+${i}-2` 
      }
    ]
  };
}

// Mock favorites (empty initially)
export const initialFavorites = {
  events: [],
  vendors: [],
  products: []
};

// Helper function to calculate distance between two coordinates
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Function to get events sorted by distance from user location
export const getEventsByDistance = (userLocation) => {
  if (!userLocation) return events;
  
  return [...events].sort((a, b) => {
    const distA = calculateDistance(
      userLocation.latitude, 
      userLocation.longitude, 
      a.location.latitude, 
      a.location.longitude
    );
    
    const distB = calculateDistance(
      userLocation.latitude, 
      userLocation.longitude, 
      b.location.latitude, 
      b.location.longitude
    );
    
    return distA - distB;
  });
};

// Function to get events by date
export const getEventsByDate = (date) => {
  const targetDate = new Date(date);
  return events.filter(event => 
    event.date.getDate() === targetDate.getDate() &&
    event.date.getMonth() === targetDate.getMonth() &&
    event.date.getFullYear() === targetDate.getFullYear()
  );
};

// Function to get vendors by event
export const getVendorsByEvent = (eventId) => {
  const event = events.find(e => e.id === eventId);
  if (!event) return [];
  
  return event.vendors.map(vendorId => vendors[vendorId]);
};