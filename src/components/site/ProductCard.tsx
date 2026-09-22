import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/data/products";
import { rupee, useCart } from "@/components/site/cart-store";
import { cn } from "@/lib/utils";

const badgeConfig: Record<NonNullable<Product["badge"]>, { label: string; className: string }> = {
  NEW: {
    label: "JUST IN",
    className: "bg-[#ADF831] text-ink font-bold",
  },
  BESTSELLER: {
    label: "BEST SELLER",
    className: "bg-[#ADF831] text-ink font-black shadow-sm",
  },
  "LOW STOCK": {
    label: "SELLING FAST",
    className: "bg-red-500/90 text-white font-bold backdrop-blur-md",
  },
};

export function ProductCard({
  product,
  className,
  ratio = "aspect-[4/3] sm:aspect-square",
}: {
  product: Product;
  className?: string;
  ratio?: string;
}) {
  const { add } = useCart();
  const [saved, setSaved] = useState(false);
  const off = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-border hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.14)]",
        className,
      )}
    >
      {/* Visual Image Media Container */}
      <div className={cn("relative overflow-hidden bg-secondary/50", ratio)}>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label={product.name}
          className="absolute inset-0 block"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[var(--ease-brand)] group-hover:scale-105 group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-100 object-cover opacity-0 transition-all duration-700 ease-[var(--ease-brand)] group-hover:scale-105 group-hover:opacity-100"
          />
        </Link>

        {/* Floating Top Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] tracking-wider uppercase",
                badgeConfig[product.badge]?.className,
              )}
            >
              {badgeConfig[product.badge]?.label}
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          aria-label={`Save ${product.name}`}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-background/80 text-foreground backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn("size-4 transition-colors", saved ? "fill-red-500 text-red-500" : "text-foreground")}
            strokeWidth={2}
          />
        </button>

        {/* Quick Add To Bag Pill Button */}
        <button
          type="button"
          onClick={() => add(product)}
          className="absolute inset-x-3 bottom-3 z-10 flex h-11 items-center justify-center gap-2 rounded-full bg-ink px-4 text-bone shadow-lg transition-all duration-300 ease-[var(--ease-brand)] hover:scale-[1.02] hover:bg-[#ADF831] hover:text-ink active:scale-95"
        >
          <Plus className="size-4" strokeWidth={2.5} />
          <span className="text-xs font-bold tracking-tight">Add to Bag</span>
        </button>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          {/* Rating + Firmness Spec Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-[#ADF831] text-[#ADF831]" />
              <span className="text-xs font-bold text-foreground">{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-muted-foreground">({product.reviews})</span>
            </div>

            {/* Firmness / Feel Tag */}
            {product.activity && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-[#ADF831]" />
                {product.activity}
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="mt-2 text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-foreground">
            <Link to="/product/$id" params={{ id: product.id }} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          {/* Category & Warranty Subtitle */}
          <p className="mt-0.5 text-xs text-muted-foreground">{product.category} · 10-Yr Warranty</p>
        </div>

        {/* Pricing Block */}
        <div className="mt-4 flex items-baseline justify-between border-t border-border/50 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
              {rupee(product.price)}
            </span>
            {product.mrp && <span className="text-xs text-muted-foreground line-through">{rupee(product.mrp)}</span>}
          </div>

          {off > 0 && (
            <span className="rounded-full bg-[#ADF831]/20 px-2 py-0.5 text-[11px] font-black text-ink dark:text-[#ADF831]">
              {off}% OFF
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
