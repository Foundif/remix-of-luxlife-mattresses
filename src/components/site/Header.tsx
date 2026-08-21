import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useScrollY } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const nav = ["Shop", "Collections", "Sports", "New Arrivals", "Best Sellers"];

export function Header() {
  const y = useScrollY();
  const stuck = y > 40;
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-bone transition-all duration-500 ease-[var(--ease-brand)]",
        stuck && "border-b border-white/10 bg-ink/70 text-bone backdrop-blur-xl",
      )}
    >
      <div
        className={cn(
          "edge flex items-center justify-between transition-all duration-500 ease-[var(--ease-brand)]",
          stuck ? "h-14" : "h-20",
        )}
      >
        <Link to="/" className="font-display text-xl leading-none font-extrabold tracking-[-0.04em] uppercase">
          Krux<span className="text-volt">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item}
              to="/"
              className="label-xs relative py-2 opacity-80 transition-opacity hover:opacity-100"
            >
              {item}
              <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-volt transition-transform duration-500 ease-[var(--ease-brand)] hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <button aria-label="Search" className="p-2 opacity-80 transition hover:opacity-100">
            <Search className="size-[18px]" strokeWidth={1.6} />
          </button>
          <button aria-label="Account" className="hidden p-2 opacity-80 transition hover:opacity-100 md:block">
            <User className="size-[18px]" strokeWidth={1.6} />
          </button>
          <button aria-label="Wishlist" className="hidden p-2 opacity-80 transition hover:opacity-100 md:block">
            <Heart className="size-[18px]" strokeWidth={1.6} />
          </button>
          <button aria-label="Bag" className="relative p-2 opacity-80 transition hover:opacity-100">
            <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
            <span className="absolute top-1 right-0 size-1.5 rounded-full bg-volt" />
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

      {open && (
        <div className="edge anim-rise border-t border-white/10 bg-ink/95 pt-6 pb-10 backdrop-blur-xl lg:hidden">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item}>
                <Link to="/" onClick={() => setOpen(false)} className="display-md block py-2">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <p className="label-xs mt-8 text-concrete">New Collection — 2026</p>
        </div>
      )}
    </header>
  );
}
