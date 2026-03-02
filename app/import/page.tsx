"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Globe,
  Ship,
  ShieldCheck,
  Clock,
  FileText,
  Banknote,
  Truck,
  ArrowRight,
} from "lucide-react";

/* ── Carousel slide data ── */
const heroSlides = [
  {
    country: "Japan",
    flag: "🇯🇵",
    tagline: "The Heart of JDM",
    brands: "Toyota • Nissan • Honda • Subaru • Mazda",
    gradient: "from-[#BC002D] via-[#1a1a2e] to-[#0f0f23]",
    accent: "#BC002D",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80",
  },
  {
    country: "UAE (Dubai)",
    flag: "🇦🇪",
    tagline: "Luxury Without Limits",
    brands: "Mercedes • BMW • Lexus • Range Rover • Porsche",
    gradient: "from-[#C8A951] via-[#1a1a2e] to-[#0f0f23]",
    accent: "#C8A951",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    tagline: "Right-Hand Drive Experts",
    brands: "Land Rover • Jaguar • Aston Martin • Mini",
    gradient: "from-[#003078] via-[#1a1a2e] to-[#0f0f23]",
    accent: "#4A90D9",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80",
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    tagline: "Trucks & Adventure",
    brands: "Hilux • Fortuner • Ranger • D-Max • Triton",
    gradient: "from-[#0052B4] via-[#1a1a2e] to-[#A51931]",
    accent: "#0052B4",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&q=80",
  },
  {
    country: "South Africa",
    flag: "🇿🇦",
    tagline: "Regional Powerhouse",
    brands: "Volkswagen • Ford • Toyota • Isuzu",
    gradient: "from-[#007A4D] via-[#1a1a2e] to-[#DE3831]",
    accent: "#007A4D",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    tagline: "Pristine Condition",
    brands: "Honda • Toyota • Audi • BMW • Mercedes",
    gradient: "from-[#EF3340] via-[#1a1a2e] to-[#0f0f23]",
    accent: "#EF3340",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=80",
  },
];

const importCountries = [
  { name: "Japan", flag: "🇯🇵", description: "Toyota, Nissan, Honda, Suzuki & more" },
  { name: "UAE (Dubai)", flag: "🇦🇪", description: "Luxury & American brands" },
  { name: "United Kingdom", flag: "🇬🇧", description: "Right-hand drive vehicles" },
  { name: "Thailand", flag: "🇹🇭", description: "Pickup trucks & SUVs" },
  { name: "South Africa", flag: "🇿🇦", description: "Regional favorites" },
  { name: "Singapore", flag: "🇸🇬", description: "Well-maintained imports" },
];

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Tell Us What You Want",
    description:
      "Share the make, model, year, and specifications of your dream car. Our team searches verified dealers worldwide.",
  },
  {
    step: "02",
    icon: Banknote,
    title: "Get a Transparent Quote",
    description:
      "Receive a full cost breakdown — purchase price, shipping, customs duty, clearance fees, and delivery to your location.",
  },
  {
    step: "03",
    icon: Ship,
    title: "We Handle Everything",
    description:
      "Once you approve, we manage the entire process — sourcing, shipping, port clearing, customs compliance, and paperwork.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Receive Your Car",
    description:
      "Your vehicle arrives at Dar es Salaam port. We handle final clearance and deliver it to your preferred branch or doorstep.",
  },
];

