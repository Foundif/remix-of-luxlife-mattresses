import { useCustomMattress } from "@/components/site/CustomMattress";
import { Ruler } from "lucide-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Star, Truck, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/site/Shell";
import { ProductCard } from "@/components/site/ProductCard";
import { rupee, useCart } from "@/components/site/cart-store";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Luxlife Mattresses" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Luxlife Mattresses`;
    const description = `${product.name}: a ${product.category} mattress with a ${product.activity.toLowerCase()} comfort feel, made for restorative sleep. ${rupee(product.price)}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <Shell>
      <div className="edge py-32 text-center">
        <h1 className="display-md">Product not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This style is no longer available.</p>
        <Link
          to="/shop"
          search={{}}
          className="label-xs mt-8 inline-block bg-primary px-7 py-4 text-primary-foreground"
        >
          Shop all mattresses
        </Link>
      </div>
    </Shell>
  ),
});

function ProductPage() {
  const { openCustomMattress } = useCustomMattress();

  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);
  const [color, setColor] = useState(product.colors[0]!);
  const gallery = [product.image, product.hoverImage, product.image, product.hoverImage];
  const [active, setActive] = useState(0);
  const off = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const related = products.filter((p) => p.id !== product.id && p.activity === product.activity).slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4);
  const suggestions = related.length >= 2 ? related : fallbackRelated;

  function handleAdd() {
    if (!size) {
      toast.error("Select a size first");
      return;
    }
    add(product, size, qty);
    setOpen(true);
    toast.success(`${product.name} added to bag`);
  }

  return (
    <Shell>
      <div className="edge py-6 md:py-10">
        <p className="label-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/shop" search={{}} className="hover:text-foreground">
            Shop
          </Link>{" "}
          / {product.name}
        </p>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <img
                src={gallery[active]}
                alt={`${product.name} — view ${active + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={cn(
                    "aspect-square overflow-hidden bg-secondary transition-opacity",
                    active === i ? "ring-2 ring-foreground" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <img src={src} alt="" aria-hidden className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:pt-2">
            <p className="label-xs text-muted-foreground">
              {product.category} · {product.activity}
            </p>
            <h1 className="display-md mt-3">{product.name}</h1>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-current" strokeWidth={0} />
                {product.rating}
              </span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <p className="mt-5 text-xl font-semibold tracking-tight">
              {rupee(product.price)}
              {product.mrp && (
                <>
                  <span className="ml-3 text-base font-normal text-muted-foreground line-through">
                    {rupee(product.mrp)}
                  </span>
                  <span className="ml-3 text-base font-semibold text-volt-foreground/80">{off}% off</span>
                </>
              )}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes.</p>

            <div className="mt-8">
              <p className="label-xs">Comfort — {color}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "label-xs border px-4 py-2 transition-colors",
                      color === c
                        ? "border-foreground bg-primary text-primary-foreground"
                        : "border-border hover:bg-secondary",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <p className="label-xs">Select size</p>
                <span className="text-xs text-muted-foreground">Size guide</span>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "border py-3.5 text-sm font-semibold transition-colors",
                      size === s
                        ? "border-foreground bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-concrete">Standard cot dimensions</span>
                <button
                  type="button"
                  onClick={() => openCustomMattress(product.name)}
                  className="inline-flex items-center gap-1 font-medium text-volt hover:underline"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  Need custom dimensions?
                </button>
              </div>

              {!size && <p className="mt-2 text-xs text-muted-foreground">Please select a size.</p>}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-11 place-items-center hover:bg-secondary"
                >
                  <Minus className="size-4" strokeWidth={1.8} />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="grid size-11 place-items-center hover:bg-secondary"
                >
                  <Plus className="size-4" strokeWidth={1.8} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Buy 2 save 10% · Buy 3 save 18% · Buy 5 save 25%</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleAdd}
                className="label-xs flex-1 bg-primary py-4 text-primary-foreground transition-colors duration-500 hover:bg-charcoal"
              >
                Add to bag
              </button>
              <button
                onClick={() => setSaved((v) => !v)}
                aria-pressed={saved}
                className="label-xs flex items-center justify-center gap-2 border border-border px-6 py-4 transition-colors hover:bg-secondary"
              >
                <Heart className={cn("size-4", saved && "fill-current")} strokeWidth={1.6} />
                {saved ? "Saved" : "Save"}
              </button>
            </div>

            <ul className="mt-8 grid gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Truck className="size-4" strokeWidth={1.6} /> Free delivery across Salem
              </li>
              <li className="flex items-center gap-3">
                <Undo2 className="size-4" strokeWidth={1.6} /> Easy replacement support
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="size-4" strokeWidth={1.6} /> Up to 10-year warranty
              </li>
            </ul>

            <dl className="mt-8 divide-y divide-border border-y border-border">
              {[
                ["Comfort layers", "High-density comfort foam with pressure-relieving support"],
                ["Support", `${product.activity} feel with balanced spinal alignment`],
                ["Cover", "Breathable premium knitted fabric with a soft-touch finish"],
                ["Care", "Rotate regularly and use with a supportive bed base"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                  <dt className="label-xs">{k}</dt>
                  <dd className="text-sm text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <section className="mt-20 border-t border-border pt-12">
          <h2 className="display-md">You might also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
