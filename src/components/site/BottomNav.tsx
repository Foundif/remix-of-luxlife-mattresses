import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Store, User } from "lucide-react";
import { useState } from "react";

import { StoreSearch } from "@/components/site/StoreSearch";
import { useCart } from "@/components/site/cart-store";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { count, setOpen } = useCart();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  // Hide the standard 5-tab bar on single product pages
  if (pathname.startsWith("/product/")) {
    return null;
  }

  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/shop");
  const isAccount = pathname === "/account" || pathname === "/auth";

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-4 z-[55] mx-auto max-w-sm rounded-full border border-border/70 bg-background/95 p-1.5 shadow-[0_16px_40px_-6px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition-all md:hidden"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}
      >
        <div className="flex items-center justify-around gap-1">
          {/* Home */}
          <Link
            to="/"
            aria-current={isHome ? "page" : undefined}
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              isHome
                ? "gap-1.5 rounded-full bg-volt px-4 py-2 text-xs font-bold text-ink shadow-sm"
                : "p-2.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <Home className="size-4 shrink-0" strokeWidth={isHome ? 2.5 : 1.8} />
            {isHome && <span className="tracking-tight">Home</span>}
          </Link>

          {/* Shop */}
          <Link
            to="/shop"
            search={{}}
            aria-current={isShop ? "page" : undefined}
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              isShop
                ? "gap-1.5 rounded-full bg-volt px-4 py-2 text-xs font-bold text-ink shadow-sm"
                : "p-2.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <Store className="size-4 shrink-0" strokeWidth={isShop ? 2.5 : 1.8} />
            {isShop && <span className="tracking-tight">Shop</span>}
          </Link>

          {/* Search */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search mattresses"
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              searchOpen
                ? "gap-1.5 rounded-full bg-volt px-4 py-2 text-xs font-bold text-ink shadow-sm"
                : "p-2.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <Search className="size-4 shrink-0" strokeWidth={searchOpen ? 2.5 : 1.8} />
            {searchOpen && <span className="tracking-tight">Search</span>}
          </button>

          {/* Account */}
          <Link
            to={user ? "/account" : "/auth"}
            aria-current={isAccount ? "page" : undefined}
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              isAccount
                ? "gap-1.5 rounded-full bg-volt px-4 py-2 text-xs font-bold text-ink shadow-sm"
                : "p-2.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <User className="size-4 shrink-0" strokeWidth={isAccount ? 2.5 : 1.8} />
            {isAccount && <span className="tracking-tight">Account</span>}
          </Link>

          {/* Bag */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open bag with ${count} items`}
            className="relative flex items-center justify-center p-2.5 text-muted-foreground transition-all duration-300 hover:text-foreground"
          >
            <ShoppingBag className="size-4 shrink-0" strokeWidth={1.8} />
            {count > 0 && (
              <span className="absolute top-1 right-1 grid min-w-4 place-items-center rounded-full bg-volt px-1 text-[9px] font-bold leading-4 text-ink shadow-sm">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <StoreSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
