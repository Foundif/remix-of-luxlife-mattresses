import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useScrollY } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { media } from "@/data/products";
import { useCart } from "@/components/site/cart-store";
import { useAuth } from "@/lib/auth";

type MenuGroup = { title: string; items: string[] };
type NavItem = {
  label: string;
  filter?: string;
  groups: MenuGroup[];
  feature?: { image: string; title: string; copy: string };
};

const nav: NavItem[] = [
  {
    label: "Shop",
    groups: [
      { title: "Featured", items: ["New Arrivals", "Best Sellers", "Sale"] },
      { title: "Shop By Style", items: ["Crew", "Ankle", "No-Show", "Knee High", "Multipacks"] },
      { title: "Shop By Activity", items: ["Running", "Gym", "Lifestyle", "Everyday", "Sports"] },
    ],
    feature: {
      image: media.collectionLifestyle,
      title: "Collection 2026",
      copy: "Engineered knit, built to last past the hundredth wash.",
    },
  },
  {
    label: "Collections",
    groups: [
      { title: "Signature", items: ["Unisex", "Running", "Training", "Everyday"] },
      { title: "Capsules", items: ["Studio", "Recovery", "Football", "Basketball"] },
    ],
    feature: {
      image: media.macroFabric,
      title: "Material Lab",
      copy: "Compression zones, mesh venting, reinforced heel.",
    },
  },
  {
    label: "Sports",
    filter: "Sports",
    groups: [
      { title: "Train", items: ["Running", "Gym", "Football", "Basketball"] },
      { title: "Recover", items: ["Recovery", "Studio", "Everyday"] },
    ],
    feature: {
      image: media.catSports,
      title: "Built for Sport",
      copy: "Tested with athletes across 4 disciplines.",
    },
  },
  { label: "New Arrivals", filter: "New", groups: [] },
  { label: "Best Sellers", filter: "Best Sellers", groups: [] },
];

export function Header({ solid = false }: { solid?: boolean }) {
  const y = useScrollY();
  const stuck = y > 40;
  const { count, setOpen: setCartOpen } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  const activeItem = nav.find((n) => n.label === active && n.groups.length > 0);

  return (
    <header
      onMouseLeave={() => setActive(null)}
      style={solid ? undefined : { transform: `translate3d(0, ${Math.max(0, 36 - y)}px, 0)` }}
      className={cn(
        "z-50 text-bone transition-colors duration-500 ease-[var(--ease-brand)]",
        solid
          ? "sticky top-0 border-b border-white/10 bg-ink"
          : "fixed inset-x-0 top-0",
        !solid && (stuck || activeItem) && "border-b border-white/10 bg-ink/80 backdrop-blur-xl",
        !solid && activeItem && "bg-ink/95",
      )}
    >
      <div
        className={cn(
          "edge flex items-center justify-between transition-all duration-500 ease-[var(--ease-brand)]",
          solid ? "h-16" : stuck ? "h-14" : "h-20",
        )}
      >
        <Link to="/" className="font-display text-xl leading-none font-extrabold tracking-[-0.04em] uppercase">
          Krux<span className="text-volt">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to="/shop"
              search={item.filter ? { c: item.filter } : {}}
              onMouseEnter={() => setActive(item.label)}
              onFocus={() => setActive(item.label)}
              className="label-xs group relative py-2 opacity-80 transition-opacity hover:opacity-100"
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-px h-px origin-left bg-volt transition-transform duration-500 ease-[var(--ease-brand)]",
                  active === item.label ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <Link
            to="/shop"
            className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 lg:flex"
            aria-label="Search products"
          >
            <Search className="size-4 opacity-70" strokeWidth={1.6} />
            <span className="text-xs tracking-wide text-bone/60">Search</span>
          </Link>
          <Link to="/shop" aria-label="Search" className="p-2 opacity-80 transition hover:opacity-100 lg:hidden">
            <Search className="size-[18px]" strokeWidth={1.6} />
          </Link>
          <Link
            to={user ? "/account" : "/auth"}
            aria-label={user ? "My account" : "Sign in"}
            className="hidden p-2 opacity-80 transition hover:opacity-100 md:block"
          >
            <User className="size-[18px]" strokeWidth={1.6} />
          </Link>
          <Link
            to="/account"
            aria-label="Wishlist"
            className="hidden p-2 opacity-80 transition hover:opacity-100 md:block"
          >
            <Heart className="size-[18px]" strokeWidth={1.6} />
          </Link>
          <button
            aria-label={`Bag (${count} items)`}
            onClick={() => setCartOpen(true)}
            className="relative p-2 opacity-80 transition hover:opacity-100"
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
            {count > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 grid min-w-4 place-items-center rounded-full bg-volt px-1 text-[10px] leading-4 font-bold text-volt-foreground">
                {count}
              </span>
            ) : (
              <span className="absolute top-1 right-0 size-1.5 rounded-full bg-volt" />
            )}
          </button>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 opacity-80 transition hover:opacity-100 lg:hidden"
          >
            {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      {activeItem && (
        <div className="anim-rise hidden border-t border-white/10 lg:block">
          <div className="edge grid grid-cols-12 gap-10 py-10">
            {activeItem.groups.map((group) => (
              <div key={group.title} className="col-span-3">
                <p className="label-xs mb-4 text-volt">{group.title}</p>
                <ul className="space-y-2.5">
                  {group.items.map((sub) => (
                    <li key={sub}>
                      <Link
                        to="/shop"
                        search={{ c: sub }}
                        onClick={() => setActive(null)}
                        className="text-sm text-bone/75 transition-colors hover:text-bone"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {activeItem.feature && (
              <div className="col-span-3 col-end-13">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={activeItem.feature.image}
                    alt={activeItem.feature.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-brand)] hover:scale-105"
                  />
                </div>
                <p className="label-xs mt-4">{activeItem.feature.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-concrete">{activeItem.feature.copy}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {open && (
        <div className="edge anim-rise max-h-[80svh] overflow-y-auto border-t border-white/10 bg-ink/95 pt-6 pb-10 backdrop-blur-xl lg:hidden">
          <ul className="divide-y divide-white/10">
            {nav.map((item) => (
              <li key={item.label} className="py-1">
                {item.groups.length === 0 ? (
                  <Link
                    to="/shop"
                    search={item.filter ? { c: item.filter } : {}}
                    onClick={() => setOpen(false)}
                    className="display-md block py-2"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileOpen((v) => (v === item.label ? null : item.label))}
                      aria-expanded={mobileOpen === item.label}
                      className="flex w-full items-center justify-between py-2"
                    >
                      <span className="display-md">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-5 transition-transform duration-300",
                          mobileOpen === item.label && "rotate-180",
                        )}
                        strokeWidth={1.6}
                      />
                    </button>
                    {mobileOpen === item.label && (
                      <div className="anim-rise space-y-5 pb-5">
                        {item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="label-xs mb-2 text-volt">{group.title}</p>
                            <ul className="space-y-2">
                              {group.items.map((sub) => (
                                <li key={sub}>
                                  <Link
                                    to="/shop"
                                    search={{ c: sub }}
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-bone/75"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link
              to={user ? "/account" : "/auth"}
              onClick={() => setOpen(false)}
              className="label-xs flex-1 border border-white/20 py-3 text-center"
            >
              {user ? "My Account" : "Sign In"}
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="label-xs flex-1 bg-volt py-3 text-center text-volt-foreground">
              View Bag
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
