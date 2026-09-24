import { Quote, Star } from "lucide-react";

const testimonialsRow1 = [
  {
    quote:
      "The OrthoAlign gives my lower back firm, restorative support without feeling like a hard plank. I wake up with zero stiffness.",
    name: "R. Prakash",
    initial: "P",
    city: "Salem",
    product: 'Spinocore 6"',
    rating: 5,
  },
  {
    quote:
      "We ordered a custom 78x72 cot size. Karthikeyan personally verified our bed frame dimensions. Delivered right to our bedroom.",
    name: "Nivedha S.",
    initial: "N",
    city: "Erode",
    product: 'Zenluxe 8" Euro Top',
    rating: 5,
  },
  {
    quote:
      "Aurosoft Foam stays noticeably cool through humid Salem nights. Zero heat trapping and isolates motion completely when turning.",
    name: "Arun Kumar",
    initial: "A",
    city: "Namakkal",
    product: 'Aurosoft Foam 6"',
    rating: 5,
  },
];

const testimonialsRow2 = [
  {
    quote:
      "Direct factory pricing with unmatched build quality. Showroom comfort at almost half their retail cost. 10-year warranty is peace of mind.",
    name: "Meena K.",
    initial: "M",
    city: "Coimbatore",
    product: 'Hybrid Eco 6"',
    rating: 5,
  },
  {
    quote:
      "Purchased the mattress for our parents. Firm orthopedic support with double-side quilt breathability and zero sagging.",
    name: "S. Venkatesh",
    initial: "V",
    city: "Salem",
    product: 'Spinocore 6"',
    rating: 5,
  },
  {
    quote:
      "Exceptional edge support and zero sagging. Even after months of daily use, the quilted top feels plush, premium, and brand new.",
    name: "Deepa Anand",
    initial: "D",
    city: "Tirupur",
    product: 'Zenluxe 8" Euro Top',
    rating: 5,
  },
];

// Duplicate each row for seamless infinite scrolling
const marqueeTop = [...testimonialsRow1, ...testimonialsRow1];
const marqueeBottom = [...testimonialsRow2, ...testimonialsRow2];

export function TestimonialsCarousel() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28 text-bone" aria-label="Customer reviews">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-top {
          display: flex;
          width: max-content;
          animation: marqueeLeft 34s linear infinite;
        }
        .animate-marquee-bottom {
          display: flex;
          width: max-content;
          animation: marqueeRight 38s linear infinite;
        }
        .animate-marquee-top:hover,
        .animate-marquee-top:active,
        .animate-marquee-bottom:hover,
        .animate-marquee-bottom:active {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-top,
          .animate-marquee-bottom {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>

      {/* Subtle radial ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-volt/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="edge">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.7fr] xl:gap-14">
          {/* Left Column: Rebalanced Headline & Metrics */}
          <div className="relative max-w-lg">
            {/* Blufacade-style tag pill */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-0.5 w-8 bg-volt" />
              <span className="text-xs font-black uppercase tracking-widest text-volt">What They Say</span>
            </div>

            {/* Controlled, elegant heading scale */}
            <h2 className="text-3xl font-extrabold tracking-tight text-bone sm:text-4xl lg:text-[42px] leading-[1.15]">
              Trusted by <span className="text-volt">10,000+</span> Homes Across Tamil Nadu
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-concrete">
              Handcrafted in our Salem factory with zero middleman markups. Discover why doctors, homeowners, and
              families trust Luxlife for deeper, ache-free sleep.
            </p>

            {/* Metrics counter bar */}
            <div className="mt-6 grid grid-cols-2 gap-5 border-y border-white/10 py-5">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-bone">
                  15,000<span className="text-volt">+</span>
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-concrete">
                  Mattresses Delivered
                </div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-bone">
                  99.2<span className="text-volt">%</span>
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-concrete">
                  Sleep Satisfaction
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-concrete/70">
              <span className="size-2 rounded-full bg-volt animate-pulse" />
              <span>Hover or tap any card to pause</span>
            </div>
          </div>

          {/* Right Column: Dual Stacked Rails (Top & Bottom) */}
          <div className="relative w-full space-y-4 sm:space-y-5 overflow-hidden">
            {/* Edge gradient masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-16 bg-gradient-to-r from-ink to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-16 bg-gradient-to-l from-ink to-transparent" />

            {/* Row 1: Top Marquee (Scrolls Left) */}
            <div className="animate-marquee-top gap-4 sm:gap-5 py-1 px-2">
              {marqueeTop.map((review, i) => (
                <article
                  key={`top-${i}`}
                  className="group relative flex w-[290px] sm:w-[350px] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-volt/60 hover:bg-white/[0.08]"
                >
                  <Quote
                    className="absolute top-5 right-5 size-8 text-white/10 transition-colors group-hover:text-volt/30"
                    strokeWidth={1.5}
                  />

                  <div>
                    {/* 5-Star Rating */}
                    <div className="mb-3 flex gap-1">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="size-3.5 fill-volt text-volt" strokeWidth={0} />
                      ))}
                    </div>

                    <blockquote className="text-xs sm:text-sm font-normal leading-relaxed text-bone/90 italic">
                      "{review.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl border border-volt/30 bg-volt/15 font-black text-sm text-volt">
                      {review.initial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-bone truncate">{review.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-volt">{review.city}</span>
                        <span className="size-1 rounded-full bg-white/30" />
                        <span className="text-[10px] uppercase tracking-wider text-concrete truncate">
                          {review.product}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Row 2: Bottom Marquee (Scrolls Right / Parallax) */}
            <div className="animate-marquee-bottom gap-4 sm:gap-5 py-1 px-2">
              {marqueeBottom.map((review, i) => (
                <article
                  key={`btm-${i}`}
                  className="group relative flex w-[290px] sm:w-[350px] shrink-0 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-volt/60 hover:bg-white/[0.08]"
                >
                  <Quote
                    className="absolute top-5 right-5 size-8 text-white/10 transition-colors group-hover:text-volt/30"
                    strokeWidth={1.5}
                  />

                  <div>
                    {/* 5-Star Rating */}
                    <div className="mb-3 flex gap-1">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="size-3.5 fill-volt text-volt" strokeWidth={0} />
                      ))}
                    </div>

                    <blockquote className="text-xs sm:text-sm font-normal leading-relaxed text-bone/90 italic">
                      "{review.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl border border-volt/30 bg-volt/15 font-black text-sm text-volt">
                      {review.initial}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-bone truncate">{review.name}</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-bold text-volt">{review.city}</span>
                        <span className="size-1 rounded-full bg-white/30" />
                        <span className="text-[10px] uppercase tracking-wider text-concrete truncate">
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
