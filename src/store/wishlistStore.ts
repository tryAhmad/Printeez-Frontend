import { create } from "zustand";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
  setWishlist: (items: Product[]) => void;
  addItem: (item: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  setWishlist: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item._id !== productId),
    })),
  isInWishlist: (productId) =>
    get().items.some((item) => item._id === productId),
}));
