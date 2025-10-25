export interface ProductSize {
  size: string;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string;
  sizes: ProductSize[];
  salesCount?: number;
  averageRating?: number;
  totalRatings?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  _id?: string;
  productId: Product;
  size: string;
  quantity: number;
  addedAt?: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
  isAdmin?: boolean;
}

export interface Order {
  _id: string;
  userId: string;
  products: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    size: string;
  }[];
  totalAmount: number;
  status: string;
  address: string;
  paymentMethod: string;
  createdAt: string;
}
