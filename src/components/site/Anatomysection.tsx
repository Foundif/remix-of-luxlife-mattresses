import { useEffect, useRef, useState } from "react";
import cutawayVideo from "@/assets/cutaway-hd.mp4.asset.json";
import cutawayPoster from "@/assets/cutaway-poster.jpg.asset.json";

/**
 * Full-width cinematic cutaway film. No controls, no captions, no layer slider.
 * Plays only while it is on screen so it never competes with the hero for decoding.
 */
export function AnatomySection() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) void el.play().catch(() => undefined);
        else el.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Inside a Luxlife mattress" className="relative w-full bg-ink">
      <video
        ref={ref}
        src={cutawayVideo.url}
        poster={cutawayPoster.url}
        muted
        loop
        playsInline
        autoPlay
        disablePictureInPicture
        preload="metadata"
        aria-label="Cutaway animation showing the layers inside a Luxlife mattress"
        className="block h-[52vw] max-h-[720px] min-h-[220px] w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
        data-playing={active}
      />
    </section>
  );
}
