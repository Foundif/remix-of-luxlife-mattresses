import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Store, User } from "lucide-react";
import { useState } from "react";

import { StoreSearch } from "@/components/site/StoreSearch";
import { useCart } from "@/components/site/cart-store";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "Shop", to: "/shop", icon: Store },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { count, setOpen } = useCart();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-[55] border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_color-mix(in_oklab,var(--ink)_12%,transparent)] backdrop-blur-xl md:hidden"
      >
        <div className="grid h-16 grid-cols-5 items-stretch">
          {navItems.map(({ label, to, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-w-0 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-muted-foreground transition-colors",
                  active && "text-foreground",
                )}
              >
                <Icon className="size-5 shrink-0" strokeWidth={active ? 2.2 : 1.6} />
                <span className="truncate">{label}</span>
                {active && <span className="absolute inset-x-5 top-0 h-0.5 bg-volt" />}
              </Link>
            );
          })}

          <Button
            type="button"
            variant="ghost"
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            className="h-auto min-w-0 rounded-none px-0 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <span className="flex flex-col items-center justify-center gap-1 text-[10px] font-semibold">
              <Search className="size-5 shrink-0" strokeWidth={1.6} />
              Search
            </span>
          </Button>

          <Link
            to={user ? "/account" : "/auth"}
            aria-current={pathname === "/account" || pathname === "/auth" ? "page" : undefined}
            className={cn(
              "relative flex min-w-0 flex-col items-center justify-center gap-1 text-[10px] font-semibold text-muted-foreground transition-colors",
              (pathname === "/account" || pathname === "/auth") && "text-foreground",
            )}
          >
            <User className="size-5 shrink-0" strokeWidth={pathname === "/account" || pathname === "/auth" ? 2.2 : 1.6} />
            <span className="truncate">Account</span>
          </Link>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(true)}
            aria-label={`Open bag with ${count} items`}
            className="h-auto min-w-0 rounded-none px-0 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <span className="relative flex flex-col items-center justify-center gap-1 text-[10px] font-semibold">
              <span className="relative">
                <ShoppingBag className="size-5 shrink-0" strokeWidth={1.6} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 grid min-w-4 place-items-center rounded-full bg-volt px-1 text-[9px] leading-4 font-bold text-volt-foreground">
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </span>
              Bag
            </span>
          </Button>
        </div>
      </nav>
      <StoreSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}