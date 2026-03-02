"use client";

import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";

const KuagizaBanner = () => {
  return (
    <section className="py-16">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-primary via-[#1a3255] to-[#0f2640] p-8 md:p-14">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl" />
          
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Icon */}
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <Globe size={40} className="text-brand-accent" />
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                Import Your Dream Car
              </h2>
              <p className="text-white/70 max-w-xl">
                Source vehicles from Japan, Dubai, UK &amp; more. We handle sourcing, shipping, customs &amp; delivery — all hassle-free.
              </p>
            </div>
            
            {/* CTA */}
            <div className="flex-shrink-0">
              <Link
                href="/import"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-all hover:gap-3"
              >
                Request Import
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Country Flags */}
          <div className="relative flex justify-center md:justify-start md:ml-32 gap-3 mt-6 text-2xl">
            {["🇯🇵", "🇦🇪", "🇬🇧", "🇹🇭", "🇿🇦", "🇸🇬"].map((flag, i) => (
              <span
                key={i}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KuagizaBanner;
