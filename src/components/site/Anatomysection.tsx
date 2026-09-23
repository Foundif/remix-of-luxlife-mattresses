import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Pause, Volume2, VolumeX, RotateCcw, ShieldCheck, Wind, Sparkles, Bed, ArrowRight } from "lucide-react";

// Uploaded 3D cutaway video from CDN
const VIDEO_URL = "/__l5e/assets-v1/5cbd9247-daf0-42a6-9fed-3429b39c1f37/luxlife-cutaway.mp4";

interface LayerInfo {
  id: number;
  timeStart: number;
  timeEnd: number;
  name: string;
  badge: string;
  thickness: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: typeof Bed;
  categoryLink: string;
}

const LAYERS: LayerInfo[] = [
  {
    id: 1,
    timeStart: 0.0,
    timeEnd: 2.8,
    name: "01. Knitted Jacquard Top Quilt",
    badge: "Breathable Surface",
    thickness: "1.0 Inch Plush",
    tagline: "Silky soft touch with moisture-wicking anti-allergic yarn",
    description: "Master-stitched high-GSM jacquard fabric designed with deep geometric quilting. Keeps the sleeping surface cool and resistant to dust mites.",
    highlights: ["Ultra-soft breathable weave", "Anti-dust mite & hypoallergenic", "Reinforced perimeter piping"],
    icon: Sparkles,
    categoryLink: "/shop?c=Spring+Mattress",
  },
  {
    id: 2,
    timeStart: 2.8,
    timeEnd: 4.8,
    name: "02. Aurosoft High-Resilience Comfort",
    badge: "Pressure Relief",
    thickness: "High-Density Foam",
    tagline: "Instant contouring relief for shoulders, hips, and lower back",
    description: "Engineered in our Salem factory to eliminate pressure hotspots. Gently contours to body curves without the 'sinking in quicksand' feeling.",
    highlights: ["Zero pressure hotspots", "Orthopedic spinal alignment", "Certified high-resilience bounce"],
    icon: Bed,
    categoryLink: "/shop?c=Aurosoft+Foam",
  },
  {
    id: 3,
    timeStart: 4.8,
    timeEnd: 7.0,
    name: "03. Cool-Blue Airflow Transition Layer",
    badge: "Active Heat Dissipation",
    thickness: "Porous Micro-Cell",
    tagline: "Continuous thermal regulation that prevents heat trapping",
    description: "Open-cell micro-cellular structure with integrated ventilation perforations that draws body heat down and away through cross-directional air channels.",
    highlights: ["40% cooler than regular PU foam", "Micro-ventilation airflow paths", "Progressive weight transition"],
    icon: Wind,
    categoryLink: "/shop?c=Hybrid+Eco",
  },
  {
    id: 4,
    timeStart: 7.0,
    timeEnd: 10.0,
    name: "04. Zero-Disturbance Pocket Spring Core",
    badge: "Motion Isolation",
    thickness: "Tempered Steel Coils",
    tagline: "Individually fabric-encased coils move independently for undisturbed sleep",
    description: "High-tensile carbon steel barrel coils encased in breathable non-woven spun fabric. When your partner turns or shifts, your side remains completely still.",
    highlights: ["100% zero motion transfer", "Reinforced edge encasement", "10-Year anti-sag durability"],
    icon: ShieldCheck,
    categoryLink: "/shop?c=Spring+Mattress",
  },
];

