import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { products as fallbackProducts } from "@/data/products";
import { productsQuery } from "@/lib/catalog";
import { rupee } from "@/components/site/cart-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StoreSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data } = useQuery({ ...productsQuery, enabled: open });
  const catalog = data && data.length > 0 ? data : fallbackProducts;

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return catalog.slice(0, 5);
    return catalog
      .filter((product) =>
        [product.name, product.category, product.activity].some((value) => value.toLowerCase().includes(term)),
      )
      .slice(0, 6);
  }, [catalog, query]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 250);
    if (!open) setQuery("");
  }, [open]);

  return (
    <div className={cn("fixed inset-0 z-[70]", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className={cn("absolute inset-0 bg-ink/65 backdrop-blur-sm transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className={cn(
          "absolute inset-x-0 top-0 max-h-[92svh] overflow-y-auto bg-background text-foreground shadow-2xl transition-transform duration-500 ease-[var(--ease-brand)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="edge mx-auto max-w-5xl py-5 md:py-8">
          <div className="flex items-center gap-3 border-b-2 border-foreground pb-3">
            <Search className="size-5 shrink-0" strokeWidth={1.8} />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") onClose();
              }}
              placeholder="Search KRUX products"
              aria-label="Search KRUX products"
              className="min-w-0 flex-1 bg-transparent font-display text-xl font-bold uppercase outline-none placeholder:text-muted-foreground md:text-3xl"
            />
            <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close search">
              <X className="size-5" />
            </Button>
          </div>

          <p className="label-xs mt-6 text-muted-foreground">{query.trim() ? "Recommended products" : "Popular now"}</p>
          {results.length > 0 ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to="/product/$id"
                  params={{ id: product.id }}
                  onClick={onClose}
                  className="group flex items-center gap-4 border-b border-border py-3 transition-colors hover:bg-secondary/60 sm:px-3"
                >
                  <img src={product.image} alt="" className="size-20 shrink-0 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{product.name}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{product.category}</span>
                    <span className="mt-2 block text-sm font-semibold">{rupee(product.price)}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-12 text-sm text-muted-foreground">No matching products. Try a style or activity.</p>
          )}

          {query.trim() && (
            <Link
              to="/shop"
              search={{ q: query.trim() }}
              onClick={onClose}
              className="label-xs mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1"
            >
              View all results <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}