import { writeFileSync } from "fs";

const cities = [
  { city: "Zürich", canton: "ZH", zip: "8001", lat: 47.3769, lng: 8.5417, agentId: "a1" },
  { city: "Genève", canton: "GE", zip: "1201", lat: 46.2044, lng: 6.1432, agentId: "a2" },
  { city: "Lugano", canton: "TI", zip: "6900", lat: 46.0037, lng: 8.9511, agentId: "a3" },
  { city: "Bern", canton: "BE", zip: "3011", lat: 46.9480, lng: 7.4474, agentId: "a4" },
  { city: "Basel", canton: "BS", zip: "4051", lat: 47.5596, lng: 7.5886, agentId: "a5" },
  { city: "Luzern", canton: "LU", zip: "6003", lat: 47.0502, lng: 8.3093, agentId: "a6" },
  { city: "Lausanne", canton: "VD", zip: "1003", lat: 46.5197, lng: 6.6323, agentId: "a2" },
  { city: "Zug", canton: "ZG", zip: "6300", lat: 47.1662, lng: 8.5155, agentId: "a1" },
  { city: "St. Gallen", canton: "SG", zip: "9000", lat: 47.4245, lng: 9.3767, agentId: "a4" },
  { city: "Winterthur", canton: "ZH", zip: "8400", lat: 47.5001, lng: 8.7241, agentId: "a1" },
  { city: "Montreux", canton: "VD", zip: "1820", lat: 46.4312, lng: 6.9107, agentId: "a2" },
  { city: "Interlaken", canton: "BE", zip: "3800", lat: 46.6863, lng: 7.8632, agentId: "a6" },
];

const streets = [
  "Bahnhofstrasse", "Seefeldstrasse", "Rue du Rhône", "Via Nassa", "Marktgasse",
  "Rheinweg", "Löwenstrasse", "Grand-Rue", "Kirchstrasse", "Gartenstrasse",
  "Seestrasse", "Poststrasse", "Alpenblickweg", "Rebbergstrasse", "Sonnenweg",
];

const types = [
  { propertyType: "apartment", baseTitle: "Moderne Wohnung", roomsRange: [2, 5], living: [50, 140] },
  { propertyType: "house", baseTitle: "Einfamilienhaus", roomsRange: [4.5, 7], living: [120, 240] },
  { propertyType: "villa", baseTitle: "Exklusive Villa", roomsRange: [5.5, 9], living: [220, 420] },
  { propertyType: "chalet", baseTitle: "Gemütliches Chalet", roomsRange: [3.5, 6.5], living: [90, 200] },
  { propertyType: "penthouse", baseTitle: "Penthouse mit Panoramablick", roomsRange: [3.5, 6], living: [140, 260] },
  { propertyType: "land", baseTitle: "Baulandparzelle", roomsRange: [0, 0], living: [0, 0] },
  { propertyType: "commercial", baseTitle: "Gewerbefläche", roomsRange: [0, 0], living: [80, 400] },
];

const featurePool = [
  "Balcony", "Terrace", "Garden", "Garage", "Parking space", "Lift", "Cellar",
  "Fireplace", "Lake view", "Mountain view", "Underfloor heating", "Fitted kitchen",
  "Sauna", "Swimming pool", "Solar panels", "Pet friendly", "Newly renovated",
  "Wheelchair accessible", "Smart home system", "Wine cellar",
];

function pick(arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

function rnd(min, max, step = 1) {
  const n = Math.round((min + Math.random() * (max - min)) / step) * step;
  return n;
}

function jitter(v, amt) {
  return +(v + (Math.random() - 0.5) * amt).toFixed(4);
}

const properties = [];
let idCounter = 1;

for (let i = 0; i < 42; i++) {
  const loc = cities[i % cities.length];
  const t = types[i % types.length];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const houseNo = rnd(1, 120);
  const listingType = Math.random() < 0.65 ? "buy" : "rent";
  const isLand = t.propertyType === "land";
  const isCommercial = t.propertyType === "commercial";

  const rooms = isLand ? 0 : rnd(t.roomsRange[0], t.roomsRange[1], 0.5);
  const living = isLand ? 0 : rnd(t.living[0], t.living[1], 5);
  const bedrooms = isLand || isCommercial ? 0 : Math.max(1, Math.floor(rooms - 1));
  const bathrooms = isLand || isCommercial ? 0 : Math.max(1, Math.floor(rooms / 2.5));
  const plot = isLand ? rnd(400, 2000, 10) : t.propertyType === "villa" || t.propertyType === "house" ? rnd(300, 1200, 10) : undefined;
  const yearBuilt = isLand ? undefined : rnd(1960, 2024);

  let price;
  if (listingType === "rent") {
    price = isCommercial ? rnd(1800, 9000, 50) : rnd(1400, 7500, 50);
  } else {
    if (isLand) price = rnd(400000, 2200000, 10000);
    else if (t.propertyType === "villa") price = rnd(1800000, 6500000, 10000);
    else if (t.propertyType === "penthouse") price = rnd(1500000, 4800000, 10000);
    else if (t.propertyType === "chalet") price = rnd(900000, 3200000, 10000);
    else if (t.propertyType === "house") price = rnd(950000, 2800000, 10000);
    else if (isCommercial) price = rnd(600000, 3500000, 10000);
    else price = rnd(450000, 2100000, 5000);
  }

  const id = `p${idCounter++}`;
  const seed = `${id}-${loc.city}`.toLowerCase().replace(/\s+/g, "-");
  const images = [1, 2, 3, 4, 5].map(
    (n) => `https://picsum.photos/seed/${seed}-${n}/1200/800`
  );

  properties.push({
    id,
    title: `${t.baseTitle} in ${loc.city}`,
    listingType,
    propertyType: t.propertyType,
    price,
    pricePeriod: listingType === "rent" ? "month" : null,
    rooms,
    bedrooms,
    bathrooms,
    livingSpace: living,
    plotSpace: plot,
    yearBuilt,
    address: {
      street: `${street} ${houseNo}`,
      zip: loc.zip,
      city: loc.city,
      canton: loc.canton,
      lat: jitter(loc.lat, 0.05),
      lng: jitter(loc.lng, 0.05),
    },
    description:
      `${t.baseTitle} located in a sought-after area of ${loc.city}. ` +
      `This property offers ${isLand ? "excellent building potential" : `${rooms} rooms and ${living} m² of living space`}, ` +
      `close to public transport, schools and shopping facilities. ` +
      `A great opportunity for ${listingType === "rent" ? "tenants" : "buyers"} looking in the ${loc.canton} region.`,
    features: pick(featurePool, rnd(3, 7)),
    images,
    agentId: loc.agentId,
    featured: Math.random() < 0.3,
    status: Math.random() < 0.08 ? "reserved" : Math.random() < 0.04 ? "sold" : "available",
    createdAt: new Date(Date.now() - rnd(0, 60) * 86400000).toISOString(),
  });
}

writeFileSync(
  new URL("../data/properties.json", import.meta.url),
  JSON.stringify(properties, null, 2)
);

console.log(`Generated ${properties.length} properties`);
