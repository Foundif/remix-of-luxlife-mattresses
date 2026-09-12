import { Link } from "@tanstack/react-router";
import { Heart, Plus } from "lucide-react";

import { useState } from "react";
import type { Product } from "@/data/products";
import { rupee, useCart } from "@/components/site/cart-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const badgeLabel: Record<NonNullable<Product["badge"]>, string> = {
  NEW: "Just In",
  BESTSELLER: "Best Seller",
  "LOW STOCK": "Almost Gone",
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
    <article className={cn("group relative flex flex-col", className)}>
      <div className={cn("relative overflow-hidden bg-secondary", ratio)}>
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
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-brand)] group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-0 transition-all duration-700 ease-[var(--ease-brand)] group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        <Button
          type="button"
          variant="secondary"
          size="icon"
          aria-label={`Save ${product.name}`}
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
          className="absolute top-3 right-3 z-10 size-9 rounded-full bg-background/90 text-foreground shadow-sm transition-transform duration-300 hover:scale-105"
        >
          <Heart className={cn("size-4", saved && "fill-current")} strokeWidth={1.6} />
        </Button>

        <Button
          type="button"
          onClick={() => add(product)}
          className="absolute inset-x-3 bottom-3 z-10 h-11 rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 ease-[var(--ease-brand)] hover:scale-[1.02]"
        >
          <Plus className="size-4" strokeWidth={2} />
          <span className="label-xs">Add to bag</span>
        </Button>
      </div>

      <div className="pt-4">
        {product.badge && <p className="label-xs text-volt-foreground/70">{badgeLabel[product.badge]}</p>}
        <h3 className="mt-1 text-[15px] font-semibold tracking-tight">
          <Link to="/product/$id" params={{ id: product.id }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>

        <p className="text-sm text-muted-foreground">{product.colors.length} Colours</p>
        <p className="mt-2 text-[15px] font-semibold tracking-tight">
          {rupee(product.price)}
          {product.mrp && (
            <>
              <span className="ml-2 text-sm font-normal text-muted-foreground line-through">
                {rupee(product.mrp)}
              </span>
              <span className="ml-2 text-sm font-semibold text-volt-foreground/80">{off}% off</span>
            </>
          )}
        </p>
      </div>
    </article>
  );
}
