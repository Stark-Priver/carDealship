"use client";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className='hero'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
        }}
      />
      {/* Dark Overlay */}
      <div className='hero__overlay' />

      {/* Content */}
      <div className='hero__content'>
        <h1 className='hero__title'>
          Tanzania&apos;s Most Trusted Car Marketplace
        </h1>
        <p className='hero__subtitle'>
          Find verified vehicles, sell your car, or book an inspection — all in
          one place.
        </p>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
          <Link
            href='/vehicles'
            className='px-8 py-4 rounded-full bg-brand-accent text-white text-base font-semibold hover:bg-brand-accent-hover transition-colors'
          >
            Browse Vehicles
          </Link>
          <Link
            href='/sell-your-car'
            className='px-8 py-4 rounded-full border-2 border-white text-white text-base font-semibold hover:bg-white hover:text-brand-primary transition-colors'
          >
            Sell Your Car
          </Link>
        </div>
      </div>

      {/* Floating Stats Bar */}
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
