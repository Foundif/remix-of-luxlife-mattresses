import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";

const testimonials = [
  {
    quote:
      "The OrthoAlign gives my lower back firm, restorative support without feeling like a hard plank. Wake up with zero stiffness.",
    name: "R. Prakash",
    city: "Salem",
    product: "OrthoAlign Zoned Mattress",
    rating: 5,
  },
  {
    quote:
      "We ordered a custom 78x72 cot size. Karthikeyan personally verified our bed frame dimensions. Delivered right to our bedroom.",
    name: "Nivedha S.",
    city: "Erode",
    product: "Custom Hybrid King",
    rating: 5,
  },
  {
    quote:
      "BreezeGel stays noticeably cool through humid Salem nights. Zero heat trapping and isolates motion completely when my partner turns.",
    name: "Arun Kumar",
    city: "Namakkal",
    product: "BreezeGel Cooling Memory",
    rating: 5,
  },
  {
    quote:
      "Direct factory pricing with unmatched build quality. Showroom brand comfort at almost half their retail cost. 10-year warranty is peace of mind.",
    name: "Meena K.",
    city: "Coimbatore",
    product: "Royal Pocket Spring",
    rating: 5,
  },
  {
    quote:
      "Purchased the Natural Latex mattress for our parents. Firm orthopedic support with natural organic pin-core breathability.",
    name: "S. Venkatesh",
    city: "Salem",
    product: "100% Natural Latex",
    rating: 5,
  },
  {
    quote:
      "Exceptional edge support and zero sagging. Even after months of daily use, the quilted top feels plush and brand new.",
    name: "Deepa Anand",
    city: "Tirupur",
    product: "CloudRest Euro Top",
    rating: 5,
  },
];

export function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scrollByCard = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 350;
    const gap = 24;
    const offset = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Auto-scroll every 5 seconds when not hovered
  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Loop back to start if reached end
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard("right");
      }
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="bg-background py-20 md:py-28 overflow-hidden"
      aria-label="Customer reviews"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="edge">
        {/* Section Header with Left/Right Controls */}
        <div className="flex items-end justify-between gap-6 border-t border-border pt-10">
          <div>
            <p className="label-xs text-muted-foreground">05 — Rested & Reviewed</p>
            <Reveal delay={70}>
              <h2 className="display-md mt-4 max-w-[20ch]">Real sleep. Real difference.</h2>
            </Reveal>
            <p className="mt-2 text-sm text-concrete">
              Trusted by 10,000+ homes across Salem, Coimbatore & Tamil Nadu.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              aria-label="Previous reviews"
              className="rounded-full border-border hover:bg-secondary disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              aria-label="Next reviews"
              className="rounded-full border-border hover:bg-secondary disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 3-Column Snap-Scrolling Rail */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
        >
          {testimonials.map((review, i) => (
                    {testimonials.map((review, i) => (
            <article
              key={i}
              className="flex w-[85%] shrink-0 snap-start flex-col justify-between border border-concrete/20 bg-ink p-6 transition-all hover:border-volt/50 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  {/* 5-Star Rating in Glowing Volt */}
                  <div className="flex gap-1 text-volt">
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-4 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <Quote className="size-6 text-concrete/40" strokeWidth={1.5} />
                </div>

                <blockquote className="mt-5 text-sm md:text-base leading-relaxed text-bone font-medium">
                  "{review.quote}"
                </blockquote>
              </div>

              {/* High-visibility bottom section */}
              <div className="mt-8 border-t border-concrete/20 pt-4">
                <p className="text-sm font-semibold text-bone">
                  {review.name} <span className="font-normal text-concrete">· {review.city}</span>
                </p>
                <p className="label-xs mt-1 font-semibold tracking-wider text-volt">
                  Verified Owner · {review.product}
                </p>
              </div>
            </article>

          ))}
        </div>
      </div>
    </section>
  );
}
