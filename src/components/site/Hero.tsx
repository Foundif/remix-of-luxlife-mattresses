import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { media } from "@/data/products";
import { cn } from "@/lib/utils";
import heroLoop1 from "@/assets/luxlife-sunlight-bed.mp4.asset.json";
import heroLoop2 from "@/assets/luxlife-stitch-detail.mp4.asset.json";
import heroLoop3 from "@/assets/luxlife-sunrise-bedroom.mp4.asset.json";

const slides = [
  {
    src: heroLoop1.url,
    poster: media.heroAthlete,
    eyebrow: "Sleep Better · Live Better",
    title: "Luxury In Every Night",
    copy: "Premium comfort, made for deeper sleep.",
    alt: "Luxlife mattress illuminated by warm morning sunlight",
  },
  {
    src: heroLoop2.url,
    poster: media.catSports,
    eyebrow: "Made With Precision",
    title: "Comfort In Every Detail",
    copy: "Fine stitching. Lasting support.",
    alt: "Close-up of fine stitching on a Luxlife mattress",
  },
  {
    src: heroLoop3.url,
    poster: media.storyMove,
    eyebrow: "Wake Up Renewed",
    title: "Better Mornings Begin Here",
    copy: "Rest easy. Rise refreshed.",
    alt: "Beautiful bedroom with a Luxlife mattress at sunrise",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const slide = slides[index]!;

  useEffect(() => {
    const video = refs.current[index];
    if (!video) return;
    refs.current.forEach((item, videoIndex) => {
      if (!item) return;
      if (videoIndex === index) void item.play().catch(() => undefined);
      else item.pause();
    });
  }, [index]);

  const showSlide = (nextIndex: number) => setIndex(nextIndex);

  return (
    <section className="relative h-svh min-h-[600px] overflow-hidden bg-ink text-bone" aria-label="Luxlife campaigns">
      {slides.map((s, i) => (
        <video
          key={s.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={s.src}
          poster={s.poster}
          autoPlay={i === 0}
          muted
          loop={false}
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          onEnded={() => setIndex((current) => (current + 1) % slides.length)}
          aria-label={s.alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-[var(--ease-brand)]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-ink/45" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 to-transparent" />

      <div className="edge relative flex h-full flex-col items-center justify-center pb-16 text-center md:pb-0">
        <div key={index} className="anim-rise">
          <p className="label-xs text-volt">{slide.eyebrow}</p>
          <h1 className="hero-title mx-auto mt-5 max-w-[14ch]">{slide.title}</h1>
          <p className="mt-6 text-sm text-bone/85 md:text-base">{slide.copy}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
               href="#new-this-week"
              className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-ink transition-colors duration-500 ease-[var(--ease-brand)] hover:bg-volt"
            >
               <span className="label-xs">Shop Mattresses</span>
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                strokeWidth={1.8}
              />
            </a>
            <a
              href="#best-sellers"
              className="inline-flex items-center gap-3 rounded-full border border-bone/40 px-8 py-4 text-bone transition-colors duration-500 ease-[var(--ease-brand)] hover:bg-bone/10"
            >
               <span className="label-xs">Find Your Comfort</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Show film ${i + 1}`}
            aria-current={i === index}
            onClick={() => showSlide(i)}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              i === index ? "w-10 bg-bone" : "w-4 bg-bone/40 hover:bg-bone/70",
            )}
          />
        ))}
      </div>

       <p className="label-xs absolute bottom-7 left-5 hidden text-bone/65 md:block">Sleep better · Live better</p>
    </section>
  );
}
