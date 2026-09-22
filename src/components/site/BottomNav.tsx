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
        className="fixed inset-x-3 z-[55] mx-auto max-w-md rounded-full border border-border/80 bg-background/95 p-1.5 shadow-[0_12px_40px_-6px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all md:hidden"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom, 1rem))" }}
      >
        <div className="flex items-center justify-between gap-1 px-1">
          {/* Home */}
          <Link
            to="/"
            aria-current={isHome ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 text-center transition-all duration-300",
              isHome
                ? "rounded-full bg-[#ADF831] text-ink px-3 py-1.5 shadow-sm"
                : "px-2 py-1.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <Home
              className={cn(
                "size-5 shrink-0 transition-all",
                isHome ? "fill-current stroke-[1.5]" : "fill-none stroke-[1.8]",
              )}
            />
            <span
              className={cn(
                "text-[10px] tracking-tight transition-colors",
                isHome ? "font-bold text-ink" : "font-medium text-muted-foreground",
              )}
            >
              Home
            </span>
          </Link>

          {/* Shop */}
          <Link
            to="/shop"
            search={{}}
            aria-current={isShop ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 text-center transition-all duration-300",
              isShop
                ? "rounded-full bg-[#ADF831] text-ink px-3 py-1.5 shadow-sm"
                : "px-2 py-1.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <Store
              className={cn(
                "size-5 shrink-0 transition-all",
                isShop ? "fill-current stroke-[1.5]" : "fill-none stroke-[1.8]",
              )}
            />
            <span
              className={cn(
                "text-[10px] tracking-tight transition-colors",
                isShop ? "font-bold text-ink" : "font-medium text-muted-foreground",
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
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 text-center transition-all duration-300",
              searchOpen
                ? "rounded-full bg-[#ADF831] text-ink px-3 py-1.5 shadow-sm"
                : "px-2 py-1.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <Search
              className={cn(
                "size-5 shrink-0 transition-all",
                searchOpen ? "fill-current stroke-[2.4]" : "fill-none stroke-[1.8]",
              )}
            />
            <span
              className={cn(
                "text-[10px] tracking-tight transition-colors",
                searchOpen ? "font-bold text-ink" : "font-medium text-muted-foreground",
              )}
            >
              Search
            </span>
          </button>

          {/* Account */}
          <Link
            to={user ? "/account" : "/auth"}
            aria-current={isAccount ? "page" : undefined}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 text-center transition-all duration-300",
              isAccount
                ? "rounded-full bg-[#ADF831] text-ink px-3 py-1.5 shadow-sm"
                : "px-2 py-1.5 text-muted-foreground hover:text-foreground",
            )}
          >
            <User
              className={cn(
                "size-5 shrink-0 transition-all",
                isAccount ? "fill-current stroke-[1.5]" : "fill-none stroke-[1.8]",
              )}
            />
            <span
              className={cn(
                "text-[10px] tracking-tight transition-colors",
                isAccount ? "font-bold text-ink" : "font-medium text-muted-foreground",
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
            className="flex flex-1 flex-col items-center justify-center gap-0.5 px-2 py-1.5 text-center text-muted-foreground transition-all duration-300 hover:text-foreground"
          >
            <span className="relative inline-flex items-center justify-center">
              <ShoppingBag className="size-5 shrink-0 fill-none stroke-[1.8]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-2 grid min-w-4 place-items-center rounded-full bg-[#ADF831] px-1 text-[9px] font-bold leading-4 text-ink shadow-sm">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </span>
            <span className="text-[10px] font-medium tracking-tight text-muted-foreground">Bag</span>
          </button>
        </div>
      </nav>

      <StoreSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
