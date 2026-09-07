import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Package, User as UserIcon } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { rupee } from "@/components/site/cart-store";
import { toast } from "sonner";

const title = "My Account — KRUX";
const description = "Manage your KRUX profile and track every order you've placed.";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

type OrderRow = {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  ship_name: string;
  ship_city: string;
  ship_state: string;
  payment_method: string;
  order_items: {
    id: string;
    name: string;
    size: string;
    qty: number;
    unit_price: number;
    image: string;
  }[];
};

function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState<OrderRow[] | null>(null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    void (async () => {
      const [{ data: profile }, { data: orderRows }] = await Promise.all([
        supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle(),
        supabase
          .from("orders")
          .select(
            "id, order_number, status, total, created_at, ship_name, ship_city, ship_state, payment_method, order_items(id, name, size, qty, unit_price, image)",
          )
          .order("created_at", { ascending: false }),
      ]);
      if (!alive) return;
      setFullName(profile?.full_name ?? (user.user_metadata?.["full_name"] as string) ?? "");
      setPhone(profile?.phone ?? "");
      setOrders((orderRows as OrderRow[] | null) ?? []);
    })();
    return () => {
      alive = false;
    };
  }, [user]);

  if (loading) {
    return (
      <Shell>
        <div className="edge py-24">
          <p className="label-xs text-muted-foreground">Loading your account…</p>
        </div>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <div className="edge flex flex-col items-start gap-6 py-24 md:py-32">
          <p className="label-xs text-muted-foreground">Members</p>
          <h1 className="display-md max-w-[18ch]">Sign in to see your orders</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            Track deliveries, save your address for faster checkout and keep your order history in one place.
          </p>
          <Link to="/auth" className="label-xs bg-primary px-8 py-4 text-primary-foreground">
            Sign in or join
          </Link>
        </div>
      </Shell>
    );
  }

  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: fullName || null, phone: phone || null });
    setSaving(false);
    if (error) toast.error("Could not save your details. Please try again.");
    else toast.success("Details saved");
  };

  return (
    <Shell>
      <section className="edge py-14 md:py-20">
        <p className="label-xs text-muted-foreground">My account</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="display-md">{fullName || "Welcome back"}</h1>
          <button
            onClick={() => void signOut()}
            className="label-xs inline-flex items-center gap-2 border border-border px-6 py-3 transition-colors hover:bg-secondary"
          >
            <LogOut className="size-4" strokeWidth={1.7} /> Sign out
          </button>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <UserIcon className="size-4" strokeWidth={1.7} />
              <p className="label-xs">Profile</p>
            </div>
            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="label-xs text-muted-foreground">Full name</span>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
              <label className="block">
                <span className="label-xs text-muted-foreground">Phone</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                />
              </label>
              <label className="block">
                <span className="label-xs text-muted-foreground">Email</span>
                <input
                  value={user.email ?? ""}
                  readOnly
                  className="mt-2 w-full border border-border bg-secondary px-4 py-3 text-sm text-muted-foreground"
                />
              </label>
              <button
                onClick={() => void saveProfile()}
                disabled={saving}
                className="label-xs w-full bg-primary py-4 text-primary-foreground disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save details"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 border-b border-border pb-4">
              <Package className="size-4" strokeWidth={1.7} />
              <p className="label-xs">Order history</p>
            </div>

            {orders === null ? (
              <p className="mt-6 text-sm text-muted-foreground">Loading orders…</p>
            ) : orders.length === 0 ? (
              <div className="mt-8">
                <p className="text-sm text-muted-foreground">You haven't placed an order yet.</p>
                <Link to="/shop" className="label-xs mt-6 inline-block bg-primary px-8 py-4 text-primary-foreground">
                  Start shopping
                </Link>
              </div>
            ) : (
              <ul className="mt-6 space-y-5">
                {orders.map((order) => (
                  <li key={order.id} className="border border-border">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/60 px-5 py-4">
                      <div>
                        <p className="text-sm font-semibold tracking-tight">{order.order_number}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          · {order.payment_method.toUpperCase()} · {order.ship_city}, {order.ship_state}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="label-xs text-volt-foreground/80">{order.status}</p>
                        <p className="mt-1 text-sm font-semibold">{rupee(order.total)}</p>
                      </div>
                    </div>
                    <ul className="divide-y divide-border px-5">
                      {order.order_items.map((item) => (
                        <li key={item.id} className="flex items-center gap-4 py-4">
                          <div className="h-16 w-14 shrink-0 overflow-hidden bg-secondary">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold tracking-tight">{item.name}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Size {item.size} · Qty {item.qty}
                            </p>
                          </div>
                          <p className="text-sm font-semibold">{rupee(item.unit_price * item.qty)}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
