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

  const isHome = pathname === "/";
  const isShop = pathname.startsWith("/shop");
  const isAccount = pathname === "/account" || pathname === "/auth";

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-3 z-[55] mx-auto max-w-md rounded-3xl border border-border/70 bg-background/90 p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all md:hidden"
        style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))" }}
      >
        <div className="grid grid-cols-5 items-center justify-items-center">
          {/* Home */}
          <Link
            to="/"
            aria-current={isHome ? "page" : undefined}
            className="group flex w-full flex-col items-center justify-center gap-0.5 py-1 text-center transition-all"
          >
            <span
              className={cn(
                "flex h-7 w-12 items-center justify-center rounded-full transition-all duration-300",
                isHome ? "bg-volt text-ink shadow-sm" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              <Home className="size-4 shrink-0" strokeWidth={isHome ? 2.4 : 1.8} />
            </span>
            <span
              className={cn(
                "text-[10px] tracking-tight transition-colors",
                isHome ? "font-bold text-foreground" : "font-medium text-muted-foreground",
              )}
            >
              Home
            </span>
          </Link>

          {/* Shop */}
          <Link
            to="/shop"
            aria-current={isShop ? "page" : undefined}
            className="group flex w-full flex-col items-center justify-center gap-0.5 py-1 text-center transition-all"
          >
            <span
              className={cn(
                "flex h-7 w-12 items-center justify-center rounded-full transition-all duration-300",
                isShop ? "bg-volt text-ink shadow-sm" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              <Store className="size-4 shrink-0" strokeWidth={isShop ? 2.4 : 1.8} />
            </span>
            <span
              className={cn(
                "text-[10px] tracking-tight transition-colors",
                isShop ? "font-bold text-foreground" : "font-medium text-muted-foreground",
              )}
            >
              Shop
            </span>
          </Link>

          {/* Search */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search mattresses"
            className="group flex w-full flex-col items-center justify-center gap-0.5 py-1 text-center transition-all"
          >
            <span
              className={cn(
                "flex h-7 w-12 items-center justify-center rounded-full transition-all duration-300",
                searchOpen ? "bg-volt text-ink shadow-sm" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              <Search className="size-4 shrink-0" strokeWidth={1.8} />
            </span>
            <span className="text-[10px] font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
              Search
            </span>
          </button>

          {/* Account */}
          <Link
            to={user ? "/account" : "/auth"}
            aria-current={isAccount ? "page" : undefined}
            className="group flex w-full flex-col items-center justify-center gap-0.5 py-1 text-center transition-all"
          >
            <span
              className={cn(
                "flex h-7 w-12 items-center justify-center rounded-full transition-all duration-300",
                isAccount ? "bg-volt text-ink shadow-sm" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              <User className="size-4 shrink-0" strokeWidth={isAccount ? 2.4 : 1.8} />
            </span>
            <span
              className={cn(
                "text-[10px] tracking-tight transition-colors",
                isAccount ? "font-bold text-foreground" : "font-medium text-muted-foreground",
              )}
            >
              Account
            </span>
          </Link>

          {/* Bag */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open bag with ${count} items`}
            className="group flex w-full flex-col items-center justify-center gap-0.5 py-1 text-center transition-all"
          >
            <span className="relative flex h-7 w-12 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 group-hover:text-foreground">
              <ShoppingBag className="size-4 shrink-0" strokeWidth={1.8} />
              {count > 0 && (
                <span className="absolute -top-1 -right-0.5 grid min-w-4 place-items-center rounded-full bg-volt px-1 text-[9px] font-bold leading-4 text-ink shadow-sm">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </span>
            <span className="text-[10px] font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground">
              Bag
            </span>
          </button>
        </div>
      </nav>

      <StoreSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
