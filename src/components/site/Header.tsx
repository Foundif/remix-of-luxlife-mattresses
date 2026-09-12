import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollY } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/site/cart-store";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { StoreSearch } from "@/components/site/StoreSearch";

type MenuGroup = { title: string; items: string[] };
type NavItem = { label: string; filter?: string; groups: MenuGroup[] };

const nav: NavItem[] = [
  {
    label: "Shop",
    groups: [
      { title: "Featured", items: ["New Arrivals", "Best Sellers", "Sale"] },
      { title: "Shop By Style", items: ["Crew", "Ankle", "No-Show", "Knee High", "Multipacks"] },
      { title: "Shop By Activity", items: ["Running", "Gym", "Lifestyle", "Everyday", "Sports"] },
    ],
  },
  {
    label: "Collections",
    groups: [
      { title: "Signature", items: ["Unisex", "Running", "Training", "Everyday"] },
      { title: "Capsules", items: ["Studio", "Recovery", "Football", "Basketball"] },
    ],
  },
  {
    label: "Sports",
    filter: "Sports",
    groups: [
      { title: "Train", items: ["Running", "Gym", "Football", "Basketball"] },
      { title: "Recover", items: ["Recovery", "Studio", "Everyday"] },
    ],
  },
  { label: "New Arrivals", filter: "New", groups: [] },
  { label: "Best Sellers", filter: "Best Sellers", groups: [] },
];

export function Header({ solid = false }: { solid?: boolean }) {
  const y = useScrollY();
  const stuck = y > 40;
  const { count, setOpen: setCartOpen } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("Shop");

  useEffect(() => {
    const modalOpen = menuOpen || searchOpen;
    document.body.style.overflow = modalOpen ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen, searchOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        style={solid ? undefined : { transform: `translate3d(0, ${Math.max(0, 36 - y)}px, 0)` }}
        className={cn(
          "z-50 text-bone transition-colors duration-500 ease-[var(--ease-brand)]",
          solid ? "sticky top-0 border-b border-white/10 bg-ink" : "fixed inset-x-0 top-0",
          !solid && stuck && "border-b border-white/10 bg-ink/85 backdrop-blur-xl",
        )}
      >
        <div className={cn("edge flex items-center justify-between transition-all duration-500", solid ? "h-16" : stuck ? "h-14" : "h-20")}>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="text-bone hover:bg-white/10 hover:text-bone"
          >
            <Menu className="size-5" strokeWidth={1.6} />
          </Button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-display text-xl leading-none font-extrabold uppercase">
            Krux<span className="text-volt">.</span>
          </Link>

          <div className="flex items-center gap-1 md:gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="text-bone hover:bg-white/10 hover:text-bone"
            >
              <Search className="size-[18px]" strokeWidth={1.6} />
            </Button>
            <Link to={user ? "/account" : "/auth"} aria-label={user ? "My account" : "Sign in"} className="hidden p-2 opacity-80 transition hover:opacity-100 sm:block">
              <User className="size-[18px]" strokeWidth={1.6} />
            </Link>
            <Link to="/account" aria-label="Wishlist" className="hidden p-2 opacity-80 transition hover:opacity-100 md:block">
              <Heart className="size-[18px]" strokeWidth={1.6} />
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Bag (${count} items)`}
              onClick={() => setCartOpen(true)}
              className="relative text-bone hover:bg-white/10 hover:text-bone"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
              <span className="absolute -top-0.5 -right-0.5 grid min-w-4 place-items-center rounded-full bg-volt px-1 text-[10px] leading-4 font-bold text-volt-foreground">
                {count}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <div className={cn("fixed inset-0 z-[70]", menuOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!menuOpen}>
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className={cn("absolute inset-0 bg-ink/65 backdrop-blur-sm transition-opacity duration-500", menuOpen ? "opacity-100" : "opacity-0")}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={cn(
            "absolute inset-y-0 left-0 flex w-[min(92vw,440px)] flex-col bg-ink text-bone shadow-2xl transition-transform duration-500 ease-[var(--ease-brand)]",
            menuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-5 md:px-8">
            <span className="font-display text-xl font-extrabold uppercase">Krux<span className="text-volt">.</span></span>
            <Button type="button" variant="ghost" size="icon" onClick={closeMenu} aria-label="Close menu" className="text-bone hover:bg-white/10 hover:text-bone">
              <X className="size-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
            {nav.map((item, index) => (
              <div key={item.label} className="border-b border-white/10" style={{ transitionDelay: `${index * 45}ms` }}>
                {item.groups.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded((value) => value === item.label ? null : item.label)}
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between py-4 text-left"
                    >
                      <span className="font-display text-2xl font-bold uppercase md:text-3xl">{item.label}</span>
                      <ChevronDown className={cn("size-5 transition-transform duration-300", expanded === item.label && "rotate-180")} />
                    </button>
                    <div className={cn("grid transition-all duration-500 ease-[var(--ease-brand)]", expanded === item.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <div className="overflow-hidden">
                        <div className="grid gap-6 pb-6 sm:grid-cols-2">
                          {item.groups.map((group) => (
                            <div key={group.title}>
                              <p className="label-xs mb-3 text-volt">{group.title}</p>
                              <ul className="space-y-2.5">
                                {group.items.map((sub) => (
                                  <li key={sub}>
                                    <Link to="/shop" search={{ c: sub }} onClick={closeMenu} className="text-sm text-bone/70 transition-colors hover:text-bone">{sub}</Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to="/shop" search={item.filter ? { c: item.filter } : {}} onClick={closeMenu} className="block py-4 font-display text-2xl font-bold uppercase md:text-3xl">{item.label}</Link>
                )}
              </div>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-5 md:p-8">
            <Link to={user ? "/account" : "/auth"} onClick={closeMenu} className="label-xs border border-white/20 py-3 text-center">{user ? "My Account" : "Sign In"}</Link>
            <Link to="/cart" onClick={closeMenu} className="label-xs bg-volt py-3 text-center text-volt-foreground">View Bag ({count})</Link>
          </div>
        </aside>
      </div>

      <StoreSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}