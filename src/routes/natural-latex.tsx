import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Shell } from "@/components/site/Shell";
import { Button } from "@/components/ui/button";
import mattressLatex from "@/assets/mattress-latex.jpg";

const title = "Natural Latex Mattresses — Luxlife";
const description = "Enquire about Luxlife Natural Latex mattresses, sizes, availability and factory-direct pricing in Salem.";

export const Route = createFileRoute("/natural-latex")({
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: NaturalLatexPage,
});

function NaturalLatexPage() {
  const [size, setSize] = useState("Queen");
  const [dimensions, setDimensions] = useState("");
  const message = encodeURIComponent(`Hello Luxlife! I am interested in a Natural Latex mattress. Bed size: ${size}. Measurements: ${dimensions || "Please help me confirm"}. Please share available thicknesses, material specifications, price and delivery details.`);
  return (
    <Shell>
      <section className="relative min-h-[440px] bg-ink text-bone md:min-h-[560px]">
        <img src={mattressLatex} alt="Mattress collection — illustrative image" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="edge relative flex min-h-[440px] flex-col justify-end pb-12 pt-20 md:min-h-[560px] md:pb-16">
          <p className="text-xs font-semibold uppercase text-volt">Luxlife Mattresses · Factory enquiries</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-tight sm:text-5xl md:text-6xl">Natural Latex</h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed">A more natural choice for your next mattress.</p>
          <Button asChild className="mt-6 h-11 w-fit"><a href="#latex-enquiry">Request a quote <ArrowRight /></a></Button>
        </div>
      </section>
      <section id="latex-enquiry" className="edge grid scroll-mt-24 gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground">Made for your bed</p>
          <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight">Find your Natural Latex mattress.</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">Contact our Salem factory to confirm material composition, available sizes and thicknesses, current pricing, and delivery.</p>
          <p className="mt-6 max-w-md border-t border-border pt-5 text-xs text-muted-foreground">Collection image shown for illustration. Final product details and pricing are confirmed with your quote.</p>
        </div>
        <div className="space-y-5">
          <label className="block text-sm font-semibold">Bed size
            <select value={size} onChange={(e) => setSize(e.target.value)} className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 text-sm">
              {["Single", "Double", "Queen", "King", "Custom size"].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold">Measurements in inches (optional)
            <input value={dimensions} onChange={(e) => setDimensions(e.target.value)} maxLength={100} placeholder="Length × width, e.g. 75 × 60" className="mt-2 h-12 w-full rounded-md border border-input bg-background px-3 text-sm" />
          </label>
          <p className="border-y border-border py-4 text-sm">Choose 50% advance with the balance later, or full payment.</p>
          <Button asChild className="h-auto min-h-12 w-full whitespace-normal py-3"><a href={`https://wa.me/916382654934?text=${message}`} target="_blank" rel="noopener noreferrer"><MessageCircle /> Enquire on WhatsApp</a></Button>
          <Button asChild variant="outline" className="h-11 w-full"><Link to="/shop" search={{}}>Explore the collection <ArrowRight /></Link></Button>
        </div>
      </section>
    </Shell>
  );
}