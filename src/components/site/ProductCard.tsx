import { Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function ProductCard({
  product,
  className,
  ratio = "aspect-[4/5]",
}: {
  product: Product;
  className?: string;
  ratio?: string;
}) {
  const off = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <article className={cn("group relative", className)}>
      <div className={cn("relative overflow-hidden bg-secondary", ratio)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-[1.03] group-hover:opacity-0"
        />
        <img
          src={product.hoverImage}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-all duration-[900ms] ease-[var(--ease-brand)] group-hover:scale-100 group-hover:opacity-100"
        />

        {product.badge && (
          <span className="label-xs absolute top-3 left-3 bg-ink px-2.5 py-1.5 text-bone">
            {product.badge}
          </span>
        )}

        <button
          aria-label={`Add ${product.name} to wishlist`}
          onClick={() => toast.success("Saved to wishlist")}
          className="absolute top-3 right-3 grid size-9 place-items-center bg-bone/85 text-ink opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Heart className="size-4" strokeWidth={1.6} />
        </button>

        <button
          onClick={() => toast.success(`${product.name} added to bag`)}
          className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-between bg-ink px-4 py-3 text-bone opacity-0 transition-all duration-500 ease-[var(--ease-brand)] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
        >
          <span className="label-xs">Quick Add</span>
          <Plus className="size-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="flex items-start justify-between gap-4 pt-4">
        <div>
          <p className="label-xs text-muted-foreground">{product.category}</p>
          <h3 className="mt-1.5 text-[15px] font-semibold tracking-tight">{product.name}</h3>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-current text-ink" strokeWidth={0} />
            <span className="font-semibold text-foreground">{product.rating}</span>
            <span>({product.reviews})</span>
            <span className="mx-1 opacity-40">·</span>
            <span>{product.colors.length} colours</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[15px] font-semibold tracking-tight">{rupee(product.price)}</p>
          {product.mrp && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              <span className="line-through">{rupee(product.mrp)}</span>{" "}
              <span className="font-semibold text-foreground">{off}% off</span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
