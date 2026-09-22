import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import { StoreSearch } from "@/components/site/StoreSearch";
import { useCart } from "@/components/site/cart-store";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

// 1. Solid Home Icon with open doorway
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.5a1 1 0 0 0-.64.24l-8 6.5A1 1 0 0 0 4 11h1v9a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-9h1a1 1 0 0 0 .64-1.76l-8-6.5A1 1 0 0 0 12 2.5Z" />
    </svg>
  );
}

// 2. Solid Shop Icon with clean awning + open entrance doorway (fixed, no broken lines)
function ShopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      {/* Top awning */}
      <path d="M3.5 3A1.5 1.5 0 0 0 2 4.5v1A2.5 2.5 0 0 0 4.5 8h15A2.5 2.5 0 0 0 22 5.5v-1A1.5 1.5 0 0 0 20.5 3h-17Z" />
      {/* Storefront walls with open entrance doorway */}
      <path d="M4 10h16v9a1.5 1.5 0 0 1-1.5 1.5H15v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H5.5A1.5 1.5 0 0 1 4 19V10Z" />
    </svg>
  );
}

// 3. Solid Search Icon (filled magnifying glass)
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 3.5a7 7 0 1 0 4.38 12.46l4.83 4.83a1 1 0 0 0 1.41-1.42l-4.83-4.82A7 7 0 0 0 10.5 3.5Zm-5 7a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
      />
    </svg>
  );
}

// 4. Solid User Icon (filled avatar)
function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="12" cy="7" r="4.5" />
      <path d="M4 19.5c0-3.5 3.5-5.5 8-5.5s8 2 8 5.5v.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-.5Z" />
    </svg>
  );
}

// 5. Solid Shopping Bag Icon
function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 7V6a3.5 3.5 0 0 1 7 0v1h2.75a1 1 0 0 1 1 .91l1 12A2 2 0 0 1 18.26 22H5.74a2 2 0 0 1-1.99-2.09l1-12A1 1 0 0 1 5.75 7H8.5Zm2-1a1.5 1.5 0 0 1 3 0v1h-3V6Z"
      />
    </svg>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { count, setOpen } = useCart();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  // Auto-hide the standard 5-tab bar on single product pages
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
            <HomeIcon className="size-5 shrink-0 transition-all" />
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
            <ShopIcon className="size-5 shrink-0 transition-all" />
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
            <SearchIcon className="size-5 shrink-0 transition-all" />
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
            <UserIcon className="size-5 shrink-0 transition-all" />
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
              <BagIcon className="size-5 shrink-0 transition-all" />
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
