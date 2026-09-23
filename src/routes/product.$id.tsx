import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Star, Truck, ShoppingBag, Undo2, MessageSquare, Check } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/site/Shell";
import { ProductCard } from "@/components/site/ProductCard";
import { rupee, useCart } from "@/components/site/cart-store";
import { doubleSideQuiltPricing, products } from "@/data/products";
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
    const description = `${product.name}: a ${product.category} mattress engineered in Salem. Starting at ${rupee(product.price)}.`;
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
        <p className="mt-3 text-sm text-muted-foreground">This mattress model is no longer available.</p>
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
  const { product } = Route.useLoaderData();
  const { add, setOpen } = useCart();

  // Active configuration state
  const [thickness, setThickness] = useState<string>(product.thicknesses[0] ?? '6"');
  const [dimension, setDimension] = useState<string>(product.sizes[0] ?? "75 X 36");
  const [hasDoubleQuilt, setHasDoubleQuilt] = useState<boolean>(false);
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);
  const [color, setColor] = useState(product.colors[0]!);
  const gallery = [product.image, product.hoverImage, product.image, product.hoverImage];
  const [active, setActive] = useState(0);

  // Find selected variant entry
  const selectedVariant = useMemo(() => {
    return product.priceMatrix.find((m) => m.dimension === dimension) ?? product.priceMatrix[0];
  }, [product, dimension]);

  // Calculate dynamic price
  const basePrice = selectedVariant?.prices[thickness] ?? product.price;

  // Calculate double quilt cost based on mattress width
  const quiltCost = useMemo(() => {
    if (!hasDoubleQuilt || !selectedVariant) return 0;
    const w = selectedVariant.widthInches;
    const match = doubleSideQuiltPricing.find((tier) => w <= tier.maxWidth);
    return match?.price ?? 1100;
  }, [hasDoubleQuilt, selectedVariant]);

  const unitPrice = basePrice + quiltCost;
  const calculatedMrp = Math.round(unitPrice * 1.35); // 35% standard MRP markup
  const off = Math.round(((calculatedMrp - unitPrice) / calculatedMrp) * 100);

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  function handleAdd() {
    const descriptor = `${dimension} · ${thickness}${hasDoubleQuilt ? " · Double Quilt" : ""}`;
    // Pass configured price to bag
    add({ ...product, price: unitPrice }, descriptor, qty);
    setOpen(true);
    toast.success(`${product.name} (${descriptor}) added to bag`);
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Luxlife! I am inquiring about the ${product.name}.\nSize: ${dimension} inches\nThickness: ${thickness}\nDouble Side Quilt: ${hasDoubleQuilt ? "Yes" : "No"}\nQuoted Price: ₹${unitPrice.toLocaleString("en-IN")}\nDo you have custom sizes or dealer margins available?`,
  );

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
          {/* Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary border border-border">
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
                    "aspect-square overflow-hidden rounded-xl bg-secondary border transition-all",
                    active === i ? "border-foreground ring-2 ring-foreground" : "opacity-70 hover:opacity-100",
                  )}
                >
                  <img src={src} alt="" aria-hidden className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-2">
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {product.category} · {product.activity}
            </span>
            <h1 className="display-md mt-2">{product.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{product.subtitle}</p>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 font-semibold">
                <Star className="size-4 fill-[#ADF831] text-[#ADF831]" />
                {product.rating}
              </span>
              <span className="text-muted-foreground">({product.reviews} verified reviews)</span>
            </div>

            {/* Dynamic Price Calculation */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold tracking-tight text-foreground">
                ₹{unitPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-base text-muted-foreground line-through">
                ₹{calculatedMrp.toLocaleString("en-IN")}
              </span>
              <span className="rounded-md bg-[#ADF831] px-2 py-0.5 text-xs font-bold text-ink">{off}% OFF</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Factory direct price · Inclusive of GST</p>

            {/* Thickness Selector */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <p className="label-xs font-bold">Select Thickness / Height</p>
                <span className="text-xs text-muted-foreground">Thickness: {thickness}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.thicknesses.map((th) => (
                  <button
                    key={th}
                    type="button"
                    onClick={() => setThickness(th)}
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-xs font-bold transition-all",
                      thickness === th
                        ? "border-[#ADF831] bg-[#ADF831] text-ink shadow-xs"
                        : "border-border hover:bg-secondary text-foreground",
                    )}
                  >
                    {th}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions (Inches) Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="label-xs font-bold">Select Bed Dimensions (Inches)</p>
                <span className="text-xs text-muted-foreground">{selectedVariant?.label}</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {product.priceMatrix.map((item) => (
                  <button
                    key={item.dimension}
                    type="button"
                    onClick={() => setDimension(item.dimension)}
                    className={cn(
                      "flex flex-col items-start rounded-xl border p-2.5 text-left transition-all",
                      dimension === item.dimension
                        ? "border-foreground bg-primary text-primary-foreground shadow-xs"
                        : "border-border hover:border-foreground/40 text-foreground",
                    )}
                  >
                    <span className="text-xs font-bold">{item.dimension}″</span>
                    <span className="text-[10px] opacity-75">{item.label.split(" (")[0]}</span>
                    <span className="mt-1 text-[11px] font-semibold">
                      ₹
                      {(
                        item.prices[thickness] ??
                        item.prices[product.thicknesses[0] ?? ""] ??
                        product.price
                      ).toLocaleString("en-IN")}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-on: Double Side Quilt (Chinna) */}
            <div className="mt-6 rounded-2xl border border-border bg-secondary/50 p-4">
              <label className="flex cursor-pointer items-center justify-between gap-3">
                <div>
                  <span className="block text-xs font-bold text-foreground">Double Side Quilt (Chinna)</span>
                  <span className="block text-[11px] text-muted-foreground">
                    Both sides quilted in knitted fabric for flippable comfort (+₹
                    {selectedVariant
                      ? (doubleSideQuiltPricing.find((t) => selectedVariant.widthInches <= t.maxWidth)?.price ?? 1100)
                      : 1100}
                    )
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={hasDoubleQuilt}
                  onChange={(e) => setHasDoubleQuilt(e.target.checked)}
                  className="size-5 accent-[#ADF831] cursor-pointer rounded"
                />
              </label>
            </div>

            {/* Quantity and Actions */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-11 place-items-center hover:bg-secondary"
                >
                  <Minus className="size-4" strokeWidth={1.8} />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="grid size-11 place-items-center hover:bg-secondary"
                >
                  <Plus className="size-4" strokeWidth={1.8} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Bulk order? Contact for 20%–30% dealer margin.</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAdd}
                className="label-xs flex-1 rounded-xl bg-ink py-4 font-bold text-bone transition-all duration-300 hover:bg-[#ADF831] hover:text-ink active:scale-95"
              >
                Add to bag · ₹{(unitPrice * qty).toLocaleString("en-IN")}
              </button>
              <button
                type="button"
                onClick={() => setSaved((v) => !v)}
                aria-pressed={saved}
                className="label-xs flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-4 transition-colors hover:bg-secondary"
              >
                <Heart className={cn("size-4", saved && "fill-current text-red-500")} strokeWidth={1.6} />
                {saved ? "Saved" : "Save"}
              </button>
            </div>

            {/* Direct WhatsApp Custom / Dealer Link */}
            <a
              href={`https://wa.me/916382654934?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <MessageSquare className="size-4 text-[#ADF831]" />
              <span>Need custom size, custom color, or dealer bulk rates? WhatsApp us</span>
            </a>

            {/* Factory Badges from Price Sheet */}
            <ul className="mt-8 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="size-4 text-[#ADF831]" /> Free delivery within Salem Area
              </li>
              <li className="flex items-center gap-3">
                <Check className="size-4 text-[#ADF831]" /> 100% Knitted Quilt Fabric & Long Lasting Comfort
              </li>
              <li className="flex items-center gap-3">
                <Check className="size-4 text-[#ADF831]" /> Factory: Mariamman Kovil St, Seelanaickenpatti, Salem
              </li>
            </ul>
          </div>
        </div>

        {/* Related Mattresses */}
        <section className="mt-20 border-t border-border pt-12">
          <h2 className="display-md">Explore other models</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Mobile Add to Bag Bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t border-border bg-background/95 px-5 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))" }}
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate max-w-[150px]">
            {dimension} · {thickness}
          </span>
          <span className="text-lg font-bold text-foreground">₹{unitPrice.toLocaleString("en-IN")}</span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wider text-bone shadow-md transition-all duration-300 hover:bg-[#ADF831] hover:text-ink active:scale-95"
        >
          <ShoppingBag className="size-4" />
          <span>Add to bag</span>
        </button>
      </div>
    </Shell>
  );
}
