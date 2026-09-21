import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const notices = [
  "Free delivery across Salem — installation included",
  "Premium comfort backed by up to 10-year warranty",
  "Call or WhatsApp 63826 54934 for expert guidance",
];

export function NoticeBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % notices.length), 5000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => setI((v) => (v + d + notices.length) % notices.length);

  return (
    <div className="relative z-[60] bg-volt text-volt-foreground">
      <div className="edge flex h-9 items-center justify-between gap-4">
        <div className="hidden items-center gap-5 md:flex">
          <a href="/" className="label-xs opacity-70 transition-opacity hover:opacity-100">
            Find a Store
          </a>
          <a href="/" className="label-xs opacity-70 transition-opacity hover:opacity-100">
            Help
          </a>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <button
            aria-label="Previous notice"
            onClick={() => go(-1)}
            className="hidden p-1 opacity-60 transition-opacity hover:opacity-100 sm:block"
          >
            <ChevronLeft className="size-3.5" strokeWidth={2} />
          </button>
          <p key={i} className="label-xs anim-rise truncate text-center">
            {notices[i]}
          </p>
          <button
            aria-label="Next notice"
            onClick={() => go(1)}
            className="hidden p-1 opacity-60 transition-opacity hover:opacity-100 sm:block"
          >
            <ChevronRight className="size-3.5" strokeWidth={2} />
          </button>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a href="/" className="label-xs opacity-70 transition-opacity hover:opacity-100">
             Join Luxlife
          </a>
          <a href="/" className="label-xs opacity-70 transition-opacity hover:opacity-100">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
