export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  productName: string;
  productCategory: string;
  size: number;
  verified: boolean;
  helpfulCount: number;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Taimur Khan Afridi',
    city: 'Peshawar',
    rating: 5,
    date: 'September 24, 2026',
    title: 'Goodyear welt quality that rivals European luxury houses',
    content:
      'As someone who has worn heritage boots from Northampton for years, I was genuinely amazed by Triostepdekhyaber. The leather thickness, the balance of the shank, and the clean edge finish on the Chelsea boots are extraordinary. There was virtually zero break-in discomfort thanks to the padded calfskin lining.',
    productName: 'Premium Black Chelsea Boot',
    productCategory: 'Chelsea Boots',
    size: 42,
    verified: true,
    helpfulCount: 47,
  },
  {
    id: 'rev-02',
    author: 'Barrister Daniyal Qureshi',
    city: 'Islamabad',
    rating: 5,
    date: 'September 18, 2026',
    title: 'The leather patina deepens with every single wear',
    content:
      'I wear these to court and evening dinners alike. The tan derby has developed a gorgeous rich marble tone over four weeks. The sole grip is solid, and the unboxing presentation in the heavy matte black box with canvas dust bags felt genuinely elevated.',
    productName: 'Premium Tan Derby Shoe',
    productCategory: 'Derby Shoes',
    size: 43,
    verified: true,
    helpfulCount: 39,
  },
  {
    id: 'rev-03',
    author: 'Hamza Malik',
    city: 'Lahore (DHA)',
    rating: 5,
    date: 'September 11, 2026',
    title: 'Perfect silhouette — slim ankle opening with zero gap',
    content:
      'Most Chelsea boots available locally have a sloppy ankle opening that looks loose under tailored trousers. Triostepdekhyaber got the pattern exactly right: snug around the ankle, easy pull tabs, and high-tensile elastic gore. 10/10.',
    productName: 'Premium Brown Ankle Boot',
    productCategory: 'Ankle Boots',
    size: 41,
    verified: true,
    helpfulCount: 52,
  },
  {
    id: 'rev-04',
    author: 'Dr. Shahmeer Tareen',
    city: 'Karachi (Clifton)',
    rating: 5,
    date: 'August 29, 2026',
    title: 'Comfortable enough for a 12-hour surgical shift and clinic',
    content:
      'The cushioned memory footbed combined with genuine vegetable-tanned inner leather means your feet breathe completely without fatigue. Arrived in Karachi in just 48 hours via express courier. Extremely impressed with their customer support on WhatsApp too.',
    productName: 'Premium White Loafer',
    productCategory: 'Loafers',
    size: 42,
    verified: true,
    helpfulCount: 34,
  },
  {
    id: 'rev-05',
    author: 'Usman Ali Raza',
    city: 'Rawalpindi',
    rating: 5,
    date: 'August 19, 2026',
    title: 'Masterclass in Khyber craftsmanship',
    content:
      'Knowing that this level of artisanal welted shoemaking is coming out of the Khyber region fills me with pride. The double-stitched sole and burnished toe cap speak volumes about the artisan’s dedication. Worth every rupee.',
    productName: 'Premium Black Chelsea Boot',
    productCategory: 'Chelsea Boots',
    size: 44,
    verified: true,
    helpfulCount: 28,
  },
  {
    id: 'rev-06',
    author: 'Bilal Farooq',
    city: 'Faisalabad',
    rating: 4,
    date: 'August 08, 2026',
    title: 'Stunning boots, size exchange was seamless',
    content:
      'I initially ordered a 43 which was slightly snug for my wide forefoot. The atelier team dispatched size 44 the very next morning without any hassle or extra delivery charges. The new pair fits like a tailored glove.',
    productName: 'Premium Olive Chelsea Boot',
    productCategory: 'Chelsea Boots',
    size: 44,
    verified: true,
    helpfulCount: 19,
  },
];

export const REVIEW_METRICS = {
  averageRating: 4.9,
  totalReviews: 1420,
  fiveStarPct: 92,
  fourStarPct: 7,
  threeStarPct: 1,
  fitScore: '98% True to Size',
  craftsmanshipScore: '99.4% Verified Satisfaction',
};
