import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { ProductCard } from "@/components/site/ProductCard";
import { activities, categories, products } from "@/data/products";
import { cn } from "@/lib/utils";

const title = "Shop All Socks — Performance & Everyday | KRUX";
const description =
  "Browse the full KRUX range: crew, ankle, no-show and knee-high socks engineered for running, gym, sport and everyday wear.";

type ShopSearch = { c?: string | undefined; sort?: string | undefined; q?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    c: typeof search['c'] === "string" ? search['c'] : undefined,
    sort: typeof search['sort'] === "string" ? search['sort'] : undefined,
    q: typeof search['q'] === "string" ? search['q'] : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "new", label: "Newest" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

function matches(term: string, p: (typeof products)[number]) {
  const t = term.toLowerCase();
  if (t === "new" || t === "new arrivals") return p.badge === "NEW";
  if (t === "best sellers") return p.badge === "BESTSELLER";
  if (t === "sale") return Boolean(p.mrp);
  if (t === "multipacks") return /pack/i.test(p.name);
  if (t === "crew" || t === "ankle" || t === "no-show" || t === "knee high") {
    return p.name.toLowerCase().includes(t.replace("no-show", "no-show"));
  }
  return (
    p.category.toLowerCase() === t ||
    p.activity.toLowerCase() === t ||
    p.category.toLowerCase().includes(t) ||
    p.activity.toLowerCase().includes(t)
  );
}

function ShopPage() {
  const { c, sort, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(q ?? "");

  useEffect(() => {
    setQuery(q ?? "");
  }, [q]);

  const filtered = useMemo(() => {
    let list = products;
    if (c) {
      const byFilter = list.filter((p) => matches(c, p));
      if (byFilter.length > 0) list = byFilter;
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.activity.toLowerCase().includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "new") sorted.sort((a, b) => Number(b.badge === "NEW") - Number(a.badge === "NEW"));
    return sorted;
  }, [c, sort, query]);

  const chips = ["New", "Best Sellers", "Sale", ...activities];

  return (
    <Shell>
      <div className="edge py-10 md:py-14">
        <p className="label-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>{" "}
          / Shop
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="display-md">{c ? c : "All Socks"}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} products</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              className="h-11 w-44 border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
            />
            <div className="flex h-11 items-center gap-2 border border-border px-3">
              <SlidersHorizontal className="size-4 opacity-60" strokeWidth={1.6} />
              <select
                aria-label="Sort products"
                value={sort ?? "featured"}
                onChange={(e) => navigate({ to: ".", search: (prev) => ({ ...prev, sort: e.target.value }) })}
                className="bg-transparent text-sm outline-none"
              >
                {sorts.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            to="/shop"
            search={{}}
            className={cn(
              "label-xs border border-border px-4 py-2 transition-colors",
              !c ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
            )}
          >
            All
          </Link>
          {chips.map((chip) => (
            <Link
              key={chip}
              to="/shop"
              search={{ c: chip }}
              className={cn(
                "label-xs border border-border px-4 py-2 transition-colors",
                c?.toLowerCase() === chip.toLowerCase()
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary",
              )}
            >
              {chip}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-sm text-muted-foreground">
            No products match that search. Try another term.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="display-md">Shop by category</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/shop"
                search={{ c: cat.name }}
                className="group relative block aspect-[3/4] overflow-hidden bg-secondary"
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} socks`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-bone">
                  <h3 className="font-display text-2xl leading-none font-extrabold tracking-[-0.03em] uppercase">
                    {cat.name}
                  </h3>
                  <p className="label-xs mt-2 text-concrete">{cat.count} styles</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
