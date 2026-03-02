"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* YouTube Shorts to show in floating phone frames */
const heroReels = [
  { id: "-Gz3ppcR3nA", title: "Bingwa Magari" },
  { id: "9waHgMrpgdU", title: "Customer Delivery" },
  { id: "NnEBc9YrHYU", title: "Vehicle Tour" },
  { id: "-FZwdd2J0Ws", title: "Import Arrival" },
  { id: "w-i9ADVe6Zo", title: "Behind the Scenes" },
];

/* Phone frame component */
const PhoneFrame = ({
  reel,
  className,
  style,
  size = "md",
}: {
  reel: typeof heroReels[0];
  className?: string;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
}) => {
  const [playing, setPlaying] = useState(false);
  const dims = size === "sm" ? "w-[120px]" : size === "lg" ? "w-[180px]" : "w-[150px]";

  return (
    <div className={`${dims} ${className || ""}`} style={style}>
      <div className="bg-[#1a1a1a] rounded-[20px] p-[3px] shadow-2xl shadow-black/50 border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50px] h-[12px] bg-[#1a1a1a] rounded-b-xl z-10 flex items-center justify-center">
          <div className="w-[25px] h-[2px] bg-[#333] rounded-full" />
        </div>
        {/* Screen */}
        <div className="relative rounded-[17px] overflow-hidden bg-black" style={{ aspectRatio: "9/16" }}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${reel.id}?autoplay=1&mute=1&loop=1&playlist=${reel.id}&controls=0&modestbranding=1&rel=0&playsinline=1`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={reel.title}
            />
          ) : (
            <button onClick={() => setPlaying(true)} className="relative w-full h-full group cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${reel.id}/oar2.jpg`}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              {/* Play icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/40 group-hover:scale-110 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-[9px] font-medium truncate">{reel.title}</p>
                <p className="text-white/50 text-[8px]">@bingwamagari</p>
              </div>
            </button>
          )}
        </div>
        {/* Home bar */}
        <div className="flex justify-center py-1">
          <div className="w-[40px] h-[2px] bg-[#444] rounded-full" />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onReady = () => {
      setVideoLoaded(true);
      vid.play().catch(() => {});
    };
    vid.addEventListener("canplaythrough", onReady);
    vid.addEventListener("loadeddata", onReady);
    return () => {
      vid.removeEventListener("canplaythrough", onReady);
      vid.removeEventListener("loadeddata", onReady);
    };
  }, []);

  return (
    <section className='hero'>
      {/* ── Fallback Image (shows while video loads or if video fails) ── */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: videoLoaded ? 0 : 1 }}
      >
        <Image
          src="/hero-bg.png"
          alt='Car showcase'
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* ── Video Background — local files for reliability ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-[1]"
        style={{
          opacity: videoLoaded ? 1 : 0,
          filter: "saturate(1.15)",
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video-2.mp4" type="video/mp4" />
      </video>

      {/* ── Cinematic overlays — kept light so video shows through ── */}
      {/* Top gradient for navbar blend */}
      <div className='absolute inset-0 z-[5] bg-gradient-to-b from-black/40 via-transparent to-transparent' />
      {/* Bottom gradient for content readability */}
      <div className='absolute inset-0 z-[5] bg-gradient-to-t from-black/60 via-black/10 to-transparent' />

      {/* ── Scrolling Slogan Ticker ── */}
      <div className='hero__ticker'>
        <div className='hero__ticker-track'>
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className='hero__ticker-item'>
              Na Laki Nane
              <span className='hero__ticker-dot'>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Floating Phone Frames (behind hero text) ── */}
      <div className="absolute inset-0 z-[11] pointer-events-none hidden lg:block overflow-hidden">
        {/* Left side phones */}
        <div className="pointer-events-auto">
          <PhoneFrame
            reel={heroReels[0]}
            className="absolute"
            style={{ top: "12%", left: "3%", transform: "rotate(-8deg)", opacity: 0.7 }}
            size="md"
          />
          <PhoneFrame
            reel={heroReels[1]}
            className="absolute"
            style={{ top: "38%", left: "8%", transform: "rotate(4deg)", opacity: 0.5 }}
            size="sm"
          />
        </div>
        {/* Right side phones */}
        <div className="pointer-events-auto">
          <PhoneFrame
            reel={heroReels[2]}
            className="absolute"
            style={{ top: "10%", right: "3%", transform: "rotate(6deg)", opacity: 0.7 }}
            size="md"
          />
          <PhoneFrame
            reel={heroReels[3]}
            className="absolute"
            style={{ top: "40%", right: "9%", transform: "rotate(-5deg)", opacity: 0.5 }}
            size="sm"
          />
          <PhoneFrame
            reel={heroReels[4]}
            className="absolute"
            style={{ top: "22%", right: "18%", transform: "rotate(2deg)", opacity: 0.35 }}
            size="sm"
          />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className='hero__content'>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6 shadow-lg">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Bingwa Magari — Open Now
        </div>

        <h1 className='hero__title'>
          Tanzania&apos;s Most Trusted<br className="hidden md:block" /> Car Marketplace
        </h1>
        <p className='hero__subtitle'>
          Find verified vehicles, sell your car, or book an inspection — all in
          one place.
        </p>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
          <Link
            href='/vehicles'
            className='group px-10 py-4 rounded-full bg-brand-accent text-white text-base font-semibold hover:bg-brand-accent-hover transition-all shadow-xl shadow-brand-accent/30 hover:shadow-brand-accent/50 hover:scale-105'
          >
            Browse Vehicles
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href='/sell-your-car'
            className='px-10 py-4 rounded-full border-2 border-white/70 text-white text-base font-semibold hover:bg-white hover:text-brand-primary transition-all backdrop-blur-sm hover:scale-105'
          >
            Sell Your Car
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center gap-6 mt-8 text-white/50 text-sm">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            100% Verified
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Trusted Since 2015
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            4 Branches in Tanzania
          </span>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className='hero__stats-bar'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-4 flex flex-wrap justify-center gap-8 text-white'>
          {[
            { value: "1,200+", label: "Vehicles Sold" },
            { value: "4", label: "Branches" },
            { value: "98%", label: "Verified" },
            { value: "Since 2015", label: "Trusted" },
          ].map((stat) => (
            <div key={stat.label} className='flex items-center gap-2 text-sm'>
              <span className='font-mono font-bold text-lg'>{stat.value}</span>
              <span className='text-white/70'>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
