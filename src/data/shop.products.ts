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

// Shared placeholder images that match product type
const IMG = {
  black:  'https://lh3.googleusercontent.com/aida-public/AB6AXuB5PWmFH5hvGQwwi1fBMEDbaqwt9Ewy4P6LJohUdcvCNkEIP4VEI57Pq8ZyrkHxXXBfIH2QWrsmiFqQ_zPKqs_QTNKimn51p4HoYFy-vj2sDBTUbT4Kz9vkSJVeaBcNy2onU1rUqoRI5QhcOKBSgA1QguS0z7P5KYbfKzergVqh5ZzB8WZzvRWD5IbTBS1VQHuGsF8zFRXLBrX2yuosZGVGryYLIjYDzFpKtFxpx4-Ta-jKWYGBK5RdZKX71Dg2-UAh70KOt9OMOAA',
  brown:  'https://lh3.googleusercontent.com/aida-public/AB6AXuC_jrFpjKenNgj3QqfEOdf2fZcdMQW9sb9Vt28n1vBT_wLccd6I5VNLeN4cFmWJwzDKGY9yBxGDrkRSxqtY1fK8AylKCnZ2541XulhA_Kau2GPqtHnxI4aEpTzIyk1rf23lNJKwJ0bmD4e9NSrSbDad3QuqsSy5Wh1PejKPaW3XO3TKJB1v0AYqjxGwHO2laH6NMPeWd_BY0oyprOiW7CQIDiNEco8H8RnxMpqZbOQM9iyt3VtkQH31sf8db439qTQuoJ7GqGCZH2Q',
  chunky: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCF0N4uCBKjlB7ZGr4WW187KDNUadEcsPPw1fUDCR8vdtqWJ1fyCKBxSWD_tDoEYs2yCadqNsAcQmRsI_ZI6eXRzXLxJllyDnXnO1z-jN593DYWsz9gE-OFCTe6DHh0RtLIzM0I6W4iELRnPialBH9fyMWgzfv4dEHvJl7bCqViRTKbVfpakx26ojtIpwU3Yo6zEhKBe7pdL8fliPubuRSSS-VWYWxKaoQZ6L-3tY-90L-zT92n42_ez2Nx8RhQpRVgnXMnhXCj_4',
  olive:  'https://lh3.googleusercontent.com/aida-public/AB6AXuC1dENSiDBqOw_6yuR-h06QOqjaaizCcWaYp9-xsBxUn-uM3bS62h7d7sQOZAsuY_KGYgtfiy20s7hQbRvl8A4uaVOQHzTAgh0DoyRyOihZM7luwf3YwdUIFd4-KluyLVcgvDJF7_2Lgw2kcP_xh4WyZxeVFYYlX4WHzrUfOGyS2zQg1y5KzK-Ok4IMgyecrf-GqoXhHhTovSZpp-h92HkvKEoZZQC-IkgoKggCV8bipTQyxwVnC8t-U-BfALKe_reBusMIxUcyWxQ',
  tan:    'https://lh3.googleusercontent.com/aida-public/AB6AXuBRzhXgkXLZVxkVmw1tfwfK71Wr3iqmb7lf9djOCFwECzcTANA4W-R5gthYbUNAEqxXRGVHJf9UvKItwRxKOM0GdRbZzSXCnZuqeUqqNfIuW3ycz_SPW0BmPDIt2RM9K0pMhHsRuCE2NlW7orOm2mccqPy2k_EwDB8lMrtp8ALzdXjP83nb5foTNo-dae9cri73QNfjnt7ZqTikGnmkWmgX_ZGPaha_xdut-1APqQNaiMMH1sqIB4uBrIvIOh2Mfh8CI5ki5XFwuz8',
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
