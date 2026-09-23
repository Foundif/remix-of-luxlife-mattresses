import { Link } from "@tanstack/react-router";
import { Heart, Plus, Trash2, X } from "lucide-react";
import { useWishlist } from "@/components/site/wishlist-store";
import { useCart, rupee } from "@/components/site/cart-store";
import { cn } from "@/lib/utils";

export function WishlistDrawer() {
  const { items, count, open, setOpen, remove, clear } = useWishlist();
  const { add } = useCart();

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-label="Wishlist"
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[61] flex w-full max-w-[420px] flex-col bg-background text-foreground shadow-2xl transition-transform duration-500 ease-[var(--ease-brand)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div className="flex items-center gap-2">
            <Heart className="size-4 fill-red-500 text-red-500" />
            <p className="label-xs font-bold uppercase tracking-wider">Wishlist ({count})</p>
          </div>
          <div className="flex items-center gap-2">
            {count > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Clear all
              </button>
            )}
            <button aria-label="Close wishlist" onClick={() => setOpen(false)} className="p-1">
              <X className="size-5" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
              <Heart className="size-7 opacity-40 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-foreground">Your wishlist is empty</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Save your favourite mattresses here to compare feels and thickness later.
              </p>
            </div>
            <Link
              to="/shop"
              search={{}}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              Browse Mattresses
            </Link>
          </div>
        ) : (
          <div className="flex-1 divide-y divide-border overflow-y-auto px-5">
            {items.map((product) => (
              <div key={product.id} className="flex gap-4 py-4">
                <Link
                  to="/product/$id"
                  params={{ id: product.id }}
                  onClick={() => setOpen(false)}
                  className="size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary"
                >
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to="/product/$id"
                        params={{ id: product.id }}
                        onClick={() => setOpen(false)}
                        className="text-sm font-bold text-foreground hover:underline"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{product.category} • {product.activity}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => remove(product.id)}
                      className="text-muted-foreground hover:text-red-500 p-1"
                    >
                      <Trash2 className="size-4" strokeWidth={1.8} />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">
                      Starts at {rupee(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        add(product);
                        remove(product.id);
                      }}
                      className="inline-flex h-7 items-center gap-1 rounded-full bg-ink px-2.5 text-[11px] font-bold text-bone hover:bg-[#ADF831] hover:text-ink transition-colors"
                    >
                      <Plus className="size-3" strokeWidth={2.5} />
                      Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
