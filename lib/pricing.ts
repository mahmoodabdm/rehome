// lib/pricing.ts

/**
 * Condition multipliers used across the app.
 * These exact keys are also used by app/page.tsx condition buttons.
 */
export const CONDITIONS = {
  likeNew: 0.9,
  good: 0.7,
  fair: 0.45,
  needsRepair: 0.25,
} as const;

/**
 * Human-readable labels + multiplier list. Additive helper — safe to use
 * anywhere, does not change the existing CONDITIONS shape.
 */
export const CONDITION_OPTIONS: {
  key: keyof typeof CONDITIONS;
  label: string;
  multiplier: number;
}[] = [
  { key: "likeNew", label: "Like New", multiplier: CONDITIONS.likeNew },
  { key: "good", label: "Good", multiplier: CONDITIONS.good },
  { key: "fair", label: "Fair", multiplier: CONDITIONS.fair },
  { key: "needsRepair", label: "Needs Repair", multiplier: CONDITIONS.needsRepair },
];

/**
 * Resolve a condition argument (string key OR numeric multiplier) to a number.
 * Accepts: "likeNew" | "good" | "fair" | "needsRepair" | 0.9 | 0.7 | 0.45 | 0.25
 * Also tolerates camelCase, snake_case, kebab-case, and Title Case aliases.
 */
function resolveConditionMultiplier(condition: string | number): number {
  if (typeof condition === "number") {
    return Number.isFinite(condition) ? condition : 0.7;
  }

  const raw = CONDITION_OPTIONS.map((c) => c.key as string);
  const key = String(condition).trim();

  // Direct key hit (case-sensitive first, then lowercase)
  if (key in CONDITIONS) return CONDITIONS[key as keyof typeof CONDITIONS];
  const lower = key.toLowerCase();
  for (const k of raw) {
    if (k.toLowerCase() === lower) {
      return CONDITIONS[k as keyof typeof CONDITIONS];
    }
  }

  // Common aliases
  const aliases: Record<string, keyof typeof CONDITIONS> = {
    "like new": "likeNew",
    "like_new": "likeNew",
    "like-new": "likeNew",
    likenew: "likeNew",
    "needs repair": "needsRepair",
    "needs_repair": "needsRepair",
    "needs-repair": "needsRepair",
    needsrepair: "needsRepair",
  };
  if (lower in aliases) return CONDITIONS[aliases[lower]];

  return 0.7; // final fallback = "good"
}

/**
 * Estimate the resale range for an item.
 *
 * Accepts condition as a STRING key ("likeNew", "good", ...) OR as a NUMBER
 * multiplier (0.9, 0.7, 0.45, 0.25) — both call signatures are supported per spec.
 *
 * @param base      New/retail base price in USD
 * @param condition "likeNew" | "good" | "fair" | "needsRepair"  OR  0.9 | 0.7 | 0.45 | 0.25
 * @param multiplier State resale multiplier (from lib/states.ts)
 */
export function estimatePrice(
  base: number,
  condition: string | number,
  multiplier: number
): {
  low: number;
  high: number;
  profit: number;
  fixCost: number;
} {
  const condValue = resolveConditionMultiplier(condition);
  const safeBase = Number.isFinite(base) && base > 0 ? base : 0;
  const safeMult = Number.isFinite(multiplier) && multiplier > 0 ? multiplier : 1;

  // Core price = base × condition × state multiplier
  const core = safeBase * condValue * safeMult;

  // Range ±8%
  const low = Math.round(core * 0.92);
  const high = Math.round(core * 1.08);

  // Profit = expected sale price after 5% platform fee
  const expectedSale = (low + high) / 2;
  const profit = Math.round(expectedSale * 0.95);

  // Fix cost = 18% of base price
  const fixCost = Math.round(safeBase * 0.18);

  return { low, high, profit, fixCost };
}

/**
 * Verdict helper — returns SELL / FIX / DONATE based on estimate output.
 * Additive; app/page.tsx has its own local logic so nothing breaks.
 */
export type Verdict = "SELL" | "FIX" | "DONATE";

export function getVerdict(
  estimate: { low: number; high: number; profit: number; fixCost: number },
  base: number
): { verdict: Verdict; reasoning: string[] } {
  const { profit, fixCost } = estimate;

  if (profit <= Math.max(25, base * 0.05)) {
    return {
      verdict: "DONATE",
      reasoning: [
        "The resale value is too low once the 5% platform fee is subtracted.",
        "Donating is quick, eco-friendly, and still helps someone in need.",
      ],
    };
  }

  if (fixCost < profit * 0.35 && profit > 40) {
    return {
      verdict: "FIX",
      reasoning: [
        `A small repair (~$${fixCost}) could unlock ~$${profit} in resale value.`,
        "Fixing before listing usually earns a higher final sale price.",
      ],
    };
  }

  return {
    verdict: "SELL",
    reasoning: [
      "This item has healthy resale demand as-is.",
      `You could net around $${profit} after the 5% platform fee.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// ITEMS
// ---------------------------------------------------------------------------

export type ItemCategory =
  | "Furniture"
  | "Electronics"
  | "Appliances"
  | "Sports"
  | "Apparel";

export type Item = {
  name: string;
  base: number;
  emoji: string;
  cat: ItemCategory;
};

export const ITEMS: Item[] = [
  { name: "Sofa - 3 Seat", base: 650, emoji: "🛋️", cat: "Furniture" },
  { name: "iPhone 13 128GB", base: 450, emoji: "📱", cat: "Electronics" },
  { name: "PS5 Disc Edition", base: 450, emoji: "🎮", cat: "Electronics" },
  { name: "Stainless Fridge", base: 900, emoji: "🧊", cat: "Appliances" },
  { name: "Front-Load Washer", base: 650, emoji: "🧺", cat: "Appliances" },
  { name: "Trek Mountain Bike", base: 420, emoji: "🚲", cat: "Sports" },
  { name: "Oak Dining Table", base: 480, emoji: "🪑", cat: "Furniture" },
  { name: "MacBook Pro 14", base: 1100, emoji: "💻", cat: "Electronics" },
  { name: "55\" 4K TV", base: 550, emoji: "📺", cat: "Electronics" },
  { name: "Nike Air Sneakers", base: 120, emoji: "👟", cat: "Apparel" },
  { name: "Dyson Vacuum", base: 380, emoji: "🧹", cat: "Appliances" },
  { name: "Coffee Table", base: 220, emoji: "🪵", cat: "Furniture" },
];

export function getItem(name: string): Item | undefined {
  return ITEMS.find((i) => i.name === name);
}

// ---------------------------------------------------------------------------
// Constants used across pages
// ---------------------------------------------------------------------------

export const PLATFORM_FEE_RATE = 0.05; // 5% commission on sale
export const FIX_COST_RATE = 0.18;     // repair cost as fraction of base price
export const PRICE_RANGE_PCT = 0.08;   // ±8% band around core price