export default function ImportPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <main className="pt-[68px]">
      {/* ===== Hero with Background Carousel ===== */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* ── Background slides ── */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.country}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
            style={{ opacity: currentSlide === index ? 1 : 0 }}
          >
            {/* Background image — real <img> for reliable loading */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={`${slide.country} car`}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Gradient overlay — lighter so cars are visible */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, rgba(15,15,35,0.75) 0%, rgba(15,15,35,0.55) 50%, ${slide.accent}33 100%)`,
              }}
            />
            {/* Bottom vignette for text area only */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Country badge — bottom right */}
            <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex items-center gap-4">
              <span className="text-[80px] md:text-[120px] leading-none drop-shadow-2xl opacity-80">
                {slide.flag}
              </span>
              <div className="hidden md:block text-right">
                <p
                  className="text-3xl font-display font-bold text-white/80"
                  style={{ textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
                >
                  {slide.country}
                </p>
                <p className="text-sm text-white/60 font-mono tracking-wider mt-1"
                  style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
                >
                  {slide.brands}
                </p>
              </div>
            </div>

            {/* Decorative accent glow */}
            <div
              className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25"
              style={{ backgroundColor: slide.accent }}
            />
          </div>
        ))}

        {/* ── Slide tagline strip ── */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-16 pt-6">
            <div className="flex items-center gap-3 overflow-hidden h-8">
              {heroSlides.map((slide, index) => (
                <span
                  key={slide.country}
                  className="text-sm font-mono tracking-widest uppercase transition-all duration-700 whitespace-nowrap"
                  style={{
                    color: currentSlide === index ? slide.accent : "transparent",
                    transform: currentSlide === index ? "translateY(0)" : "translateY(20px)",
                    opacity: currentSlide === index ? 1 : 0,
                    position: currentSlide === index ? "relative" : "absolute",
                  }}
                >
                  {slide.tagline}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero content overlay ── */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-16 py-20 md:py-28 flex items-center min-h-[600px] md:min-h-[700px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
              <Globe size={16} />
              Vehicle Import Service
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight drop-shadow-lg">
              Import Your Dream Car
            </h1>
            <p className="text-xl text-white/80 mt-6 max-w-2xl drop-shadow-md">
              Source your ideal vehicle from Japan, Dubai, UK, and more. We
              handle everything — from finding the car to delivering it to your
              doorstep in Tanzania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                href="/import/request"
                className="px-8 py-4 rounded-full bg-brand-accent text-white text-base font-semibold hover:bg-brand-accent-hover transition-colors text-center shadow-lg shadow-brand-accent/30"
              >
                Request Import
              </Link>
              <a
                href="https://wa.me/255221234567?text=Hello%2C%20I%20would%20like%20to%20import%20a%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#25D366] text-white text-base font-semibold hover:bg-[#128C7E] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.913.913l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.32-2.234l-.44-.37-3.112 1.043 1.043-3.112-.37-.44A9.958 9.958 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Slide indicators ── */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.country}
              onClick={() => setCurrentSlide(index)}
              className="group relative flex items-center"
              aria-label={`Go to ${slide.country}`}
            >
              <span
                className="block h-2 rounded-full transition-all duration-500"
                style={{
                  width: currentSlide === index ? "32px" : "8px",
                  backgroundColor: currentSlide === index ? slide.accent : "rgba(255,255,255,0.3)",
                }}
              />
              {/* Tooltip on hover */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/70 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm">
                {slide.flag} {slide.country}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== Why Import With Us ===== */}
      <section className="py-20 bg-[var(--bg-base)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)]">
              Why Import With Us?
            </h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-2xl mx-auto">
              We make international car importing simple, transparent, and
              completely stress-free.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Dealers",
                desc: "We only source from trusted, verified dealers in every country we operate in.",
              },
              {
                icon: Globe,
                title: "Multiple Countries",
                desc: "Japan, Dubai, UK, Thailand, South Africa, Singapore — and more on request.",
              },
              {
                icon: Ship,
                title: "Full Logistics",
                desc: "Shipping, port clearing, customs clearance, and doorstep delivery — all included.",
              },
              {
                icon: Clock,
                title: "4–8 Weeks Delivery",
                desc: "From order confirmation to your doorstep in just 4 to 8 weeks, depending on origin.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-default)] hover:shadow-lg hover:border-brand-accent/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4 group-hover:bg-brand-accent/20 transition-colors">
                  <item.icon size={24} className="text-brand-accent" />
                </div>
                <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Import Countries ===== */}
      <section className="py-20 bg-[var(--bg-surface)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)]">
              Countries We Import From
            </h2>
            <p className="text-[var(--text-muted)] mt-3 max-w-xl mx-auto">
              Access quality vehicles from the world&apos;s top automotive
              markets.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {importCountries.map((country) => (
              <div
                key={country.name}
                className="flex items-center gap-4 p-5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] hover:border-brand-accent hover:shadow-md transition-all cursor-default group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {country.flag}
                </span>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)]">
                    {country.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {country.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="py-20 bg-[var(--bg-base)]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)]">
              How It Works
            </h2>
            <p className="text-[var(--text-muted)] mt-3">
              Four simple steps from request to delivery.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-brand-accent/30 to-transparent" />
                )}
                <div className="relative bg-[var(--bg-surface)] rounded-2xl p-6 border border-[var(--border-default)] hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
                      <s.icon size={20} className="text-brand-accent" />
                    </div>
                    <span className="text-3xl font-mono font-bold text-brand-accent/20">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-20 bg-[var(--bg-surface)]">
        <div className="max-w-3xl mx-auto px-6 sm:px-16 text-center">
          <div className="bg-gradient-to-br from-brand-primary to-[#0f2640] rounded-3xl p-10 md:p-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Import Your Dream Car?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Fill out our import request form and our team will get back to you
              within 24 hours with available options and transparent pricing.
            </p>
            <Link
              href="/import/request"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-all hover:gap-3 shadow-lg shadow-brand-accent/20"
            >
              Submit Import Request
              <ArrowRight size={20} />
            </Link>
            <p className="text-white/40 text-sm mt-6">
              No payment required — just tell us what you&apos;re looking for.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
