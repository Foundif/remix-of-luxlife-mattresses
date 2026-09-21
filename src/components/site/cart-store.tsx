import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartLine = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  size: string;
  qty: number;
};

type CartApi = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product, size?: string, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartApi | null>(null);

const keyOf = (line: CartLine) => `${line.id}__${line.size}`;
const STORAGE_KEY = "luxlife.cart.v1";

export function offerRate(count: number) {
  if (count >= 3) return 0.12;
  if (count >= 2) return 0.08;
  return 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota errors */
    }
  }, [lines]);

  const add = useCallback((product: Product, chosenSize?: string, qty = 1) => {
    const selectedSize = chosenSize ?? product.sizes[1] ?? product.sizes[0] ?? "Queen";

    setLines((prev) => {
      const idx = prev.findIndex((l) => l.id === product.id && l.size === selectedSize);
      if (idx > -1) {
        const next = [...prev];
        const line = next[idx]!;
        next[idx] = { ...line, qty: line.qty + qty };
        return next;
      }
      return [
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          size: selectedSize,
          qty,
        },
        ...prev,
      ];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => keyOf(l) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => prev.flatMap((l) => (keyOf(l) === key ? (qty <= 0 ? [] : [{ ...l, qty }]) : [l])));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
    const discount = Math.round(subtotal * offerRate(count));
    const afterDiscount = subtotal - discount;
    const shipping = count === 0 || afterDiscount >= 999 ? 0 : 79;
    return {
      lines,
      count,
      subtotal,
      discount,
      shipping,
      total: afterDiscount + shipping,
      open,
      setOpen,
      add,
      remove,
      setQty,
      clear,
    };
  }, [lines, open, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const cartKeyOf = keyOf;
export const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;