export function AnatomySection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Sync active layer with video playback time
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 10;
    setProgress((current / duration) * 100);

    const matchedIndex = LAYERS.findIndex(
      (layer) => current >= layer.timeStart && current <= layer.timeEnd
    );
    if (matchedIndex !== -1 && matchedIndex !== activeLayerIndex) {
      setActiveLayerIndex(matchedIndex);
    }
  };

  // Jump to specific layer on tab click
  const seekToLayer = (index: number) => {
    const target = LAYERS[index];
    if (!target) return;
    setActiveLayerIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = target.timeStart + 0.1;
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setActiveLayerIndex(0);
  };

  const activeLayer = LAYERS[activeLayerIndex] ?? LAYERS[0]!;
  const IconComponent = activeLayer.icon;

  return (
    <section className="relative bg-ink text-bone py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-y border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ADF831]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ADF831]/30 bg-[#ADF831]/10 text-[#ADF831] text-xs font-semibold tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ADF831] animate-pulse" />
            3D Interactive Cutaway
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            The Anatomy of Deeper Sleep
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Click any layer below or watch the cutaway reveal how Salem craftsmanship, zero-disturbance pocket coils, and high-resilience foam work together.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3D Video Player */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/15 shadow-2xl backdrop-blur-sm group">
              <video
                ref={videoRef}
                src={VIDEO_URL}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full aspect-video object-cover cursor-pointer"
                onClick={togglePlay}
              />

              {/* Live Active Layer Floating Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#ADF831]" />
                <span className="text-xs font-semibold text-white tracking-wide">
                  {activeLayer.badge}
                </span>
                <span className="text-xs text-muted-foreground">|</span>
                <span className="text-xs text-[#ADF831] font-mono">
                  {activeLayer.thickness}
                </span>
              </div>

              {/* Video Overlay Controls */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-300">
                {/* Progress bar */}
                <div
                  className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    if (videoRef.current) {
                      videoRef.current.currentTime = pct * (videoRef.current.duration || 10);
                    }
                  }}
                >
                  <div
                    className="h-full bg-[#ADF831] transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Control buttons */}
                <div className="flex items-center justify-between text-xs text-bone pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button
                      type="button"
                      onClick={restartVideo}
                      className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors"
                      title="Replay"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors flex items-center gap-1.5"
                      title={isMuted ? "Unmute Sound" : "Mute Sound"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#ADF831]" />}
                      <span className="text-[11px] font-medium hidden sm:inline">
                        {isMuted ? "Sound Off" : "Sound On"}
                      </span>
                    </button>
                  </div>

                  <span className="font-mono text-muted-foreground text-[11px]">
                    00:0{Math.min(9, Math.floor((progress / 100) * 10))} / 00:10
                  </span>
                </div>
              </div>
            </div>

            {/* Quick interactive layer scrubber pills */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              {LAYERS.map((layer, idx) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => seekToLayer(idx)}
                  className={`text-left p-2 rounded-lg border transition-all text-xs ${
                    activeLayerIndex === idx
                      ? "bg-[#ADF831]/15 border-[#ADF831] text-white shadow-sm"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-bone"
                  }`}
                >
                  <div className="font-bold truncate text-[11px] sm:text-xs text-white">
                    0{layer.id}
                  </div>
                  <div className="truncate text-[10px] text-muted-foreground hidden sm:block">
                    {layer.badge}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Layer Specs & Detailed Breakdown */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ADF831]/20 border border-[#ADF831]/40 flex items-center justify-center text-[#ADF831]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#ADF831] uppercase tracking-wider block">
                      {activeLayer.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {activeLayer.name}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-bone font-medium mb-3">
                {activeLayer.tagline}
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                {activeLayer.description}
              </p>

              {/* Highlights checklist */}
              <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                {activeLayer.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-2 text-xs sm:text-sm text-bone">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ADF831]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  to={activeLayer.categoryLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#ADF831] hover:bg-[#ADF831]/90 text-ink font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-transform active:scale-95"
                >
                  <span>Explore Models</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/916382654934?text=${encodeURIComponent(
                    `Hello Luxlife, I am looking at your ${activeLayer.name} mattress engineering. Can you guide me on the best model for my bedroom?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-bone transition-colors"
                >
                  Ask Factory
                </a>
              </div>
            </div>

            {/* Factory Trust Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { title: "Salem Factory", desc: "Direct manufacturing" },
                { title: "10-Yr Warranty", desc: "Anti-sag guarantee" },
                { title: "Zero Disturbance", desc: "Pocket coil isolation" },
                { title: "Custom Sizes", desc: "Any width & length" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center"
                >
                  <div className="text-[11px] font-bold text-white truncate">{item.title}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
                                
