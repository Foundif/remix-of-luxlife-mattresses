import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

const columns = [
  { title: "Shop", links: ["All Socks", "Sports", "Everyday", "New Arrivals", "Best Sellers", "Offers"] },
  { title: "Help", links: ["Size Guide", "Shipping", "Returns", "Track Order", "Contact"] },
  { title: "Brand", links: ["Our Story", "Technology", "Sustainability", "Careers", "Press"] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="edge grid gap-14 py-16 md:grid-cols-[1.2fr_2fr] md:py-24">
        <div>
          <h2 className="display-md max-w-[18ch]">
            Join the movement<span className="text-volt">.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-concrete">
            Early access to drops, restocks and members-only pricing. No noise.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list");
            }}
            className="mt-8 flex max-w-md items-center gap-4 border-b border-bone/25 pb-3"
          >
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="your@email.com"
              className="w-full bg-transparent text-sm placeholder:text-concrete/70 focus:outline-none"
            />
            <button aria-label="Subscribe" className="text-volt transition-transform hover:translate-x-1">
              <ArrowRight className="size-5" strokeWidth={1.6} />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-xs text-volt">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="/" className="text-sm text-concrete transition-colors hover:text-bone">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="edge border-t border-bone/10 py-8">
        <p className="font-display text-[13vw] leading-[0.8] font-extrabold tracking-[-0.05em] uppercase text-bone/10 select-none">
          Krux
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="label-xs text-concrete">© 2026 Krux Athletics — Made in India</p>
          <p className="label-xs text-concrete">Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
