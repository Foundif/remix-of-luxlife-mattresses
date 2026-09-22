import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, RotateCcw, Search, SlidersHorizontal, Star, X } from "lucide-react";

import { Shell } from "@/components/site/Shell";
import { ProductCard } from "@/components/site/ProductCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories, products } from "@/data/products";
import { cn } from "@/lib/utils";

const pageTitle = "Shop All Mattresses — Luxlife Mattresses";
const pageDescription =
  "Explore Luxlife memory foam, orthopedic, pocket spring, latex, and hybrid mattresses engineered in Salem.";

type ShopSearch = {
  c?: string | undefined;
  sort?: string | undefined;
  q?: string | undefined;
  feel?: string | undefined;
  rating?: string | undefined;
  price?: string | undefined;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    c: typeof search["c"] === "string" ? search["c"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    feel: typeof search["feel"] === "string" ? search["feel"] : undefined,
    rating: typeof search["rating"] === "string" ? search["rating"] : undefined,
    price: typeof search["price"] === "string" ? search["price"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

const sorts = [
  { key: "featured", label: "Featured" },
  { key: "new", label: "Newest First" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Highest Rated" },
];

const categoryList = [
  "All Mattresses",
  "Memory Foam",
  "Orthopedic",
  "Pocket Spring",
  "Latex",
  "Hybrid",
  "Luxury",
  "Kids",
];

const feelOptions = ["All Feels", "Plush", "Medium Soft", "Medium", "Medium Firm", "Firm", "Extra Firm"];

const ratingOptions = [
  { label: "All Ratings", min: 0 },
  { label: "4.8★ & above", min: 4.8 },
  { label: "4.5★ & above", min: 4.5 },
];

const priceOptions = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹15,000", min: 0, max: 15000 },
  { label: "₹15,000 – ₹25,000", min: 15000, max: 25000 },
  { label: "Above ₹25,000", min: 25000, max: Infinity },
];

function ShopPage() {
  const { c, sort, q, feel, rating, price } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [query, setQuery] = useState(q ?? "");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setQuery(q ?? "");
  }, [q]);

  const activeCategory = c && c.toLowerCase() !== "all mattresses" ? c : "All Mattresses";
  const activeFeel = feel ?? "All Feels";
  const activeRating = rating ? Number(rating) : 0;
  const activePriceLabel = price ?? "All Prices";

  // Update URL search parameters
  const updateSearch = (updater: (prev: ShopSearch) => ShopSearch) => {
    navigate({ to: "/shop", search: (prev) => updater(prev) });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch((prev) => ({ ...prev, q: query.trim() ? query.trim() : undefined }));
  };

  const clearAllFilters = () => {
    setQuery("");
    navigate({ to: "/shop", search: (prev) => ({ sort: prev.sort }) });
    setMobileFilterOpen(false);
  };

  // Count active filters (excluding sort)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== "All Mattresses") count++;
    if (activeFeel !== "All Feels") count++;
    if (activeRating > 0) count++;
    if (activePriceLabel !== "All Prices") count++;
    if (q) count++;
    return count;
  }, [activeCategory, activeFeel, activeRating, activePriceLabel, q]);

  // Filtered and sorted products
  const filtered = useMemo(() => {
    let list = [...products];

    // Category
    if (activeCategory !== "All Mattresses") {
      const catLower = activeCategory.toLowerCase();
      list = list.filter(
        (p) =>
          p.category.toLowerCase().includes(catLower) ||
          p.activity.toLowerCase().includes(catLower) ||
          (catLower === "latex" && p.category.toLowerCase().includes("latex")),
      );
    }

    // Search Query
    if (q?.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.activity.toLowerCase().includes(term),
      );
    }

    // Firmness / Feel
    if (activeFeel !== "All Feels") {
      list = list.filter((p) => p.activity.toLowerCase() === activeFeel.toLowerCase());
    }

    // Rating
    if (activeRating > 0) {
      list = list.filter((p) => p.rating >= activeRating);
    }

    // Price
    if (activePriceLabel !== "All Prices") {
      const option = priceOptions.find((o) => o.label === activePriceLabel);
      if (option) {
        list = list.filter((p) => p.price >= option.min && p.price < option.max);
      }
    }

    // Sorting
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "new") sorted.sort((a, b) => Number(b.badge === "NEW") - Number(a.badge === "NEW"));

    return sorted;
  }, [activeCategory, q, activeFeel, activeRating, activePriceLabel, sort]);

  // Sidebar filter component (shared between desktop & mobile)
  const FilterControls = () => (
    <div className="space-y-7 text-sm">
      {/* Search Input */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Search</h4>
        <form onSubmit={handleSearchSubmit} className="relative mt-2.5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search comfort, model..."
            className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-8 text-xs outline-none transition-colors focus:border-foreground"
          />
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                updateSearch((prev) => ({ ...prev, q: undefined }));
              }}
              className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </form>
      </div>

      {/* Category Filter */}
      <div className="border-t border-border/70 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</h4>
        <div className="mt-3 space-y-1">
          {categoryList.map((cat) => {
            const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
            const count =
              cat === "All Mattresses"
                ? products.length
                : products.filter(
                    (p) =>
                      p.category.toLowerCase().includes(cat.toLowerCase()) ||
                      p.activity.toLowerCase().includes(cat.toLowerCase()),
                  ).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  updateSearch((prev) => ({
                    ...prev,
                    c: cat === "All Mattresses" ? undefined : cat,
                  }));
                  setMobileFilterOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                  isSelected
                    ? "bg-[#ADF831] font-bold text-ink shadow-xs"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <span>{cat}</span>
                <span className={cn("text-[10px]", isSelected ? "text-ink/80 font-bold" : "text-muted-foreground/70")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Firmness / Feel Filter */}
      <div className="border-t border-border/70 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Comfort & Firmness</h4>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {feelOptions.map((feelOpt) => {
            const isSelected = activeFeel.toLowerCase() === feelOpt.toLowerCase();
            return (
              <button
                key={feelOpt}
                type="button"
                onClick={() => {
                  updateSearch((prev) => ({
                    ...prev,
                    feel: feelOpt === "All Feels" ? undefined : feelOpt,
                  }));
                  setMobileFilterOpen(false);
                }}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] transition-all",
                  isSelected
                    ? "border-[#ADF831] bg-[#ADF831] font-bold text-ink shadow-xs"
                    : "border-border/80 bg-background text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {feelOpt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="border-t border-border/70 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Rating</h4>
        <div className="mt-3 space-y-1.5">
          {ratingOptions.map((r) => {
            const isSelected = activeRating === r.min;
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => {
                  updateSearch((prev) => ({
                    ...prev,
                    rating: r.min === 0 ? undefined : String(r.min),
                  }));
                  setMobileFilterOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors",
                  isSelected
                    ? "bg-[#ADF831] font-bold text-ink shadow-xs"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Star
                    className={cn("size-3.5", isSelected ? "fill-ink text-ink" : "fill-[#ADF831] text-[#ADF831]")}
                  />
                  <span>{r.label}</span>
                </div>
                {isSelected && <Check className="size-3.5 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="border-t border-border/70 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price</h4>
        <div className="mt-3 space-y-1">
          {priceOptions.map((p) => {
            const isSelected = activePriceLabel === p.label;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  updateSearch((prev) => ({
                    ...prev,
                    price: p.label === "All Prices" ? undefined : p.label,
                  }));
                  setMobileFilterOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors",
                  isSelected
                    ? "bg-[#ADF831] font-bold text-ink shadow-xs"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <span>{p.label}</span>
                {isSelected && <Check className="size-3.5 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Filter Button */}
      {activeFilterCount > 0 && (
        <div className="border-t border-border/70 pt-4">
          <button
            type="button"
            onClick={clearAllFilters}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/80 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-border"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset All Filters ({activeFilterCount})</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <Shell>
      <div className="edge py-8 md:py-12">
        {/* Full-Width Top Header */}
        <div>
          <nav aria-label="Breadcrumb" className="label-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>{" "}
            / <span className="text-foreground">Shop</span>
          </nav>

          <div className="mt-3">
            <h1 className="display-md text-foreground">{activeCategory}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Direct factory pricing with 10-year warranty, engineered in Salem.
            </p>
          </div>
        </div>

        {/* Top Control Bar: Total count + Mobile Filter Button + Desktop Sort */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-y border-border/80 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Sheet Trigger Button */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-bold text-foreground shadow-xs transition-colors hover:bg-secondary lg:hidden"
                >
                  <SlidersHorizontal className="size-3.5" strokeWidth={2} />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="grid size-4.5 place-items-center rounded-full bg-[#ADF831] text-[10px] font-black text-ink">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm overflow-y-auto p-6">
                <SheetHeader className="mb-6 border-b border-border pb-4 text-left">
                  <SheetTitle className="text-base font-bold">Filter Mattresses</SheetTitle>
                </SheetHeader>
                <FilterControls />
              </SheetContent>
            </Sheet>

            <span className="text-xs font-medium text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filtered.length}</span> mattresses
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort" className="text-xs text-muted-foreground hidden sm:inline">
              Sort by:
            </label>
            <div className="flex h-9 items-center rounded-lg border border-border bg-background px-2.5">
              <select
                id="shop-sort"
                aria-label="Sort products"
                value={sort ?? "featured"}
                onChange={(e) => updateSearch((prev) => ({ ...prev, sort: e.target.value }))}
                className="bg-transparent text-xs font-semibold text-foreground outline-none cursor-pointer"
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

        {/* Main Content Area: Left Sticky Sidebar + Right Product Grid */}
        <div className="mt-8 flex gap-8 xl:gap-12">
          {/* Desktop Left-Side Filter Sidebar */}
          <aside className="hidden w-60 xl:w-68 shrink-0 lg:block">
            <div className="sticky top-28 rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
              <div className="mb-5 flex items-center justify-between border-b border-border/80 pb-3">
                <h3 className="text-sm font-bold tracking-tight text-foreground">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <FilterControls />
            </div>
          </aside>

          {/* Right Column: Active Chips + Product Cards Grid */}
          <main className="flex-1 min-w-0">
            {/* Active Filter Chips Bar */}
            {activeFilterCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                  Active:
                </span>

                {activeCategory !== "All Mattresses" && (
                  <button
                    type="button"
                    onClick={() => updateSearch((prev) => ({ ...prev, c: undefined }))}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    <span>{activeCategory}</span>
                    <X className="size-3" />
                  </button>
                )}

                {activeFeel !== "All Feels" && (
                  <button
                    type="button"
                    onClick={() => updateSearch((prev) => ({ ...prev, feel: undefined }))}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    <span>Feel: {activeFeel}</span>
                    <X className="size-3" />
                  </button>
                )}

                {activeRating > 0 && (
                  <button
                    type="button"
                    onClick={() => updateSearch((prev) => ({ ...prev, rating: undefined }))}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    <span>{activeRating}★ & above</span>
                    <X className="size-3" />
                  </button>
                )}

                {activePriceLabel !== "All Prices" && (
                  <button
                    type="button"
                    onClick={() => updateSearch((prev) => ({ ...prev, price: undefined }))}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    <span>{activePriceLabel}</span>
                    <X className="size-3" />
                  </button>
                )}

                {q && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      updateSearch((prev) => ({ ...prev, q: undefined }));
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-foreground"
                  >
                    <span>"{q}"</span>
                    <X className="size-3" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="ml-1 text-xs font-semibold text-muted-foreground hover:text-foreground underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Cards Grid */}
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border py-20 text-center">
                <p className="text-base font-semibold text-foreground">No mattresses match your selected filters</p>
                <p className="mt-1 text-xs text-muted-foreground">Try removing some filters to see more results.</p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold text-bone hover:bg-[#ADF831] hover:text-ink"
                >
                  <RotateCcw className="size-3.5" />
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Shop By Category Showcase at the Bottom */}
        <div className="mt-20 border-t border-border pt-10">
          <h2 className="display-md">Explore Collections</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to="/shop"
                search={{ c: cat.name }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-secondary"
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} collection`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 text-bone">
                  <h3 className="font-display text-xl sm:text-2xl leading-none font-extrabold tracking-[-0.03em] uppercase">
                    {cat.name}
                  </h3>
                  <p className="label-xs mt-2 text-concrete">{cat.count} models</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
