export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount?: number;
  image: string;
  category: 'products' | 'accessories';
  gender?: 'men' | 'women' | 'kids' | 'unisex';
  description?: string;
  sizes?: string[];
  isNew?: boolean;
  tag?: 'BESTSELLER' | 'LIMITED' | 'NEW' | 'HOT';
  stockCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export type CategoryFilter = 'all' | 'products' | 'accessories' | 'women' | 'men' | 'kids' | 'new';
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
