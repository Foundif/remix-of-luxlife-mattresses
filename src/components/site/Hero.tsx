import { ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { useScrollY } from "@/hooks/use-in-view";
import { media } from "@/data/products";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";

export function Hero() {
  const y = useScrollY();
  const fade = Math.max(0, 1 - Math.min(y, 600) / 600);
  const shift = Math.min(y, 900) * 0.12;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="relative h-[86svh] min-h-[560px] overflow-hidden bg-ink text-bone md:h-screen">
      <div className="absolute inset-0" style={{ transform: `translate3d(0, ${shift}px, 0)` }}>
        <video
          ref={videoRef}
          src={heroLoop.url}
          poster={media.heroAthlete}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Athlete sprinting at night wearing KRUX performance socks"
          className="anim-image h-full w-full object-cover object-[62%_center] md:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="edge relative flex h-full flex-col justify-end pb-14 md:justify-center md:pb-0">
        <div style={{ opacity: fade }}>
          <p className="label-xs anim-rise mb-5 text-volt md:mb-8" style={{ animationDelay: "0.35s" }}>
            New Collection — 2026
          </p>

          <h1 className="display-xl max-w-[15ch]">
            <span className="reveal-mask">
              <span className="anim-reveal block" style={{ animationDelay: "0.45s" }}>
                Built for
              </span>
            </span>
            <span className="reveal-mask">
              <span className="anim-reveal block" style={{ animationDelay: "0.6s" }}>
                Every Move<span className="text-volt">.</span>
              </span>
            </span>
          </h1>

          <p
            className="anim-rise mt-6 max-w-md text-sm leading-relaxed text-concrete md:mt-8 md:text-base"
            style={{ animationDelay: "0.85s" }}
          >
            Engineered knitwear for the ground you cover. Compression fit, breathable zones,
            cushioning that holds its shape past the hundredth wash.
          </p>

          <div
            className="anim-rise mt-8 flex flex-wrap items-center gap-3 md:mt-10"
            style={{ animationDelay: "1s" }}
          >
            <a
              href="/"
              className="group inline-flex items-center gap-3 bg-bone px-7 py-4 text-ink transition-colors duration-500 ease-[var(--ease-brand)] hover:bg-volt"
            >
              <span className="label-xs">Shop Now</span>
              <ArrowRight
                className="size-4 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1.5"
                strokeWidth={1.8}
              />
            </a>
            <a
              href="/"
              className="group inline-flex items-center gap-3 border border-bone/30 px-7 py-4 text-bone transition-colors duration-500 ease-[var(--ease-brand)] hover:border-bone hover:bg-bone/5"
            >
              <span className="label-xs">Explore Collection</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute right-5 bottom-5 flex items-center gap-2 md:right-10" style={{ opacity: fade }}>
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute film" : "Mute film"}
          className="rounded-full border border-bone/25 p-2.5 backdrop-blur-sm transition-colors hover:border-bone hover:bg-bone/10"
        >
          {muted ? <VolumeX className="size-4" strokeWidth={1.6} /> : <Volume2 className="size-4" strokeWidth={1.6} />}
        </button>
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause film" : "Play film"}
          className="rounded-full border border-bone/25 p-2.5 backdrop-blur-sm transition-colors hover:border-bone hover:bg-bone/10"
        >
          {playing ? <Pause className="size-4" strokeWidth={1.6} /> : <Play className="size-4" strokeWidth={1.6} />}
        </button>
      </div>

      <div
        className="edge pointer-events-none absolute inset-x-0 bottom-5 hidden items-end justify-between md:flex"
        style={{ opacity: fade }}
      >
        <p className="label-xs anim-cue text-concrete">Scroll to explore ↓</p>
        <div className="flex items-center gap-6">
          <p className="label-xs hidden text-concrete lg:block">Performance / Comfort / Everyday</p>
          <p className="label-xs text-bone">
            01 <span className="text-concrete">/ 04</span>
          </p>
        </div>
      </div>
    </section>
  );
}
