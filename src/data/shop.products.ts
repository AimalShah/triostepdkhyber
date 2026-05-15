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

export const CATEGORIES = ['All', 'Chelsea Boots', 'Ankle Boots', 'Derby', 'Loafers', 'Sneakers'];
export const COLORS     = ['All', 'Black', 'Brown', 'Tan', 'White', 'Olive', 'Grey'];
export const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured'         },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated'         },
  { value: 'name',       label: 'Name A–Z'          },
];

import imgBlack from '../assets/images/1000151679.jpg.jpeg';
import imgBrown from '../assets/images/1000151770.jpg.jpeg';
import imgChunky from '../assets/images/1000151774.jpg.jpeg';
import imgOlive from '../assets/images/1000151945.jpg.jpeg';
import imgTan from '../assets/images/1000151780.jpg.jpeg';
import imgWhite from '../assets/images/1000152087.jpg.jpeg';
import imgGrey from '../assets/images/1000152095.jpg.jpeg';

// Shared placeholder images that match product type
const IMG = {
  black:  (imgBlack as any).src || imgBlack,
  brown:  (imgBrown as any).src || imgBrown,
  chunky: (imgChunky as any).src || imgChunky,
  olive:  (imgOlive as any).src || imgOlive,
  tan:    (imgTan as any).src || imgTan,
  white:  (imgWhite as any).src || imgWhite,
  grey:   (imgGrey as any).src || imgGrey,
};

export const PRODUCTS: Product[] = [
  { id:1,  name:'Classic Black Chelsea',   category:'Chelsea Boots', color:'Black', price:24900, originalPrice:29900, rating:4.8, reviews:142, sizes:[39,40,41,42,43], badge:'Bestseller', sku:'CHE-001', inStock:true,  image:IMG.black  },
  { id:2,  name:'Desert Suede Boot',       category:'Chelsea Boots', color:'Brown', price:22500, originalPrice:22500, rating:4.6, reviews:98,  sizes:[38,39,40,41,42], badge:null,         sku:'CHE-002', inStock:true,  image:IMG.brown  },
  { id:3,  name:'Chunky Sole Platform',    category:'Chelsea Boots', color:'Black', price:28000, originalPrice:32000, rating:4.7, reviews:73,  sizes:[37,38,39,40,41], badge:'New',         sku:'CHE-003', inStock:true,  image:IMG.chunky },
  { id:4,  name:'Olive Green Edition',     category:'Chelsea Boots', color:'Olive', price:24900, originalPrice:24900, rating:4.5, reviews:61,  sizes:[40,41,42,43,44], badge:null,         sku:'CHE-004', inStock:true,  image:IMG.olive  },
  { id:5,  name:'Tan Heritage Ankle',      category:'Ankle Boots',   color:'Tan',   price:19900, originalPrice:24900, rating:4.4, reviews:55,  sizes:[38,39,40,41],    badge:'Sale',        sku:'ANK-001', inStock:true,  image:IMG.tan    },
  { id:6,  name:'Black Matte Ankle',       category:'Ankle Boots',   color:'Black', price:21500, originalPrice:21500, rating:4.6, reviews:89,  sizes:[39,40,41,42,43], badge:null,         sku:'ANK-002', inStock:true,  image:IMG.black  },
  { id:7,  name:'Brown Oxford Derby',      category:'Derby',         color:'Brown', price:17900, originalPrice:17900, rating:4.3, reviews:44,  sizes:[40,41,42,43,44], badge:null,         sku:'DRB-001', inStock:true,  image:IMG.brown  },
  { id:8,  name:'Black Cap-Toe Derby',     category:'Derby',         color:'Black', price:16500, originalPrice:20000, rating:4.5, reviews:67,  sizes:[38,39,40,41,42], badge:'Sale',        sku:'DRB-002', inStock:false, image:IMG.black  },
  { id:9,  name:'Tan Tassel Loafer',       category:'Loafers',       color:'Tan',   price:15900, originalPrice:15900, rating:4.2, reviews:38,  sizes:[39,40,41,42],    badge:null,         sku:'LOA-001', inStock:true,  image:IMG.tan    },
  { id:10, name:'Black Penny Loafer',      category:'Loafers',       color:'Black', price:14900, originalPrice:14900, rating:4.4, reviews:51,  sizes:[40,41,42,43,44], badge:'New',         sku:'LOA-002', inStock:true,  image:IMG.black  },
  { id:11, name:'White Runner Sneaker',    category:'Sneakers',      color:'White', price:12900, originalPrice:12900, rating:4.7, reviews:210, sizes:[38,39,40,41,42,43], badge:'Hot',      sku:'SNK-001', inStock:true,  image:IMG.chunky },
  { id:12, name:'Grey Urban Sneaker',      category:'Sneakers',      color:'Grey',  price:11500, originalPrice:14500, rating:4.3, reviews:88,  sizes:[39,40,41,42,43], badge:'Sale',        sku:'SNK-002', inStock:true,  image:IMG.brown  },
  { id:13, name:'Olive Chelsea Slim',      category:'Chelsea Boots', color:'Olive', price:26500, originalPrice:26500, rating:4.6, reviews:39,  sizes:[40,41,42],       badge:'New',         sku:'CHE-005', inStock:true,  image:IMG.olive  },
  { id:14, name:'Brown Suede Derby',       category:'Derby',         color:'Brown', price:18900, originalPrice:22000, rating:4.2, reviews:29,  sizes:[39,40,41,42],    badge:'Sale',        sku:'DRB-003', inStock:true,  image:IMG.brown  },
  { id:15, name:'Tan Slip-On Loafer',      category:'Loafers',       color:'Tan',   price:13900, originalPrice:13900, rating:4.0, reviews:22,  sizes:[39,40,41],       badge:null,         sku:'LOA-003', inStock:false, image:IMG.tan    },
  { id:16, name:'Black High-Top Sneaker',  category:'Sneakers',      color:'Black', price:15900, originalPrice:15900, rating:4.5, reviews:134, sizes:[38,39,40,41,42,43], badge:'Bestseller', sku:'SNK-003', inStock:true, image:IMG.black },
  { id:17, name:'Brown Ankle Zip Boot',    category:'Ankle Boots',   color:'Brown', price:23500, originalPrice:27000, rating:4.7, reviews:77,  sizes:[38,39,40,41,42], badge:'Sale',        sku:'ANK-003', inStock:true,  image:IMG.brown  },
  { id:18, name:'Chunky White Sole',       category:'Sneakers',      color:'White', price:14500, originalPrice:14500, rating:4.4, reviews:56,  sizes:[39,40,41,42],    badge:null,         sku:'SNK-004', inStock:true,  image:IMG.chunky },
];
