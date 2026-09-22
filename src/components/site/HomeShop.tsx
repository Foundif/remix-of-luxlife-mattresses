import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/data/products";
import { Reveal } from "@/components/site/Reveal";

export function NewThisWeek() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const rail = products.filter((p) => p.badge === "NEW" || p.rating >= 4.7).slice(0, 8);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 760), behavior: "smooth" });
  };

  return (
    <section id="new-this-week" className="bg-background py-14 md:py-20">
      <div className="edge flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <h2 className="display-md">New Comforts</h2>
        </Reveal>
        <div className="flex items-center gap-3">
          <a href="#best-sellers" className="group hidden items-center gap-2 sm:inline-flex">
            <span className="label-xs">Shop all</span>
            <ArrowRight
              className="size-4 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.8}
            />
          </a>
          <div className="flex items-center gap-2">
            <button
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
              className="grid size-10 place-items-center rounded-full bg-secondary transition-colors hover:bg-border"
            >
              <ChevronLeft className="size-5" strokeWidth={1.8} />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
              className="grid size-10 place-items-center rounded-full bg-secondary transition-colors hover:bg-border"
            >
              <ChevronRight className="size-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className="edge mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-6"
      >
        {rail.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            ratio="aspect-[4/3] sm:aspect-square"
            className="w-[74vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[23vw]"
          />
        ))}
      </div>
    </section>
  );
}

export function BestSellersGrid() {
  return (
    <section id="best-sellers" className="edge bg-background pb-16 md:pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border pt-10">
        <Reveal>
          <h2 className="display-md">Best Sellers</h2>
        </Reveal>
        <a href="#new-this-week" className="group inline-flex items-center gap-2">
          <span className="label-xs">Shop all</span>
          <ArrowRight
            className="size-4 transition-transform duration-500 group-hover:translate-x-1"
            strokeWidth={1.8}
          />
        </a>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
