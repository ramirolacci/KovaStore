export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: 'products' | 'accessories';
  gender?: 'men' | 'women' | 'kids' | 'unisex';
  description?: string;
  sizes?: string[];
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export type CategoryFilter = 'all' | 'products' | 'accessories' | 'women' | 'men' | 'kids' | 'new';
