// ─── Product Catalog Data ──────────────────────────────────────────────────────
// Pure data layer — zero UI/state dependencies
// ──────────────────────────────────────────────────────────────────────────────

export type ProductBadge = 'New' | 'Bestseller' | 'Sale' | 'Hot' | null;

export interface Product {
  id: number;
  name: string;
  category: string;
  color: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  sizes: number[];
  badge: ProductBadge;
  sku: string;
  inStock: boolean;
  image: string;
}

export const CATEGORIES = ['All', 'Chelsea Boots', 'Ankle Boots', 'Derby Shoes', 'Loafers', 'Sneakers'];
export const COLORS = ['All', 'Black', 'Brown', 'Tan', 'White', 'Olive', 'Grey'];
export const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name', label: 'Name A–Z' },
];

import img_1000151679 from '../assets/images/1000151679.jpg.jpeg';
import img_1000151766 from '../assets/images/1000151766.jpg.jpeg';
import img_1000151768 from '../assets/images/1000151768.jpg.jpeg';
import img_1000151770 from '../assets/images/1000151770.jpg.jpeg';
import img_1000151772 from '../assets/images/1000151772.jpg.jpeg';
import img_1000151774 from '../assets/images/1000151774.jpg.jpeg';
import img_1000151776 from '../assets/images/1000151776.jpg.jpeg';
import img_1000151778 from '../assets/images/1000151778.jpg.jpeg';
import img_1000151780 from '../assets/images/1000151780.jpg.jpeg';
import img_1000151925 from '../assets/images/1000151925.jpg.jpeg';
import img_1000151930 from '../assets/images/1000151930.jpg.jpeg';
import img_1000151933 from '../assets/images/1000151933.jpg.jpeg';
import img_1000151936 from '../assets/images/1000151936.jpg.jpeg';
import img_1000151939 from '../assets/images/1000151939.jpg.jpeg';
import img_1000151942 from '../assets/images/1000151942.jpg.jpeg';
import img_1000151945 from '../assets/images/1000151945.jpg.jpeg';
import img_1000151948 from '../assets/images/1000151948.jpg.jpeg';
import img_1000151963 from '../assets/images/1000151963.jpg.jpeg';
import img_1000151965 from '../assets/images/1000151965.jpg.jpeg';
import img_1000151967 from '../assets/images/1000151967.jpg.jpeg';
import img_1000151968 from '../assets/images/1000151968.jpg.jpeg';
import img_1000151969 from '../assets/images/1000151969.jpg.jpeg';
import img_1000151970 from '../assets/images/1000151970.jpg.jpeg';
import img_1000151971 from '../assets/images/1000151971.jpg.jpeg';
import img_1000151974 from '../assets/images/1000151974.jpg.jpeg';
import img_1000151975 from '../assets/images/1000151975.jpg.jpeg';
import img_1000151977 from '../assets/images/1000151977.jpg.jpeg';
import img_1000152055 from '../assets/images/1000152055.jpg.jpeg';
import img_1000152058 from '../assets/images/1000152058.jpg.jpeg';
import img_1000152061 from '../assets/images/1000152061.jpg.jpeg';
import img_1000152074 from '../assets/images/1000152074.jpg.jpeg';
import img_1000152082 from '../assets/images/1000152082.jpg.jpeg';
import img_1000152087 from '../assets/images/1000152087.jpg.jpeg';
import img_1000152091 from '../assets/images/1000152091.jpg.jpeg';
import img_1000152095 from '../assets/images/1000152095.jpg.jpeg';
import img_1000152099 from '../assets/images/1000152099.jpg.jpeg';
import img_1000152103 from '../assets/images/1000152103.jpg.jpeg';
import img_1000152107 from '../assets/images/1000152107.jpg.jpeg';
import img_1000152809 from '../assets/images/1000152809.jpg.jpeg';

