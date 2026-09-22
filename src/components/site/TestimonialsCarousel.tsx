import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "The OrthoAlign gives my lower back firm, restorative support without feeling like a hard plank. I wake up with zero stiffness.",
    name: "R. Prakash",
    initial: "P",
    city: "Salem",
    product: "OrthoAlign Zoned",
    rating: 5,
  },
  {
    quote:
      "We ordered a custom 78x72 cot size. Karthikeyan personally verified our bed frame dimensions. Delivered right to our bedroom.",
    name: "Nivedha S.",
    initial: "N",
    city: "Erode",
    product: "Custom Hybrid King",
    rating: 5,
  },
  {
    quote:
      "BreezeGel stays noticeably cool through humid Salem nights. Zero heat trapping and isolates motion completely when my partner turns.",
    name: "Arun Kumar",
    initial: "A",
    city: "Namakkal",
    product: "BreezeGel Cooling",
    rating: 5,
  },
  {
    quote:
      "Direct factory pricing with unmatched build quality. Showroom brand comfort at almost half their retail cost. 10-year warranty is peace of mind.",
    name: "Meena K.",
    initial: "M",
    city: "Coimbatore",
    product: "Royal Pocket Spring",
    rating: 5,
  },
  {
    quote:
      "Purchased the Natural Latex mattress for our parents. Firm orthopedic support with organic pin-core breathability and zero odor.",
    name: "S. Venkatesh",
    initial: "V",
    city: "Salem",
    product: "100% Natural Latex",
    rating: 5,
  },
  {
    quote:
      "Exceptional edge support and zero sagging. Even after months of daily use, the quilted top feels plush, premium, and brand new.",
    name: "Deepa Anand",
    initial: "D",
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
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 380;
    const gap = 24;
    const offset = (cardWidth + gap) * (direction === "left" ? -1 : 1);
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard("right");
      }
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative overflow-hidden bg-ink py-24 md:py-32 text-bone"
      aria-label="Customer reviews"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Subtle radial ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-volt/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="edge">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.6fr] xl:gap-16">
          {/* Left Column: Architectural Brand Statement & Metrics */}
          <div className="relative max-w-xl">
            {/* Blufacade-style tag pill */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-0.5 w-10 bg-volt" />
              <span className="text-xs font-black uppercase tracking-widest text-volt">What They Say</span>
            </div>

            <h2 className="display-lg leading-[0.92] text-bone">
              Trusted by <br />
              <span className="text-volt">10,000+</span> <br />
              Homes
            </h2>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-concrete">
              Handcrafted in our Salem factory with zero middleman markups. Discover why homeowners, doctors, and
              athletes across Tamil Nadu choose Luxlife.
            </p>

            {/* Metrics counter bar */}
            <div className="mt-8 grid grid-cols-2 gap-6 border-y border-white/10 py-6">
              <div>
                <div className="text-4xl md:text-5xl font-black text-bone">
                  15,000<span className="text-volt">+</span>
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-concrete">
                  Mattresses Delivered
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-bone">
                  99.2<span className="text-volt">%</span>
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-concrete">
                  Sleep Satisfaction
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollByCard("left")}
                disabled={!canScrollLeft}
                aria-label="Previous reviews"
                className="size-11 rounded-full border-white/20 bg-white/5 text-bone hover:bg-volt hover:text-ink hover:border-volt disabled:opacity-30 transition-all"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollByCard("right")}
                disabled={!canScrollRight}
                aria-label="Next reviews"
                className="size-11 rounded-full border-white/20 bg-white/5 text-bone hover:bg-volt hover:text-ink hover:border-volt disabled:opacity-30 transition-all"
              >
                <ChevronRight className="size-5" />
              </Button>
              <span className="ml-2 text-xs font-medium text-concrete/70">Swipe or use arrows</span>
            </div>
          </div>

          {/* Right Column: Cards Carousel with Edge Fades */}
          <div className="relative w-full overflow-hidden">
            {/* Left & Right gradient edge masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-ink to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-ink to-transparent" />

            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-2"
            >
              {testimonials.map((review, i) => (
                <article
                  key={i}
                  className="group relative flex w-[300px] sm:w-[380px] shrink-0 snap-start flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:border-volt/60 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >
                  {/* Decorative quote icon watermark */}
                  <Quote
                    className="absolute top-6 right-6 size-10 text-white/10 transition-colors group-hover:text-volt/30"
                    strokeWidth={1.5}
                  />

                  <div>
                    {/* 5-Star Rating */}
                    <div className="mb-5 flex gap-1">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="size-4 fill-volt text-volt" strokeWidth={0} />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <blockquote className="text-base sm:text-lg italic font-normal leading-relaxed text-bone/95">
                      "{review.quote}"
                    </blockquote>
                  </div>

                  {/* Customer Details Footer */}
                  <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
                    {/* Initial Avatar Squircle */}
                    <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-volt/30 bg-volt/15 font-black text-lg text-volt shadow-inner">
                      {review.initial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-bone truncate">{review.name}</h4>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-xs font-bold text-volt">{review.city}</span>
                        <span className="size-1 rounded-full bg-white/30" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-concrete truncate">
                          {review.product}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
