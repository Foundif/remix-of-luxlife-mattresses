import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { ProductCard } from "@/components/site/ProductCard";
import { cartKeyOf, offerRate, rupee, useCart } from "@/components/site/cart-store";
import { products } from "@/data/products";

const title = "Your Bag — Luxlife Mattresses";
const description = "Review your Luxlife mattress selection and complete your order securely.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, count, subtotal, discount, shipping, total, remove, setQty, clear } = useCart();
  const rate = Math.round(offerRate(count) * 100);
  const recommended = products.filter((p) => !lines.some((l) => l.id === p.id)).slice(0, 4);

  return (
    <Shell>
      <div className="edge py-10 md:py-14">
        <p className="label-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / Bag
        </p>
        <h1 className="display-md mt-4">Your bag</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {count} {count === 1 ? "item" : "items"}
        </p>

        {lines.length === 0 ? (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <ShoppingBag className="size-8 opacity-40" strokeWidth={1.4} />
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link to="/shop" search={{}} className="label-xs bg-primary px-7 py-4 text-primary-foreground">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
            <div className="divide-y divide-border border-y border-border">
              {lines.map((line) => {
                const key = cartKeyOf(line);
                return (
                  <div key={key} className="flex gap-5 py-6">
                    <Link
                      to="/product/$id"
                      params={{ id: line.id }}
                      className="h-32 w-24 shrink-0 overflow-hidden bg-secondary"
                    >
                      <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Link
                            to="/product/$id"
                            params={{ id: line.id }}
                            className="text-[15px] font-semibold tracking-tight hover:underline"
                          >
                            {line.name}
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {line.category} · Size {line.size}
                          </p>
                          <p className="text-sm text-muted-foreground">{rupee(line.price)} each</p>
                        </div>
                        <p className="text-[15px] font-semibold">{rupee(line.price * line.qty)}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border border-border">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(key, line.qty - 1)}
                            className="grid size-9 place-items-center hover:bg-secondary"
                          >
                            <Minus className="size-3.5" strokeWidth={1.8} />
                          </button>
                          <span className="w-9 text-center text-xs font-semibold">{line.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(key, line.qty + 1)}
                            className="grid size-9 place-items-center hover:bg-secondary"
                          >
                            <Plus className="size-3.5" strokeWidth={1.8} />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(key)}
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 className="size-3.5" strokeWidth={1.6} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end py-5">
                <button onClick={clear} className="text-xs text-muted-foreground underline underline-offset-4">
                  Clear bag
                </button>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="label-xs">Summary</h2>
              <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">{rupee(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Multi-buy savings {rate > 0 ? `(${rate}%)` : ""}</dt>
                  <dd className="font-semibold text-volt-foreground/80">−{rupee(discount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-semibold">{shipping === 0 ? "Free" : rupee(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-semibold">{rupee(total)}</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="label-xs mt-6 block bg-primary py-4 text-center text-primary-foreground transition-colors duration-500 hover:bg-charcoal"
              >
                Checkout
              </Link>
              <Link
                to="/shop"
                search={{}}
                className="label-xs mt-3 block border border-border py-4 text-center transition-colors hover:bg-secondary"
              >
                Continue shopping
              </Link>
              <p className="mt-4 text-xs text-muted-foreground">
                Free shipping above ₹999. Taxes included. 14-day returns.
              </p>
            </aside>
          </div>
        )}

        {recommended.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <h2 className="display-md">You may also like</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
              {recommended.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
}
