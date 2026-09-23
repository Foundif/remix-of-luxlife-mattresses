import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Bed, Wind, ShieldCheck, Check, ArrowRight, MessageCircle } from "lucide-react";

// Uploaded 3D cutaway video from CDN
const VIDEO_URL = "/__l5e/assets-v1/5cbd9247-daf0-42a6-9fed-3429b39c1f37/luxlife-cutaway.mp4";

interface LayerInfo {
  id: number;
  number: string;
  name: string;
  badge: string;
  thickness: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: typeof Bed;
  categoryLink: string;
  categoryName: string;
}

const LAYERS: LayerInfo[] = [
  {
    id: 1,
    number: "01",
    name: "Knitted Jacquard Top Quilt",
    badge: "Breathable Surface",
    thickness: "1.0 Inch Ultra Plush",
    tagline: "Silky soft touch with moisture-wicking anti-allergic yarn",
    description:
      "Deep geometric quilting with premium high-GSM organic jacquard. Designed to maintain continuous airflow across the sleeping surface while naturally repelling dust mites.",
    highlights: [
      "Ultra-soft breathable weave",
      "Anti-dust mite & hypoallergenic yarn",
      "Double-stitched perimeter piping",
    ],
    icon: Sparkles,
    categoryLink: "/shop?c=Spring+Mattress",
    categoryName: "Spring Mattress",
  },
  {
    id: 2,
    number: "02",
    name: "Aurosoft High-Resilience Comfort",
    badge: "Pressure Relief",
    thickness: "Orthopedic High-Density",
    tagline: "Instant contouring relief for shoulders, hips, and lower back",
    description:
      "Salem factory-engineered comfort slab that contours to natural body curvature. Absorbs targeted pressure without the quicksand sinking feeling of ordinary memory foam.",
    highlights: [
      "Zero pressure hotspots on spine",
      "Optimal orthopedic lumbar alignment",
      "Certified 100% pure high-resilience foam",
    ],
    icon: Bed,
    categoryLink: "/shop?c=Aurosoft+Foam",
    categoryName: "Aurosoft Foam",
  },
  {
    id: 3,
    number: "03",
    name: "Cool-Blue Airflow Transition Layer",
    badge: "Active Heat Dissipation",
    thickness: "Porous Micro-Cell Slab",
    tagline: "Continuous thermal regulation that exhausts body heat",
    description:
      "Engineered open-cell structure with horizontal cross-ventilation perforations. Draws trapped body warmth down and vents it outwards for sweat-free Tamil Nadu nights.",
    highlights: [
      "40% cooler than standard PU foam",
      "Continuous micro-ventilation channels",
      "Progressive weight dampening transition",
    ],
    icon: Wind,
    categoryLink: "/shop?c=Hybrid+Eco",
    categoryName: "Hybrid Eco",
  },
  {
    id: 4,
    number: "04",
    name: "Zero-Disturbance Pocket Spring Core",
    badge: "Motion Isolation",
    thickness: "Individually Enclosed Coils",
    tagline: "Independent barrel coils isolate 100% of partner movement",
    description:
      "Tempered high-tensile carbon steel coils individually sealed in breathable acoustic fabric pockets. When your partner tosses or turns, your half remains motionless.",
    highlights: [
      "100% zero motion transfer guarantee",
      "Reinforced high-density foam side rails",
      "10-Year anti-sag factory warranty",
    ],
    icon: ShieldCheck,
    categoryLink: "/shop?c=Spring+Mattress",
    categoryName: "Spring Mattress",
  },
];

