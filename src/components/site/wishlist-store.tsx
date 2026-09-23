import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { products, type Product } from "@/data/products";

type WishlistContextType = {
  ids: string[];
  items: Product[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  has: (id: string) => boolean;
  toggle: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);
const STORAGE_KEY = "luxlife.wishlist.v1";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIds(JSON.parse(raw) as string[]);
    } catch {
      /* ignore storage read error */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore quota errors */
    }
  }, [ids]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((product: Product) => {
    setIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        toast.info(`Removed ${product.name} from Wishlist`);
        return prev.filter((i) => i !== product.id);
      } else {
        toast.success(`Saved ${product.name} to Wishlist`);
        return [...prev, product.id];
      }
    });
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((i) => i !== id));
    toast.info("Removed from Wishlist");
  }, []);

  const clear = useCallback(() => {
    setIds([]);
    toast.info("Wishlist cleared");
  }, []);

  const items = useMemo(() => {
    return ids
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [ids]);

  const value = useMemo(
    () => ({
      ids,
      items,
      count: ids.length,
      open,
      setOpen,
      has,
      toggle,
      remove,
      clear,
    }),
    [ids, items, open, has, toggle, remove, clear],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
