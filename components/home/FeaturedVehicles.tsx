"use client";

import Link from "next/link";
import { mockVehicles } from "@lib/mockData";
import VehicleCard from "../vehicles/VehicleCard";

const FeaturedVehicles = () => {
  const featured = mockVehicles.filter((v) => v.isFeatured || v.status === "AVAILABLE").slice(0, 6);

  return (
    <section className='py-16 px-6 sm:px-16 max-w-[1440px] mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='section-heading'>Featured Vehicles</h2>
        <Link
          href='/vehicles'
          className='text-brand-accent font-semibold text-sm hover:underline'
        >
          View All &rarr;
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
        {featured.map((vehicle) => (
          <VehicleCard key={vehicle.id} {...vehicle} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
