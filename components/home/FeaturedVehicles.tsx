import Link from "next/link";
import { VehicleCardProps } from "@types";
import VehicleCard from "../vehicles/VehicleCard";

interface FeaturedVehiclesProps {
  featured: VehicleCardProps[];
}

const FeaturedVehicles = ({ featured }: FeaturedVehiclesProps) => {

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
        {featured.length > 0 ? featured.map((vehicle) => (
          <VehicleCard key={vehicle.id} {...vehicle} />
        )) : (
          <p className='text-text-brand-muted'>No featured vehicles yet.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
