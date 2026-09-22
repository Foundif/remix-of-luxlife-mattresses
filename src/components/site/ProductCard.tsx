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
    className: "bg-red-500/95 text-white font-bold backdrop-blur-md",
  },
};

export function ProductCard({
  product,
  className,
  ratio = "aspect-square",
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
        "group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border/70 bg-card transition-all duration-300 ease-[var(--ease-brand)] hover:-translate-y-1 hover:border-border hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.14)]",
        className,
      )}
    >
      {/* Visual Image Media Container (Golden Square Ratio) */}
      <div className={cn("relative overflow-hidden bg-secondary/40", ratio)}>
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
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] tracking-wider uppercase",
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
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-background/85 text-foreground shadow-sm backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              "size-3.5 sm:size-4 transition-colors",
              saved ? "fill-red-500 text-red-500" : "text-foreground",
            )}
            strokeWidth={2}
          />
        </button>

        {/* Quick Add To Bag Pill Button */}
        <button
          type="button"
          onClick={() => add(product)}
          className="absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 z-10 flex h-8 sm:h-9.5 items-center justify-center gap-1.5 rounded-full bg-ink px-3 text-bone shadow-md transition-all duration-300 ease-[var(--ease-brand)] hover:scale-[1.02] hover:bg-[#ADF831] hover:text-ink active:scale-95"
        >
          <Plus className="size-3.5 sm:size-4 shrink-0" strokeWidth={2.5} />
          <span className="text-[11px] sm:text-xs font-bold tracking-tight">Add to Bag</span>
        </button>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          {/* Rating + Firmness Spec Bar */}
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <Star className="size-3 sm:size-3.5 fill-[#ADF831] text-[#ADF831]" />
              <span className="text-[11px] sm:text-xs font-bold text-foreground">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground">({product.reviews})</span>
            </div>

            {/* Firmness Tag */}
            {product.activity && (
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-muted-foreground">
                <span className="size-1 sm:size-1.5 rounded-full bg-[#ADF831]" />
                <span className="truncate max-w-[70px] sm:max-w-none">{product.activity}</span>
              </span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-bold tracking-tight text-foreground line-clamp-1">
            <Link to="/product/$id" params={{ id: product.id }} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          {/* Category & Warranty Subtitle */}
          <p className="mt-0.5 text-[10px] sm:text-xs text-muted-foreground truncate">
            {product.category} · 10-Yr Warranty
          </p>
        </div>

        {/* Premium Unbreakable Pricing Block */}
        <div className="mt-2.5 border-t border-border/50 pt-2">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-foreground">
              {rupee(product.price)}
            </span>
            {off > 0 && (
              <span className="shrink-0 rounded-full bg-[#ADF831] px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black tracking-tight text-ink shadow-xs">
                {off}% OFF
              </span>
            )}
          </div>
          {product.mrp && (
            <p className="mt-0.5 text-[10px] sm:text-[11px] text-muted-foreground line-through">{rupee(product.mrp)}</p>
          )}
        </div>
      </div>
    </article>
  );
}
