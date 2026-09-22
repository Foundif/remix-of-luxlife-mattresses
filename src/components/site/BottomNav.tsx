import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

import { StoreSearch } from "@/components/site/StoreSearch";
import { useCart } from "@/components/site/cart-store";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

// Custom Home icon with open-door cutout
function HomeIcon({ filled, className }: { filled: boolean; className?: string }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {/* Roof + walls with cut-out open door */}
        <path d="M12 2.5a1 1 0 0 0-.64.24l-8 6.5A1 1 0 0 0 4 11h1v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-9h1a1 1 0 0 0 .64-1.76l-8-6.5A1 1 0 0 0 12 2.5Z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// Custom Shop icon with open entrance arch
function ShopIcon({ filled, className }: { filled: boolean; className?: string }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {/* Awning */}
        <path d="M2 4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1l-1 5a2.8 2.8 0 0 1-5 0 2.8 2.8 0 0 1-5 0 2.8 2.8 0 0 1-5 0L2 4Z" />
        {/* Storefront with open door */}
        <path d="M4 11.5h16V19a1.5 1.5 0 0 1-1.5 1.5H15v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H5.5A1.5 1.5 0 0 1 4 19v-7.5Z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7a3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1-3 3 3 3 0 0 1-3-3" />
    </svg>
  );
}

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
            <HomeIcon filled={isHome} className="size-5 shrink-0 transition-all" />
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
            <ShopIcon filled={isShop} className="size-5 shrink-0 transition-all" />
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
                <span className="absolute -top-1 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ADF831] px-1 text-[9px] font-black leading-none text-ink shadow-sm">
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