const ALL_IMAGES = {
  '1000151679.jpg.jpeg': (img_1000151679 as any).src || img_1000151679,
  '1000151766.jpg.jpeg': (img_1000151766 as any).src || img_1000151766,
  '1000151768.jpg.jpeg': (img_1000151768 as any).src || img_1000151768,
  '1000151770.jpg.jpeg': (img_1000151770 as any).src || img_1000151770,
  '1000151772.jpg.jpeg': (img_1000151772 as any).src || img_1000151772,
  '1000151774.jpg.jpeg': (img_1000151774 as any).src || img_1000151774,
  '1000151776.jpg.jpeg': (img_1000151776 as any).src || img_1000151776,
  '1000151778.jpg.jpeg': (img_1000151778 as any).src || img_1000151778,
  '1000151780.jpg.jpeg': (img_1000151780 as any).src || img_1000151780,
  '1000151925.jpg.jpeg': (img_1000151925 as any).src || img_1000151925,
  '1000151930.jpg.jpeg': (img_1000151930 as any).src || img_1000151930,
  '1000151933.jpg.jpeg': (img_1000151933 as any).src || img_1000151933,
  '1000151936.jpg.jpeg': (img_1000151936 as any).src || img_1000151936,
  '1000151939.jpg.jpeg': (img_1000151939 as any).src || img_1000151939,
  '1000151942.jpg.jpeg': (img_1000151942 as any).src || img_1000151942,
  '1000151945.jpg.jpeg': (img_1000151945 as any).src || img_1000151945,
  '1000151948.jpg.jpeg': (img_1000151948 as any).src || img_1000151948,
  '1000151963.jpg.jpeg': (img_1000151963 as any).src || img_1000151963,
  '1000151965.jpg.jpeg': (img_1000151965 as any).src || img_1000151965,
  '1000151967.jpg.jpeg': (img_1000151967 as any).src || img_1000151967,
  '1000151968.jpg.jpeg': (img_1000151968 as any).src || img_1000151968,
  '1000151969.jpg.jpeg': (img_1000151969 as any).src || img_1000151969,
  '1000151970.jpg.jpeg': (img_1000151970 as any).src || img_1000151970,
  '1000151971.jpg.jpeg': (img_1000151971 as any).src || img_1000151971,
  '1000151974.jpg.jpeg': (img_1000151974 as any).src || img_1000151974,
  '1000151975.jpg.jpeg': (img_1000151975 as any).src || img_1000151975,
  '1000151977.jpg.jpeg': (img_1000151977 as any).src || img_1000151977,
  '1000152055.jpg.jpeg': (img_1000152055 as any).src || img_1000152055,
  '1000152058.jpg.jpeg': (img_1000152058 as any).src || img_1000152058,
  '1000152061.jpg.jpeg': (img_1000152061 as any).src || img_1000152061,
  '1000152074.jpg.jpeg': (img_1000152074 as any).src || img_1000152074,
  '1000152082.jpg.jpeg': (img_1000152082 as any).src || img_1000152082,
  '1000152087.jpg.jpeg': (img_1000152087 as any).src || img_1000152087,
  '1000152091.jpg.jpeg': (img_1000152091 as any).src || img_1000152091,
  '1000152095.jpg.jpeg': (img_1000152095 as any).src || img_1000152095,
  '1000152099.jpg.jpeg': (img_1000152099 as any).src || img_1000152099,
  '1000152103.jpg.jpeg': (img_1000152103 as any).src || img_1000152103,
  '1000152107.jpg.jpeg': (img_1000152107 as any).src || img_1000152107,
  '1000152809.jpg.jpeg': (img_1000152809 as any).src || img_1000152809,
};
export const PRODUCTS: Product[] = [
  { id: 1, name: 'Premium Black Chelsea Boot', category: 'Chelsea Boots', color: 'Black', price: 15000, originalPrice: 20000, rating: 4.0, reviews: 20, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-001', inStock: true, image: ALL_IMAGES['1000151679.jpg.jpeg'] },
  { id: 2, name: 'Premium Brown Ankle Boot', category: 'Ankle Boots', color: 'Brown', price: 15500, originalPrice: 15500, rating: 4.1, reviews: 23, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-002', inStock: true, image: ALL_IMAGES['1000151766.jpg.jpeg'] },
  { id: 3, name: 'Premium Tan Derby Shoe', category: 'Derby Shoes', color: 'Tan', price: 16000, originalPrice: 16000, rating: 4.2, reviews: 26, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-003', inStock: true, image: ALL_IMAGES['1000151768.jpg.jpeg'] },
  { id: 4, name: 'Premium White Loafer', category: 'Loafers', color: 'White', price: 16500, originalPrice: 21500, rating: 4.3, reviews: 29, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-004', inStock: true, image: ALL_IMAGES['1000151770.jpg.jpeg'] },
  { id: 5, name: 'Premium Olive Sneaker', category: 'Sneakers', color: 'Olive', price: 17000, originalPrice: 17000, rating: 4.4, reviews: 32, sizes: [39, 40, 41, 42, 43], badge: null, sku: 'TR-005', inStock: true, image: ALL_IMAGES['1000151772.jpg.jpeg'] },
  { id: 6, name: 'Premium Grey Chelsea Boot', category: 'Chelsea Boots', color: 'Grey', price: 17500, originalPrice: 17500, rating: 4.5, reviews: 35, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-006', inStock: true, image: ALL_IMAGES['1000151774.jpg.jpeg'] },
  { id: 7, name: 'Premium Black Ankle Boot', category: 'Ankle Boots', color: 'Black', price: 18000, originalPrice: 23000, rating: 4.6, reviews: 38, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-007', inStock: true, image: ALL_IMAGES['1000151776.jpg.jpeg'] },
  { id: 8, name: 'Premium Brown Derby Shoe', category: 'Derby Shoes', color: 'Brown', price: 18500, originalPrice: 18500, rating: 4.7, reviews: 41, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-008', inStock: true, image: ALL_IMAGES['1000151778.jpg.jpeg'] },
  { id: 9, name: 'Premium Tan Loafer', category: 'Loafers', color: 'Tan', price: 19000, originalPrice: 19000, rating: 4.8, reviews: 44, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-009', inStock: true, image: ALL_IMAGES['1000151780.jpg.jpeg'] },
  { id: 10, name: 'Premium White Sneaker', category: 'Sneakers', color: 'White', price: 19500, originalPrice: 24500, rating: 4.9, reviews: 47, sizes: [39, 40, 41, 42, 43], badge: null, sku: 'TR-010', inStock: true, image: ALL_IMAGES['1000151925.jpg.jpeg'] },
  { id: 11, name: 'Premium Olive Chelsea Boot', category: 'Chelsea Boots', color: 'Olive', price: 20000, originalPrice: 20000, rating: 4.0, reviews: 50, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-011', inStock: true, image: ALL_IMAGES['1000151930.jpg.jpeg'] },
  { id: 12, name: 'Premium Grey Ankle Boot', category: 'Ankle Boots', color: 'Grey', price: 20500, originalPrice: 20500, rating: 4.1, reviews: 53, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-012', inStock: true, image: ALL_IMAGES['1000151933.jpg.jpeg'] },
  { id: 13, name: 'Premium Black Derby Shoe', category: 'Derby Shoes', color: 'Black', price: 21000, originalPrice: 26000, rating: 4.2, reviews: 56, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-013', inStock: true, image: ALL_IMAGES['1000151936.jpg.jpeg'] },
  { id: 14, name: 'Premium Brown Loafer', category: 'Loafers', color: 'Brown', price: 21500, originalPrice: 21500, rating: 4.3, reviews: 59, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-014', inStock: true, image: ALL_IMAGES['1000151939.jpg.jpeg'] },
  { id: 15, name: 'Premium Tan Sneaker', category: 'Sneakers', color: 'Tan', price: 22000, originalPrice: 22000, rating: 4.4, reviews: 62, sizes: [39, 40, 41, 42, 43], badge: null, sku: 'TR-015', inStock: true, image: ALL_IMAGES['1000151942.jpg.jpeg'] },
  { id: 16, name: 'Premium White Chelsea Boot', category: 'Chelsea Boots', color: 'White', price: 22500, originalPrice: 27500, rating: 4.5, reviews: 65, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-016', inStock: true, image: ALL_IMAGES['1000151945.jpg.jpeg'] },
  { id: 17, name: 'Premium Olive Ankle Boot', category: 'Ankle Boots', color: 'Olive', price: 23000, originalPrice: 23000, rating: 4.6, reviews: 68, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-017', inStock: true, image: ALL_IMAGES['1000151948.jpg.jpeg'] },
  { id: 18, name: 'Premium Grey Derby Shoe', category: 'Derby Shoes', color: 'Grey', price: 23500, originalPrice: 23500, rating: 4.7, reviews: 71, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-018', inStock: true, image: ALL_IMAGES['1000151963.jpg.jpeg'] },
  { id: 19, name: 'Premium Black Loafer', category: 'Loafers', color: 'Black', price: 24000, originalPrice: 29000, rating: 4.8, reviews: 74, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-019', inStock: true, image: ALL_IMAGES['1000151965.jpg.jpeg'] },
  { id: 20, name: 'Premium Brown Sneaker', category: 'Sneakers', color: 'Brown', price: 24500, originalPrice: 24500, rating: 4.9, reviews: 77, sizes: [39, 40, 41, 42, 43], badge: null, sku: 'TR-020', inStock: true, image: ALL_IMAGES['1000151967.jpg.jpeg'] },
  { id: 21, name: 'Premium Tan Chelsea Boot', category: 'Chelsea Boots', color: 'Tan', price: 25000, originalPrice: 25000, rating: 4.0, reviews: 80, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-021', inStock: true, image: ALL_IMAGES['1000151968.jpg.jpeg'] },
  { id: 22, name: 'Premium White Ankle Boot', category: 'Ankle Boots', color: 'White', price: 25500, originalPrice: 30500, rating: 4.1, reviews: 83, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-022', inStock: true, image: ALL_IMAGES['1000151969.jpg.jpeg'] },
  { id: 23, name: 'Premium Olive Derby Shoe', category: 'Derby Shoes', color: 'Olive', price: 26000, originalPrice: 26000, rating: 4.2, reviews: 86, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-023', inStock: true, image: ALL_IMAGES['1000151970.jpg.jpeg'] },
  { id: 24, name: 'Premium Grey Loafer', category: 'Loafers', color: 'Grey', price: 26500, originalPrice: 26500, rating: 4.3, reviews: 89, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-024', inStock: true, image: ALL_IMAGES['1000151971.jpg.jpeg'] },
  { id: 25, name: 'Premium Black Sneaker', category: 'Sneakers', color: 'Black', price: 27000, originalPrice: 32000, rating: 4.4, reviews: 92, sizes: [39, 40, 41, 42, 43], badge: null, sku: 'TR-025', inStock: true, image: ALL_IMAGES['1000151974.jpg.jpeg'] },
  { id: 26, name: 'Premium Brown Chelsea Boot', category: 'Chelsea Boots', color: 'Brown', price: 27500, originalPrice: 27500, rating: 4.5, reviews: 95, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-026', inStock: true, image: ALL_IMAGES['1000151975.jpg.jpeg'] },
  { id: 27, name: 'Premium Tan Ankle Boot', category: 'Ankle Boots', color: 'Tan', price: 28000, originalPrice: 28000, rating: 4.6, reviews: 98, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-027', inStock: true, image: ALL_IMAGES['1000151977.jpg.jpeg'] },
  { id: 28, name: 'Premium White Derby Shoe', category: 'Derby Shoes', color: 'White', price: 28500, originalPrice: 33500, rating: 4.7, reviews: 101, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-028', inStock: true, image: ALL_IMAGES['1000152055.jpg.jpeg'] },
  { id: 29, name: 'Premium Olive Loafer', category: 'Loafers', color: 'Olive', price: 29000, originalPrice: 29000, rating: 4.8, reviews: 104, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-029', inStock: true, image: ALL_IMAGES['1000152058.jpg.jpeg'] },
  { id: 30, name: 'Premium Grey Sneaker', category: 'Sneakers', color: 'Grey', price: 29500, originalPrice: 29500, rating: 4.9, reviews: 107, sizes: [39, 40, 41, 42, 43], badge: null, sku: 'TR-030', inStock: true, image: ALL_IMAGES['1000152061.jpg.jpeg'] },
  { id: 31, name: 'Premium Black Chelsea Boot', category: 'Chelsea Boots', color: 'Black', price: 30000, originalPrice: 35000, rating: 4.0, reviews: 110, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-031', inStock: true, image: ALL_IMAGES['1000152074.jpg.jpeg'] },
  { id: 32, name: 'Premium Brown Ankle Boot', category: 'Ankle Boots', color: 'Brown', price: 30500, originalPrice: 30500, rating: 4.1, reviews: 113, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-032', inStock: true, image: ALL_IMAGES['1000152082.jpg.jpeg'] },
  { id: 33, name: 'Premium Tan Derby Shoe', category: 'Derby Shoes', color: 'Tan', price: 31000, originalPrice: 31000, rating: 4.2, reviews: 116, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-033', inStock: true, image: ALL_IMAGES['1000152087.jpg.jpeg'] },
  { id: 34, name: 'Premium White Loafer', category: 'Loafers', color: 'White', price: 31500, originalPrice: 36500, rating: 4.3, reviews: 119, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-034', inStock: true, image: ALL_IMAGES['1000152091.jpg.jpeg'] },
  { id: 35, name: 'Premium Olive Sneaker', category: 'Sneakers', color: 'Olive', price: 32000, originalPrice: 32000, rating: 4.4, reviews: 122, sizes: [39, 40, 41, 42, 43], badge: null, sku: 'TR-035', inStock: true, image: ALL_IMAGES['1000152095.jpg.jpeg'] },
  { id: 36, name: 'Premium Grey Chelsea Boot', category: 'Chelsea Boots', color: 'Grey', price: 32500, originalPrice: 32500, rating: 4.5, reviews: 125, sizes: [39, 40, 41, 42, 43], badge: 'New', sku: 'TR-036', inStock: true, image: ALL_IMAGES['1000152099.jpg.jpeg'] },
  { id: 37, name: 'Premium Black Ankle Boot', category: 'Ankle Boots', color: 'Black', price: 33000, originalPrice: 38000, rating: 4.6, reviews: 128, sizes: [39, 40, 41, 42, 43], badge: 'Bestseller', sku: 'TR-037', inStock: true, image: ALL_IMAGES['1000152103.jpg.jpeg'] },
  { id: 38, name: 'Premium Brown Derby Shoe', category: 'Derby Shoes', color: 'Brown', price: 33500, originalPrice: 33500, rating: 4.7, reviews: 131, sizes: [39, 40, 41, 42, 43], badge: 'Sale', sku: 'TR-038', inStock: true, image: ALL_IMAGES['1000152107.jpg.jpeg'] },
  { id: 39, name: 'Premium Tan Loafer', category: 'Loafers', color: 'Tan', price: 34000, originalPrice: 34000, rating: 4.8, reviews: 134, sizes: [39, 40, 41, 42, 43], badge: 'Hot', sku: 'TR-039', inStock: true, image: ALL_IMAGES['1000152809.jpg.jpeg'] },
];
