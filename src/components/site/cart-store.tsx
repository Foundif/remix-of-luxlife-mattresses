import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
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
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: Product, size?: string) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
};

const CartContext = createContext<CartApi | null>(null);

const keyOf = (line: CartLine) => `${line.id}__${line.size}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = useCallback((product: Product, size?: string) => {
    const chosen = size ?? product.sizes[1] ?? product.sizes[0] ?? "M";
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.id === product.id && l.size === chosen);
      if (idx > -1) {
        const next = [...prev];
        const line = next[idx]!;
        next[idx] = { ...line, qty: line.qty + 1 };
        return next;
      }
      return [
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          size: chosen,
          qty: 1,
        },
        ...prev,
      ];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => keyOf(l) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev.flatMap((l) => (keyOf(l) === key ? (qty <= 0 ? [] : [{ ...l, qty }]) : [l])),
    );
  }, []);

  const value = useMemo<CartApi>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.price, 0);
    return { lines, count, subtotal, open, setOpen, add, remove, setQty };
  }, [lines, open, add, remove, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const cartKeyOf = keyOf;
export const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;