export function AnatomySection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // How far down has the user scrolled through this tall section (0 to 1)
      const scrolled = -rect.top;
      const maxScroll = containerHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrolled / (maxScroll || 1)));

      setScrollProgress(progress);

      // Scrub the video time directly based on scroll position (0 to 10 seconds)
      const duration = video.duration || 10;
      if (Number.isFinite(duration) && duration > 0) {
        const targetTime = progress * (duration - 0.05);
        if (Math.abs(video.currentTime - targetTime) > 0.08) {
          video.currentTime = targetTime;
        }
      }

      // Determine active layer (4 stages: 0-25%, 25-50%, 50-75%, 75-100%)
      const stage = Math.min(3, Math.floor(progress * 4));
      setActiveLayerIndex(stage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeLayer = LAYERS[activeLayerIndex] ?? LAYERS[0]!;
  const ActiveIcon = activeLayer.icon;

  const scrollToLayer = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    const targetScroll = containerTop + (index / 4) * (containerHeight - windowHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-ink text-bone min-h-[320vh] lg:min-h-[380vh]"
    >
      {/* Sticky viewport frame that pins while user scrolls */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 h-full max-h-[920px] flex flex-col justify-center">
          
          {/* Section Sub-Header */}
          <div className="flex items-center justify-between border-b border-bone/10 pb-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#ADF831] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#ADF831] uppercase">
                3D Cutaway Deconstruction
              </span>
            </div>
            <div className="text-[11px] sm:text-xs text-bone/50 font-mono">
              Scroll to disassemble • Frame {Math.round(scrollProgress * 100)}%
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            {/* LEFT COLUMN: Text Content synced to 3D scroll */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
              
              {/* Stepper Tabs (Clickable shortcuts) */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-bone/5 border border-bone/10 mb-4 sm:mb-6">
                {LAYERS.map((layer, idx) => (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => scrollToLayer(idx)}
                    className={`text-center py-1.5 px-1 rounded-lg text-[10px] sm:text-xs font-mono transition-all ${
                      activeLayerIndex === idx
                        ? "bg-[#ADF831] text-ink font-bold shadow-md shadow-[#ADF831]/20"
                        : "text-bone/60 hover:text-bone hover:bg-bone/5"
                    }`}
                  >
                    {layer.number}
                  </button>
                ))}
              </div>

              {/* Layer Title & Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ADF831]">
                  Layer {activeLayer.number} of 04
                </span>
                <span className="text-bone/30">•</span>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-bone/10 text-bone/80 border border-bone/15">
                  {activeLayer.badge}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-bone tracking-tight mb-2 transition-all duration-300">
                {activeLayer.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#ADF831] font-medium mb-3">
                {activeLayer.tagline}
              </p>

              <p className="text-xs sm:text-sm text-bone/70 leading-relaxed mb-4 min-h-[48px]">
                {activeLayer.description}
              </p>

              {/* Bullet Points with Volt Checkmarks */}
              <ul className="space-y-2 mb-5">
                {activeLayer.highlights.map((point, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-bone/90">
                    <span className="w-4 h-4 rounded-full bg-[#ADF831]/20 text-[#ADF831] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-bone/10">
                <Link
                  to={activeLayer.categoryLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ADF831] text-ink font-bold text-xs hover:brightness-110 transition-all shadow-sm shadow-[#ADF831]/20"
                >
                  <span>Explore {activeLayer.categoryName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/916382654934?text=Hi%20Luxlife!%20I%20saw%20the%203D%20${encodeURIComponent(
                    activeLayer.name
                  )}%20breakdown%20on%20your%20website.%20Can%20you%20share%20pricing%20details?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-bone/10 text-bone text-xs font-medium hover:bg-bone/20 border border-bone/15 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#ADF831]" />
                  <span>Ask Factory</span>
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN: 3D Video Scrubbing on Scroll (NO BUTTONS, NO SOUND) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-bone/15 shadow-2xl shadow-black/80 aspect-video">
                
                {/* Clean 3D Video — Controlled purely by page scroll */}
                <video
                  ref={videoRef}
                  src={VIDEO_URL}
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover block"
                />

                {/* Subtle Ambient Vignette / Glow */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl sm:rounded-3xl" />

                {/* Minimal Top-Right Thickness Watermark */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-[#ADF831]">
                  {activeLayer.thickness}
                </div>

                {/* Floating Bottom Scroll Hint */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-bone/60 flex items-center gap-1.5">
                  <ActiveIcon className="w-3 h-3 text-[#ADF831]" />
                  <span>Layer {activeLayer.number} Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
