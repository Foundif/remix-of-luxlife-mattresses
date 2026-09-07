import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { cartKeyOf, rupee, useCart } from "@/components/site/cart-store";
import { cn } from "@/lib/utils";

export function FlyCart() {
  const { lines, count, subtotal, discount, shipping, total, open, setOpen, remove, setQty } = useCart();


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
        aria-label="Shopping bag"
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[61] flex w-full max-w-[420px] flex-col bg-background text-foreground shadow-2xl transition-transform duration-500 ease-[var(--ease-brand)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <p className="label-xs">Bag ({count})</p>
          <button aria-label="Close bag" onClick={() => setOpen(false)} className="p-1">
            <X className="size-5" strokeWidth={1.6} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="size-7 opacity-40" strokeWidth={1.4} />
            <p className="text-sm text-muted-foreground">Your bag is empty. Add a pair to get started.</p>
          </div>
        ) : (
          <div className="flex-1 divide-y divide-border overflow-y-auto px-5">
            {lines.map((line) => {
              const key = cartKeyOf(line);
              return (
                <div key={key} className="flex gap-4 py-5">
                  <div className="h-24 w-20 shrink-0 overflow-hidden bg-secondary">
                    <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold tracking-tight">{line.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {line.category} · Size {line.size}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">{rupee(line.price * line.qty)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(key, line.qty - 1)}
                          className="grid size-8 place-items-center transition-colors hover:bg-secondary"
                        >
                          <Minus className="size-3.5" strokeWidth={1.8} />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{line.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(key, line.qty + 1)}
                          className="grid size-8 place-items-center transition-colors hover:bg-secondary"
                        >
                          <Plus className="size-3.5" strokeWidth={1.8} />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(key)}
                        className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="border-t border-border px-5 py-5">
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt className="label-xs">Subtotal</dt>
              <dd className="font-semibold">{rupee(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-volt-foreground/80">
                <dt className="label-xs">Multi-buy saving</dt>
                <dd className="font-semibold">−{rupee(discount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="label-xs">Shipping</dt>
              <dd className="font-semibold">{shipping === 0 ? "Free" : rupee(shipping)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 text-base">
              <dt className="label-xs">Total</dt>
              <dd className="font-semibold">{rupee(total)}</dd>
            </div>
          </dl>
          <p className="mt-2 text-xs text-muted-foreground">
            Free shipping on orders above ₹999. Taxes included.
          </p>
          <div className="mt-5 flex gap-3">
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="label-xs flex-1 border border-border py-4 text-center transition-colors hover:bg-secondary"
            >
              View bag
            </Link>
            <Link
              to="/checkout"
              onClick={(e) => {
                if (lines.length === 0) e.preventDefault();
                else setOpen(false);
              }}
              aria-disabled={lines.length === 0}
              className={cn(
                "label-xs flex-1 bg-primary py-4 text-center text-primary-foreground transition-colors duration-500 hover:bg-charcoal",
                lines.length === 0 && "pointer-events-none opacity-40",
              )}
            >
              Checkout
            </Link>
          </div>
        </div>

      </aside>
    </>
  );
}
