import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { Shell } from "@/components/site/Shell";
import { rupee, useCart } from "@/components/site/cart-store";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const title = "Secure Checkout — KRUX";
const description = "Complete your KRUX order with secure checkout, cash on delivery or online payment.";

export const Route = createFileRoute("/checkout")({
  ssr: false,
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
  component: CheckoutPage,
});

const payments = [
  { key: "cod", label: "Cash on delivery" },
  { key: "upi", label: "UPI / Netbanking" },
  { key: "card", label: "Credit / Debit card" },
];

function CheckoutPage() {
  const { user, loading } = useAuth();
  const { lines, subtotal, discount, shipping, total, clear } = useCart();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to place your order");
      navigate({ to: "/auth" });
      return;
    }
    if (lines.length === 0) {
      toast.error("Your bag is empty");
      return;
    }
    setBusy(true);
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          ship_name: form.name,
          ship_phone: form.phone,
          ship_address: form.address,
          ship_city: form.city,
          ship_state: form.state,
          ship_pincode: form.pincode,
          payment_method: payment,
          subtotal,
          discount,
          shipping_fee: shipping,
          total,
        })
        .select("id, order_number")
        .single();

      if (error || !order) throw new Error(error?.message ?? "Could not create order");

      const { error: itemsError } = await supabase.from("order_items").insert(
        lines.map((l) => ({
          order_id: order.id,
          product_id: l.id,
          name: l.name,
          category: l.category,
          image: l.image,
          size: l.size,
          qty: l.qty,
          unit_price: l.price,
        })),
      );
      if (itemsError) throw new Error(itemsError.message);

      clear();
      setPlaced(order.order_number);
      toast.success("Order placed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setBusy(false);
    }
  }

  if (placed) {
    return (
      <Shell>
        <div className="edge flex flex-col items-center gap-5 py-28 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-volt text-volt-foreground">
            <Check className="size-6" strokeWidth={2.2} />
          </span>
          <h1 className="display-md">Order confirmed</h1>
          <p className="text-sm text-muted-foreground">
            Order <span className="font-semibold text-foreground">{placed}</span> is on its way. We'll email
            tracking details shortly.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link to="/account" className="label-xs bg-primary px-7 py-4 text-primary-foreground">
              View my orders
            </Link>
            <Link to="/shop" search={{}} className="label-xs border border-border px-7 py-4">
              Continue shopping
            </Link>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="edge py-10 md:py-14">
        <h1 className="display-md">Checkout</h1>

        {!loading && !user && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-border bg-secondary px-5 py-4">
            <p className="text-sm">Sign in to save this order to your account.</p>
            <Link to="/auth" className="label-xs bg-primary px-5 py-3 text-primary-foreground">
              Sign in
            </Link>
          </div>
        )}

        {lines.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link to="/shop" search={{}} className="label-xs mt-6 inline-block bg-primary px-7 py-4 text-primary-foreground">
              Shop socks
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <form onSubmit={placeOrder} className="space-y-10">
              <section>
                <h2 className="label-xs">Delivery address</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" value={form.name} onChange={set("name")} autoComplete="name" />
                  <Field
                    label="Phone"
                    value={form.phone}
                    onChange={set("phone")}
                    autoComplete="tel"
                    pattern="[0-9+ ]{8,15}"
                  />
                  <label className="block sm:col-span-2">
                    <span className="label-xs">Address</span>
                    <textarea
                      required
                      rows={3}
                      value={form.address}
                      onChange={set("address")}
                      autoComplete="street-address"
                      className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                    />
                  </label>
                  <Field label="City" value={form.city} onChange={set("city")} autoComplete="address-level2" />
                  <Field label="State" value={form.state} onChange={set("state")} autoComplete="address-level1" />
                  <Field
                    label="PIN code"
                    value={form.pincode}
                    onChange={set("pincode")}
                    autoComplete="postal-code"
                    pattern="[0-9]{6}"
                  />
                </div>
              </section>

              <section>
                <h2 className="label-xs">Payment method</h2>
                <div className="mt-5 divide-y divide-border border-y border-border">
                  {payments.map((p) => (
                    <label key={p.key} className="flex cursor-pointer items-center gap-3 py-4">
                      <input
                        type="radio"
                        name="payment"
                        value={p.key}
                        checked={payment === p.key}
                        onChange={() => setPayment(p.key)}
                        className="size-4 accent-current"
                      />
                      <span className="text-sm">{p.label}</span>
                    </label>
                  ))}
                </div>
                <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="size-3.5" strokeWidth={1.6} /> Payments are processed securely.
                </p>
              </section>

              <button
                type="submit"
                disabled={busy}
                className={cn(
                  "label-xs w-full bg-primary py-4 text-primary-foreground transition-colors duration-500 hover:bg-charcoal disabled:opacity-50",
                )}
              >
                {busy ? "Placing order…" : `Place order · ${rupee(total)}`}
              </button>
            </form>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="label-xs">Order summary</h2>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {lines.map((l) => (
                  <li key={`${l.id}-${l.size}`} className="flex gap-4 py-4">
                    <div className="h-20 w-16 shrink-0 overflow-hidden bg-secondary">
                      <img src={l.image} alt={l.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{l.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Size {l.size} · Qty {l.qty}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{rupee(l.price * l.qty)}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">{rupee(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Savings</dt>
                  <dd className="font-semibold text-volt-foreground/80">−{rupee(discount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-semibold">{shipping === 0 ? "Free" : rupee(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-semibold">{rupee(total)}</dd>
                </div>
              </dl>
              <Link to="/cart" className="label-xs mt-6 block border border-border py-4 text-center hover:bg-secondary">
                Edit bag
              </Link>
            </aside>
          </div>
        )}
      </div>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
  autoComplete,
  pattern,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  pattern?: string;
}) {
  return (
    <label className="block">
      <span className="label-xs">{label}</span>
      <input
        required
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        pattern={pattern}
        className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm outline-none focus:border-foreground"
      />
    </label>
  );
}
