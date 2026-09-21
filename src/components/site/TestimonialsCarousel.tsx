import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "The OrthoAlign gives my back firm support without feeling hard. I wake up noticeably fresher now.",
    name: "R. Prakash",
    city: "Salem",
    product: "OrthoAlign Support",
  },
  {
    quote: "We ordered a custom king size and the team guided us through every measurement. The finish is excellent.",
    name: "Nivedha S.",
    city: "Erode",
    product: "Custom Hybrid Mattress",
  },
  {
    quote: "BreezeGel stays comfortable through warm nights and isolates movement far better than our old mattress.",
    name: "Arun Kumar",
    city: "Namakkal",
    product: "BreezeGel Cooling",
  },
  {
    quote: "Factory-direct quality, clear advice and careful delivery. The mattress feels premium from the first night.",
    name: "Meena K.",
    city: "Coimbatore",
    product: "Royal Pocket Spring",
  },
];

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const go = (direction: number) =>
    setIndex((current) => (current + direction + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => go(1), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="overflow-hidden bg-background py-20 md:py-28"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(event) => {
        startX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0]?.clientX;
        if (startX.current !== null && endX !== undefined && Math.abs(endX - startX.current) > 45) {
          go(endX < startX.current ? 1 : -1);
        }
        startX.current = null;
      }}
    >
      <div className="edge">
        <div className="flex items-end justify-between gap-6 border-t border-border pt-10">
          <div>
            <p className="label-xs text-muted-foreground">05 — Rested & reviewed</p>
            <Reveal delay={70}>
              <h2 className="display-md mt-4 max-w-[18ch]">Real sleep. Real difference.</h2>
            </Reveal>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Previous review" className="rounded-full">
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Next review" className="rounded-full">
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="relative mt-12 min-h-[300px] md:min-h-[270px]" aria-live="polite">
          {testimonials.map((review, reviewIndex) => (
            <article
              key={review.name}
              aria-hidden={reviewIndex !== index}
              className={cn(
                "absolute inset-0 grid content-center transition-all duration-700 ease-[var(--ease-brand)] md:grid-cols-[0.8fr_2.2fr] md:gap-16",
                reviewIndex === index
                  ? "pointer-events-auto translate-x-0 opacity-100"
                  : reviewIndex < index
                    ? "pointer-events-none -translate-x-10 opacity-0"
                    : "pointer-events-none translate-x-10 opacity-0",
              )}
            >
              <div className="flex items-start justify-between gap-4 md:block">
                <Quote className="size-10 text-volt md:size-14" strokeWidth={1.2} />
                <div className="flex gap-1 text-foreground md:mt-8">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="size-4 fill-current" strokeWidth={0} />
                  ))}
                </div>
              </div>
              <div className="mt-8 md:mt-0">
                <blockquote className="font-display text-2xl leading-tight font-semibold md:text-4xl lg:text-5xl">
                  “{review.quote}”
                </blockquote>
                <div className="mt-8 border-t border-border pt-5">
                  <p className="text-sm font-semibold">{review.name} · {review.city}</p>
                  <p className="label-xs mt-2 text-muted-foreground">Verified owner · {review.product}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-6">
          <p className="label-xs text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</p>
          <div className="flex flex-1 justify-end gap-2">
            {testimonials.map((review, reviewIndex) => (
              <Button
                key={review.name}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Show review ${reviewIndex + 1}`}
                aria-current={reviewIndex === index}
                onClick={() => setIndex(reviewIndex)}
                className="h-5 w-8 rounded-none p-0"
              >
                <span className={cn("h-0.5 w-full transition-colors", reviewIndex === index ? "bg-foreground" : "bg-border")} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}