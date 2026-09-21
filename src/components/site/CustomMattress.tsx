import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MessageCircle, Ruler, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CustomMattressApi = {
  openCustomMattress: (product?: string) => void;
};

const CustomMattressContext = createContext<CustomMattressApi | null>(null);

const requestSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+ ]{8,15}$/, "Enter a valid phone number"),
  width: z.coerce.number().min(24).max(120),
  length: z.coerce.number().min(48).max(120),
  thickness: z.coerce.number().min(4).max(18),
  quantity: z.coerce.number().int().min(1).max(20),
  type: z.string().min(1),
  comfort: z.string().min(1),
  product: z.string().max(100),
});

export function CustomMattressProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState("");

  const value = useMemo(
    () => ({
      openCustomMattress: (selectedProduct = "") => {
        setProduct(selectedProduct);
        setOpen(true);
      },
    }),
    [],
  );

  return (
    <CustomMattressContext.Provider value={value}>
      {children}
      <CustomMattressPanel open={open} product={product} onClose={() => setOpen(false)} />
    </CustomMattressContext.Provider>
  );
}

export function useCustomMattress() {
  const context = useContext(CustomMattressContext);
  if (!context) throw new Error("useCustomMattress must be used within CustomMattressProvider");
  return context;
}

export function CustomMattressBadge() {
  const { openCustomMattress } = useCustomMattress();
  return (
    <Button
      type="button"
      onClick={() => openCustomMattress()}
      aria-label="Request a custom mattress"
      className="fixed right-0 top-1/2 z-40 hidden h-auto -translate-y-1/2 rounded-none rounded-l-sm bg-volt px-3 py-5 text-volt-foreground shadow-xl transition-transform hover:-translate-x-1 hover:bg-volt lg:flex"
    >
      <Ruler className="size-4" />
      <span className="label-xs [writing-mode:vertical-rl] rotate-180">Custom mattress</span>
    </Button>
  );
}

function CustomMattressPanel({ open, product, onClose }: { open: boolean; product: string; onClose: () => void }) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = requestSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the details and try again");
      return;
    }
    setError("");
    const data = parsed.data;
    const message = [
      "Hello Luxlife, I would like a custom mattress quote.",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.product ? `Preferred model: ${data.product}` : "",
      `Mattress type: ${data.type}`,
      `Comfort: ${data.comfort}`,
      `Size: ${data.width} × ${data.length} inches`,
      `Thickness: ${data.thickness} inches`,
      `Quantity: ${data.quantity}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/916382654934?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={cn("fixed inset-0 z-[90]", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <Button
        type="button"
        variant="ghost"
        aria-label="Close custom mattress form"
        onClick={onClose}
        className={cn("absolute inset-0 h-auto w-full rounded-none bg-ink/65 backdrop-blur-sm transition-opacity duration-500 hover:bg-ink/65", open ? "opacity-100" : "opacity-0")}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Custom mattress request"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-xl flex-col overflow-y-auto bg-background text-foreground shadow-2xl transition-transform duration-500 ease-[var(--ease-brand)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-5 backdrop-blur md:px-8">
          <div>
            <p className="label-xs text-muted-foreground">Made for your space</p>
            <h2 className="mt-1 font-display text-2xl font-bold uppercase">Build your mattress</h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close custom mattress form">
            <X />
          </Button>
        </div>

        <form onSubmit={submit} className="flex-1 space-y-7 px-5 py-7 md:px-8">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Share your measurements and sleep preference. Our Salem team will confirm construction, delivery time and a factory-direct quote on WhatsApp.
          </p>
          <input type="hidden" name="product" value={product} />
          {product && <p className="border-l-2 border-volt pl-3 text-sm font-semibold">Starting with {product}</p>}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Your name" maxLength={80} />
            <Field name="phone" label="Phone / WhatsApp" inputMode="tel" maxLength={15} placeholder="63826 54934" />
            <Field name="width" label="Width (inches)" type="number" min={24} max={120} defaultValue="60" />
            <Field name="length" label="Length (inches)" type="number" min={48} max={120} defaultValue="78" />
            <Field name="thickness" label="Thickness (inches)" type="number" min={4} max={18} defaultValue="8" />
            <Field name="quantity" label="Quantity" type="number" min={1} max={20} defaultValue="1" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField name="type" label="Mattress type" options={["Memory Foam", "Orthopedic", "Pocket Spring", "Latex", "Hybrid"]} />
            <SelectField name="comfort" label="Comfort feel" options={["Plush", "Medium Soft", "Medium", "Medium Firm", "Firm", "Extra Firm"]} />
          </div>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="h-13 w-full rounded-none bg-primary text-primary-foreground hover:bg-charcoal">
            <MessageCircle className="size-4" />
            <span className="label-xs">Request quote on WhatsApp</span>
          </Button>
          <p className="text-center text-xs text-muted-foreground">No payment required. We will confirm every detail before production.</p>
        </form>
      </aside>
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { name: string; label: string }) {
  const { label, ...inputProps } = props;
  return (
    <label className="block">
      <span className="label-xs">{label}</span>
      <input required {...inputProps} className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground" />
    </label>
  );
}

function SelectField({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="label-xs">{label}</span>
      <select name={name} required className="mt-2 h-12 w-full border border-border bg-background px-4 text-sm outline-none focus:border-foreground">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}