import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { media } from "@/data/products";
import { cn } from "@/lib/utils";
import heroLoop1 from "@/assets/hero-loop.mp4.asset.json";
import heroLoop2 from "@/assets/hero-loop-2.mp4.asset.json";
import heroLoop3 from "@/assets/hero-loop-3.mp4.asset.json";

const slides = [
  {
    src: heroLoop1.url,
    poster: media.heroAthlete,
    eyebrow: "New Collection — 2026",
    title: "Built For Every Move",
    copy: "Engineered knit. Zero slip.",
    alt: "Athlete sprinting at night wearing KRUX performance socks",
  },
  {
    src: heroLoop2.url,
    poster: media.catSports,
    eyebrow: "Performance Series",
    title: "Push The Pace",
    copy: "Cushioned where it counts.",
    alt: "Close-up of an athlete pushing off a gym floor in KRUX socks",
  },
  {
    src: heroLoop3.url,
    poster: media.storyMove,
    eyebrow: "Everyday Essentials",
    title: "All Day Comfort",
    copy: "Breathable. Built to last.",
    alt: "Runner lacing sneakers over KRUX ribbed socks",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const sequenceRef = useRef<HTMLElement | null>(null);
  const slide = slides[index]!;

  useEffect(() => {
    const sequence = sequenceRef.current;
    if (!sequence) return;

    let frame = 0;
    const updateFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = sequence.getBoundingClientRect();
        const scrollRange = sequence.offsetHeight - window.innerHeight;
        if (scrollRange <= 0) return;
        const progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
        const position = Math.min(slides.length - 0.001, progress * slides.length);
        const nextIndex = Math.min(slides.length - 1, Math.floor(position));
        const filmProgress = position - nextIndex;

        refs.current.forEach((video, videoIndex) => {
          if (!video) return;
          video.pause();
          if (videoIndex !== nextIndex || !Number.isFinite(video.duration) || video.duration <= 0) return;
          const nextTime = Math.min(video.duration - 0.04, Math.max(0, filmProgress * video.duration));
          if (Math.abs(video.currentTime - nextTime) > 0.04) video.currentTime = nextTime;
        });
        setIndex(nextIndex);
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, []);

  const showSlide = (nextIndex: number) => {
    const sequence = sequenceRef.current;
    if (!sequence) {
      setIndex(nextIndex);
      return;
    }
    const scrollRange = sequence.offsetHeight - window.innerHeight;
    const target = sequence.offsetTop + scrollRange * ((nextIndex + 0.08) / slides.length);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={sequenceRef} className="relative h-[400svh] bg-ink text-bone" aria-label="KRUX campaigns">
      <div className="sticky top-0 h-svh min-h-[600px] overflow-hidden">
      {slides.map((s, i) => (
        <video
          key={s.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={s.src}
          poster={s.poster}
          autoPlay={false}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => event.currentTarget.pause()}
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
              <span className="label-xs">Shop Now</span>
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                strokeWidth={1.8}
              />
            </a>
            <a
              href="#best-sellers"
              className="inline-flex items-center gap-3 rounded-full border border-bone/40 px-8 py-4 text-bone transition-colors duration-500 ease-[var(--ease-brand)] hover:bg-bone/10"
            >
              <span className="label-xs">Best Sellers</span>
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

      <p className="label-xs absolute bottom-7 left-5 hidden text-bone/65 md:block">Scroll to explore</p>
      </div>
    </section>
  );
}
