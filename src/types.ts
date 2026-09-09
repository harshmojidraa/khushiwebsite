export type ProductCategory = 
  | 'Apparel' 
  | 'Drinkware' 
  | 'Accessories' 
  | 'Stationery' 
  | 'Lifestyle' 
  | 'Collections';

export type ProductBrand = 
  | 'Google' 
  | 'Android' 
  | 'Chrome' 
  | 'YouTube' 
  | 'Pixel' 
  | 'Google Cloud';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: ProductBrand;
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isRecommended?: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string; // unique cart line item id (e.g. `${product.id}-${color}-${size}`)
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type PageView = 
  | 'home' 
  | 'new' 
  | 'apparel' 
  | 'drinkware' 
  | 'accessories' 
  | 'stationery' 
  | 'lifestyle' 
  | 'collections' 
  | 'brand' 
  | 'sale' 
  | 'search' 
  | 'product-detail';

export type SortOption = 
  | 'featured' 
  | 'price-low' 
  | 'price-high' 
  | 'rating' 
  | 'newest';
