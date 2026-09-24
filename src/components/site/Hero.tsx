import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import heroLoop1 from "@/assets/luxlife-sunlight-bed-hd.mp4.asset.json";
import heroLoop2 from "@/assets/luxlife-stitch-detail-hd.mp4.asset.json";
import heroLoop3 from "@/assets/luxlife-sunrise-bedroom-hd.mp4.asset.json";
import poster1 from "@/assets/luxlife-sunlight-bed-poster.jpg.asset.json";
import poster2 from "@/assets/luxlife-stitch-detail-poster.jpg.asset.json";
import poster3 from "@/assets/luxlife-sunrise-bedroom-poster.jpg.asset.json";

const slides = [
  {
    src: heroLoop1.url,
    poster: poster1.url,
    title: "SLEEP BETTER",
    copy: "The standard in orthopedic comfort",
    alt: "Luxlife mattress illuminated by warm morning sunlight",
  },
  {
    src: heroLoop2.url,
    poster: poster2.url,
    title: "CRAFTED FINE",
    copy: "Hand-stitched precision in Salem",
    alt: "Close-up of fine stitching on a Luxlife mattress",
  },
  {
    src: heroLoop3.url,
    poster: poster3.url,
    title: "RISE RENEWED",
    copy: "Better mornings begin here",
    alt: "Beautiful bedroom with a Luxlife mattress at sunrise",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const slide = slides[index]!;

  // Warm up next slide smoothly without overloading video decoders
  useEffect(() => {
    setLoaded((prev) => (prev.includes(index) ? prev : [...prev, index]));
    const next = (index + 1) % slides.length;
    const timer = window.setTimeout(() => {
      setLoaded((prev) => (prev.includes(next) ? prev : [...prev, next]));
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    refs.current.forEach((item, videoIndex) => {
      if (!item) return;
      if (videoIndex === index) {
        if (playing) void item.play().catch(() => undefined);
        else item.pause();
      } else {
        item.pause();
      }
    });
  }, [index, playing, loaded]);

  const go = (delta: number) => setIndex((current) => (current + delta + slides.length) % slides.length);

  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden bg-ink text-bone" aria-label="Luxlife campaigns">
      {slides.map((s, i) => (
        <video
          key={s.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          {...(loaded.includes(i) ? { src: s.src } : {})}
          poster={s.poster}
          autoPlay={i === 0}
          muted
          loop={false}
          playsInline
          disablePictureInPicture
          preload={i === 0 ? "auto" : "none"}
          onEnded={() => setIndex((current) => (current + 1) % slides.length)}
          aria-label={s.alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[var(--ease-brand)] [transform:translateZ(0)] [backface-visibility:hidden]",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* Subtle overlays that let the product pop */}
      <div className="absolute inset-0 bg-ink/20" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />

      {/* Nike-Style Lower-Third Layout */}
      <div className="edge absolute inset-x-0 bottom-24 flex flex-col items-center text-center md:bottom-28">
        <div key={index} className="anim-rise flex flex-col items-center">
          {/* Exact Nike-style bold headline font */}
          <h1 className="font-['Anton',Impact,'Arial_Black',sans-serif] text-[13vw] uppercase leading-[0.92] tracking-wide text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl lg:text-8xl">
            {slide.title}
          </h1>
          <p className="mt-3 text-sm font-medium tracking-normal text-bone/90 md:text-base">{slide.copy}</p>
          <a
            href="#new-this-week"
            className="group mt-6 inline-flex items-center justify-center rounded-full bg-bone px-8 py-3 text-sm font-semibold text-ink shadow-md transition-all duration-300 hover:scale-105 hover:bg-volt"
          >
            <span>Shop</span>
            <ArrowRight
              className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.2}
            />
          </a>
        </div>
      </div>

      {/* Center pagination dots */}
      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            aria-label={`Show film ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index ? "w-6 bg-bone" : "w-1.5 bg-bone/40 hover:bg-bone/80",
            )}
          />
        ))}
      </div>

      {/* Bottom right controls */}
      <div className="absolute bottom-6 right-5 hidden items-center gap-2 md:flex">
        <button
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? "Pause film" : "Play film"}
          className="grid size-10 place-items-center rounded-full border border-bone/40 text-bone backdrop-blur-sm transition-colors hover:bg-bone/15"
        >
          {playing ? <Pause className="size-4" strokeWidth={2} /> : <Play className="size-4" strokeWidth={2} />}
        </button>
        <button
          onClick={() => go(-1)}
          aria-label="Previous film"
          className="grid size-10 place-items-center rounded-full border border-bone/40 text-bone backdrop-blur-sm transition-colors hover:bg-bone/15"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next film"
          className="grid size-10 place-items-center rounded-full border border-bone/40 text-bone backdrop-blur-sm transition-colors hover:bg-bone/15"
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
