import { ArrowRight, Wind, Footprints, ShieldCheck, Ruler } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ProductCard } from "@/components/site/ProductCard";
import { activities, categories, media, products } from "@/data/products";
import { useScrollY } from "@/hooks/use-in-view";

export function BrandStatement() {
  return (
    <section className="edge bg-bone py-24 text-ink md:py-36">
      <Reveal>
        <p className="label-xs text-muted-foreground">02 — The Idea</p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="display-lg mt-8 max-w-[22ch]">
          Not just socks. Engineered for how you move
          <span className="text-volt">.</span>
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
        {[
          { icon: Wind, title: "Breathable zones", copy: "Mesh channels placed over the arch and instep to move heat out fast." },
          { icon: Footprints, title: "Targeted cushioning", copy: "Density-mapped heel and forefoot pads that absorb impact, not shape." },
          { icon: ShieldCheck, title: "Holds its fit", copy: "Reinforced elastic band tested past 100 washes without slipping." },
        ].map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <item.icon className="size-5" strokeWidth={1.5} />
            <h3 className="mt-5 text-base font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FeaturedCollection() {
  const [lead, ...rest] = products;
  if (!lead || rest.length < 3) return null;
  return (
    <section className="edge bg-bone pb-24 md:pb-36">
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-10">
        <div>
          <p className="label-xs text-muted-foreground">03 — Featured</p>
          <h2 className="display-md mt-4">The Collection</h2>
        </div>
        <a href="/" className="group inline-flex items-center gap-3">
          <span className="label-xs">View all</span>
          <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1.5" strokeWidth={1.8} />
        </a>
      </div>

      <div className="mt-12 grid gap-x-6 gap-y-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <ProductCard product={lead} ratio="aspect-[4/5] lg:aspect-[16/13]" />
        </Reveal>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-5 lg:mt-24">
          {rest.slice(0, 2).map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <ProductCard product={p} />
            </Reveal>
          ))}
          <Reveal delay={200} className="sm:col-span-2">
            <ProductCard product={rest[2]} ratio="aspect-[16/10]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ShopByCategory() {
  return (
    <section className="bg-ink py-24 text-bone md:py-32">
      <div className="edge flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-xs text-volt">04 — Shop by category</p>
          <h2 className="display-md mt-4">Pick your lane</h2>
        </div>
      </div>
      <div className="edge mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 80}>
            <a href="/" className="group relative block aspect-[3/4] overflow-hidden bg-charcoal">
              <img
                src={cat.image}
                alt={`${cat.name} socks`}
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition-all duration-[1100ms] ease-[var(--ease-brand)] group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between">
                <div>
                  <h3 className="font-display text-2xl leading-none font-extrabold tracking-[-0.03em] uppercase md:text-3xl">
                    {cat.name}
                  </h3>
                  <p className="label-xs mt-2 text-concrete">{cat.count} styles</p>
                </div>
                <ArrowRight className="size-5 -translate-x-1 opacity-0 transition-all duration-500 ease-[var(--ease-brand)] group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.8} />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PerformanceStory() {
  const y = useScrollY();
  return (
    <section className="relative h-[70svh] min-h-[440px] overflow-hidden bg-ink text-bone md:h-[85svh]">
      <img
        src={media.storyMove}
        alt="Runner sprinting on a wet city track at dusk"
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ transform: `translate3d(0, ${Math.min(y * 0.03, 60)}px, 0) scale(1.06)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
      <div className="edge absolute inset-x-0 bottom-0 pb-14 md:pb-20">
        <Reveal>
          <p className="label-xs text-volt">06 — Performance</p>
          <h2 className="display-lg mt-5 max-w-[14ch]">
            Made to move<span className="text-volt">.</span>
          </h2>
          <div className="mt-8 grid max-w-3xl gap-6 border-t border-bone/20 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Comfort", "Seamless toe closure"],
              ["Breathability", "Ventilated arch mesh"],
              ["Fit", "Anatomic L/R knit"],
              ["Durability", "Reinforced heel yarn"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="label-xs text-bone">{k}</p>
                <p className="mt-2 text-sm text-concrete">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function MaterialStory() {
  return (
    <section className="edge grid items-center gap-12 bg-bone py-24 text-ink md:grid-cols-2 md:py-36">
      <Reveal>
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={media.macroFabric}
            alt="Macro detail of ribbed knit sock fabric and cushioning"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="label-xs absolute bottom-4 left-4 bg-bone px-2.5 py-1.5">
            200 needle knit
          </span>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <p className="label-xs text-muted-foreground">07 — Material</p>
        <h2 className="display-md mt-4 max-w-[16ch]">The detail you feel, not see</h2>
        <dl className="mt-10 divide-y divide-border border-y border-border">
          {[
            ["Combed cotton blend", "72% cotton · 24% polyamide · 4% elastane"],
            ["Cushion density", "Dual-layer terry loop at heel and forefoot"],
            ["Elasticity", "Compression band with 4-way stretch recovery"],
            ["Construction", "Flat-linked toe seam, zero abrasion"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <dt className="label-xs">{k}</dt>
              <dd className="text-sm text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <a href="/" className="group mt-8 inline-flex items-center gap-3">
          <Ruler className="size-4" strokeWidth={1.6} />
          <span className="label-xs">Size guide</span>
          <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1.5" strokeWidth={1.8} />
        </a>
      </Reveal>
    </section>
  );
}

export function ShopByActivity() {
  return (
    <section className="edge bg-bone pb-24 md:pb-36">
      <div className="border-t border-border pt-10">
        <p className="label-xs text-muted-foreground">09 — Shop by activity</p>
      </div>
      <ul className="mt-6">
        {activities.map((a) => (
          <li key={a} className="group border-b border-border">
            <a href="/" className="flex items-center justify-between py-6 md:py-8">
              <span className="display-md transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-3">
                {a}
              </span>
              <ArrowRight className="size-6 -translate-x-2 opacity-30 transition-all duration-500 ease-[var(--ease-brand)] group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.6} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function OfferBanner() {
  return (
    <section className="bg-volt py-16 text-volt-foreground md:py-20">
      <div className="edge flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="label-xs">13 — Offer</p>
          <h2 className="display-lg mt-4 max-w-[16ch]">Buy more. Save more.</h2>
          <p className="mt-4 max-w-md text-sm font-medium">
            Buy 2 get 10% off · Buy 3 get 18% off · Buy 5 get 25% off. Applied automatically at bag.
          </p>
        </div>
        <a
          href="/"
          className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-bone transition-colors duration-500 hover:bg-charcoal"
        >
          <span className="label-xs">Shop the offer</span>
          <ArrowRight className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1.5" strokeWidth={1.8} />
        </a>
      </div>
    </section>
  );
}

export function SocialProof() {
  const reviews = [
    { name: "Aditya R.", city: "Bengaluru", text: "Ran a half marathon in the Pace Ankle. Zero blisters, zero slipping." },
    { name: "Meera S.", city: "Mumbai", text: "The ribbed crew holds its shape after months. Worth every rupee." },
    { name: "Karan V.", city: "Delhi", text: "Cushioning under the forefoot is genuinely different from regular socks." },
  ];
  return (
    <section className="edge bg-bone pb-24 md:pb-32">
      <div className="border-t border-border pt-10">
        <p className="label-xs text-muted-foreground">11 — Worn by</p>
        <h2 className="display-md mt-4">4.8 average across 1,800+ reviews</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 90} className="border border-border bg-card p-7">
            <p className="label-xs text-volt-foreground/60">★★★★★</p>
            <p className="mt-4 text-[15px] leading-relaxed">{r.text}</p>
            <p className="label-xs mt-6 text-muted-foreground">
              {r.name} — {r.city}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
