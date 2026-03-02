"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const reels = [
  {
    id: "-Gz3ppcR3nA",
    title: "Bingwa Magari Showcase",
  },
  {
    id: "9waHgMrpgdU",
    title: "Customer Delivery",
  },
  {
    id: "NnEBc9YrHYU",
    title: "Vehicle Tour",
  },
  {
    id: "-FZwdd2J0Ws",
    title: "Import Arrival",
  },
  {
    id: "w-i9ADVe6Zo",
    title: "Behind the Scenes",
  },
];

const SocialReels = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280;
    el.scrollBy({ left: dir === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-[var(--bg-muted)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* Social media icons */}
              <div className="flex -space-x-1">
                {/* YouTube */}
                <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </span>
                {/* TikTok */}
                <span className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shadow-md border-2 border-[var(--bg-muted)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z"/>
                  </svg>
                </span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
                @bingwamagari
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)]">
              Watch Our Reels
            </h2>
            <p className="text-[var(--text-muted)] mt-2 max-w-lg">
              See our latest deliveries, vehicle tours, and behind-the-scenes content.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border border-[var(--border-default)] flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border border-[var(--border-default)] flex items-center justify-center hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrolling phone frames */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="flex-shrink-0 snap-center"
              style={{ width: "260px" }}
            >
              {/* Phone Frame */}
              <div className="relative bg-[#1a1a1a] rounded-[40px] p-[6px] shadow-2xl shadow-black/30 border border-white/10">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[22px] bg-[#1a1a1a] rounded-b-2xl z-10 flex items-center justify-center">
                  <div className="w-[50px] h-[4px] bg-[#333] rounded-full" />
                </div>

                {/* Screen */}
                <div className="relative rounded-[34px] overflow-hidden bg-black" style={{ aspectRatio: "9/16" }}>
                  {activeIndex === index ? (
                    /* Playing — show YouTube embed */
                    <iframe
                      src={`https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=0&loop=1&playlist=${reel.id}&controls=1&modestbranding=1&rel=0&playsinline=1`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={reel.title}
                    />
                  ) : (
                    /* Thumbnail + play button */
                    <button
                      onClick={() => setActiveIndex(index)}
                      className="relative w-full h-full group cursor-pointer"
                    >
                      {/* YouTube thumbnail */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${reel.id}/oar2.jpg`}
                        alt={reel.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all shadow-lg">
                          <Play size={24} className="text-white ml-1" fill="white" />
                        </div>
                      </div>

                      {/* Reel info at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm font-semibold truncate">
                          {reel.title}
                        </p>
                        <p className="text-white/60 text-xs mt-0.5">
                          @bingwamagari
                        </p>
                      </div>

                      {/* Social interaction icons (right side, like TikTok/Reels) */}
                      <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                          </div>
                          <span className="text-white/60 text-[10px] mt-1">♡</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                          </div>
                          <span className="text-white/60 text-[10px] mt-1">💬</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                          </div>
                          <span className="text-white/60 text-[10px] mt-1">↗</span>
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                {/* Phone home indicator */}
                <div className="flex justify-center py-2">
                  <div className="w-[80px] h-[4px] bg-[#444] rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-full border border-[var(--border-default)] flex items-center justify-center disabled:opacity-30"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-1.5">
            {reels.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] opacity-30"
              />
            ))}
          </div>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-full border border-[var(--border-default)] flex items-center justify-center disabled:opacity-30"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialReels;
