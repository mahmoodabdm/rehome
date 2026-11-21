
import { getStateByAbbreviation } from './states';
export const ITEMS = [
  { id:'sofa', name:'Sofa', base:650, category:'Furniture' },
  { id:'iphone11', name:'iPhone 11', base:320, category:'Electronics' },
  { id:'iphone13', name:'iPhone 13', base:480, category:'Electronics' },
  { id:'ps5', name:'PS5', base:499, category:'Electronics' },
  { id:'fridge', name:'Fridge', base:1100, category:'Appliances' },
  { id:'washer', name:'Washing Machine', base:750, category:'Appliances' },
  { id:'bike', name:'Mountain Bike', base:450, category:'Bikes' },
  { id:'dining-table', name:'Dining Table', base:500, category:'Furniture' },
  { id:'sneakers', name:'Sneakers', base:140, category:'Fashion' },
  { id:'laptop', name:'Laptop', base:900, category:'Electronics' },
  { id:'tv', name:'TV 55 inch', base:550, category:'Electronics' },
  { id:'chair', name:'Dining Chair', base:120, category:'Furniture' },
  { id:'coffee-table', name:'Coffee Table', base:220, category:'Furniture' },
] as const;
export type Condition = 'Like New'|'Good'|'Fair'|'Needs Repair';
const COND: Record<Condition, number> = { 'Like New':0.90, 'Good':0.70, 'Fair':0.45, 'Needs Repair':0.25 };
export function estimateItem(itemId:string, condition:Condition, stateAbbr:string){
  const item = ITEMS.find(i=>i.id===itemId) || ITEMS[0];
  const st = getStateByAbbreviation(stateAbbr);
  const mult = st?.resaleMultiplier ?? 1;
  const price = Math.round(item.base * COND[condition] * mult);
  const min = Math.round(price*0.92); const max = Math.round(price*1.08);
  const profit = Math.round(price*0.95);
  const fixCost = Math.round(item.base*0.18);
  const repairedValue = Math.round(item.base*0.70*mult);
  const fixUpside = repairedValue - fixCost;
  let verdict: 'SELL'|'FIX'|'DONATE' = 'SELL';
  let reasoning = `Good demand in ${st?.name||'your state'}. List it now.`;
  if(condition==='Needs Repair' && fixUpside > price + 50){ verdict='FIX'; reasoning=`Repair for ~$${fixCost} then sell for ~$${repairedValue} (+$${fixUpside-price} upside).`; }
  else if(condition==='Needs Repair' && price < 80){ verdict='SELL'; reasoning='Sell for parts - repair not worth it.'; }
  else if(condition==='Fair' && price < 60){ verdict='DONATE'; reasoning='Donation gives tax benefit and saves landfill.'; }
  return { item: item.name, min, max, price, profitIfSell: profit, fixCost, fixUpside, donateTaxBenefit: Math.round(price*0.22), verdict, reasoning, state: st?.name, tax: st?.salesTax, confidence: condition==='Like New'?92: condition==='Good'?88:82 };
}
