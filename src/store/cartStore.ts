import { create } from "zustand";
import { CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  totalAmount: number;
  setCart: (items: CartItem[], totalAmount: number) => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalAmount: 0,
  setCart: (items, totalAmount) => set({ items, totalAmount }),
  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (i) => i.productId._id === item.productId._id && i.size === item.size
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += item.quantity;
        return { items: newItems };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (productId, size) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.productId._id === productId && item.size === size)
      ),
    })),
  updateQuantity: (productId, size, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    })),
  clearCart: () => set({ items: [], totalAmount: 0 }),
}));
