import bangalorePrices from '../data/bangalorePrices.js';

const AMENITY_BOOST = {
  'Furnished': 1.15, 'Semi-Furnished': 1.07,
  'Parking': 1.05, 'Security': 1.08, 
  'Lift': 1.03, 'WiFi': 1.04, 'AC': 1.10
};

const TENANT_MODIFIER = {
  'Bachelors': 0.97, 'Family': 1.12,
  'Girls Only': 1.05, 'Students': 0.95,
  'Working Professionals': 1.08
};

export const calculatePriceRating = (property) => {
  const base = bangalorePrices[property.area][property.property_type] || 0;
  const amenitiesFactor = property.amenities.reduce((acc, a) => acc * (AMENITY_BOOST[a] || 1), 1);
  const tenantFactor = TENANT_MODIFIER[property.tenant_preference] || 1;
  const sizeFactor = property.square_ft > 800 ? 1.05 : 1;
  
  const expected = base * amenitiesFactor * tenantFactor * sizeFactor;
  const difference = property.price - expected;

  if (difference < -7000) return { rating: 'Steal Deal! 💎', color: 'bg-emerald-500' };
  if (difference < -3000) return { rating: 'Good Price 👍', color: 'bg-green-400' };
  if (difference < 2000) return { rating: 'Market Rate 📊', color: 'bg-yellow-400' };
  return { rating: 'Overpriced ⚠️', color: 'bg-red-400' };
};