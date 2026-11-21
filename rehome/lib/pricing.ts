export const CONDITIONS = { likeNew: 0.9, good: 0.7, fair: 0.45, needsRepair: 0.25 } as const;

export function estimatePrice(base: number, condition: keyof typeof CONDITIONS, multiplier: number) {
  const low = Math.round(base * CONDITIONS[condition] * multiplier * 0.92);
  const high = Math.round(base * CONDITIONS[condition] * multiplier * 1.08);
  const profit = Math.round(((low + high) / 2) * 0.95);
  const fixCost = Math.round(base * 0.18);
  return { low, high, profit, fixCost };
}

export const ITEMS = [
  { name: "Sofa - 3 Seat", base: 650, emoji: "🛋️", cat: "Furniture" },
  { name: "iPhone 13 128GB", base: 450, emoji: "📱", cat: "Electronics" },
  { name: "PS5 Disc Edition", base: 450, emoji: "🎮", cat: "Electronics" },
  { name: "Stainless Fridge", base: 900, emoji: "🧊", cat: "Appliances" },
  { name: "Front-Load Washer", base: 650, emoji: "🧺", cat: "Appliances" },
  { name: "【entity-Trek¦canonical_name=Trek】 Mountain Bike", base: 420, emoji: "🚲", cat: "Sports" },
  { name: "Oak Dining Table", base: 480, emoji: "🪑", cat: "Furniture" },
  { name: "MacBook Pro 14", base: 1100, emoji: "💻", cat: "Electronics" },
  { name: "55 4K TV", base: 550, emoji: "📺", cat: "Electronics" },
  { name: "Dining Table Set", base: 520, emoji: "🍽️", cat: "Furniture" },
  { name: "Nike Air Sneakers", base: 120, emoji: "👟", cat: "Apparel" },
  { name: "Dyson Vacuum", base: 380, emoji: "🧹", cat: "Appliances" },
  { name: "Coffee Table", base: 220, emoji: "🪵", cat: "Furniture" },
];
