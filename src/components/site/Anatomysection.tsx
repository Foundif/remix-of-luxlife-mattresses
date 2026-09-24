import { useEffect, useRef, useState } from "react";
import cutawayVideo from "@/assets/cutaway-hd.mp4.asset.json";
import cutawayPoster from "@/assets/cutaway-poster.jpg.asset.json";
import { cn } from "@/lib/utils";

interface Layer {
  num: string;
  name: string;
  badge: string;
  desc: string;
  specs: string;
}

const LAYERS: Layer[] = [
  {
    num: "01",
    name: "Knitted Jacquard Top Quilt",
    badge: "Breathable Surface",
    desc: "High-GSM organic jacquard with deep geometric quilting. Silky soft touch with anti-dust mite yarn.",
    specs: '1.0" Ultra Plush · Hypoallergenic',
  },
  {
    num: "02",
    name: "Aurosoft High-Resilience Comfort",
    badge: "Orthopedic Pressure Relief",
    desc: "Salem factory-engineered comfort slab that contours to the spine without sinking.",
    specs: "High-Density Foam · Zero Hotspots",
  },
  {
    num: "03",
    name: "Cool-Blue Airflow Transition",
    badge: "Active Heat Dissipation",
    desc: "Open-cell micro-ventilation channels that draw trapped body warmth and exhaust it outwards.",
    specs: "40% Cooler · Continuous Airflow",
  },
  {
    num: "04",
    name: "Zero-Disturbance Pocket Spring Core",
    badge: "Zero Motion Transfer",
    desc: "Individually encased carbon steel barrel coils. When one side moves, the other stays perfectly still.",
    specs: "High-Tensile Steel · Edge-Reinforced",
  },
];

export function AnatomySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [activeLayer, setActiveLayer] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let animId: number;
    let isTicking = false;

    // Pause native playback so page scroll drives the video frame
    video.pause();

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrollableDist = rect.height - windowH;

      if (scrollableDist <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / scrollableDist));

      setProgress(rawProgress);

      const layerIdx = Math.min(3, Math.floor(rawProgress * 4));
      setActiveLayer(layerIdx);

      const duration = video.duration || 10;
      targetTime = rawProgress * duration;

      if (!isTicking) {
        isTicking = true;
        animId = requestAnimationFrame(smoothScrub);
      }
    };

    const smoothScrub = () => {
      if (!video) return;

      const diff = targetTime - video.currentTime;
      if (Math.abs(diff) > 0.03) {
        video.currentTime += diff * 0.25;
        animId = requestAnimationFrame(smoothScrub);
      } else {
        video.currentTime = targetTime;
        isTicking = false;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const layer = LAYERS[activeLayer]!;

  return (
    <section ref={containerRef} aria-label="Inside a Luxlife mattress" className="relative h-[340vh] bg-ink text-bone">
      {/* Pinned viewport frame */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden">
        {/* 3D deconstruction video */}
        <video
          ref={videoRef}
          src={cutawayVideo.url}
          poster={cutawayPoster.url}
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
          aria-label="3D cutaway animation"
          className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
        />

        {/* Cinematic contrast overlays */}
        <div className="pointer-events-none absolute inset-0 bg-ink/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />

        {/* Top Header & Layer Indicators */}
        <div className="edge relative z-10 flex items-center justify-between pt-24 md:pt-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-volt">Engineering Breakdown</p>
            <h2 className="mt-1 font-['Anton',Impact,sans-serif] text-2xl uppercase tracking-wider text-white sm:text-3xl">
              Anatomy Of Sleep
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {LAYERS.map((l, i) => (
              <div
                key={l.num}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs transition-all duration-300",
                  activeLayer === i
                    ? "bg-volt text-ink font-bold shadow-lg"
                    : "bg-white/10 text-white/60 backdrop-blur-md",
                )}
              >
                <span>{l.num}</span>
                <span className="hidden sm:inline">{l.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Floating Glass Card */}
        <div className="edge relative z-10 pb-20 md:pb-16">
          <div className="max-w-md rounded-2xl border border-white/15 bg-ink/75 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-volt">
                Layer {layer.num} of 04
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-bone/80">
                {layer.badge}
              </span>
            </div>

            <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">{layer.name}</h3>

            <p className="mt-2 text-sm leading-relaxed text-bone/85">{layer.desc}</p>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-xs text-bone/60">{layer.specs}</span>
              <span className="font-mono text-xs text-volt">{Math.round(progress * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Subtle Bottom Progress Strip */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <div className="h-full bg-volt transition-all duration-75 ease-out" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
