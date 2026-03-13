import VehicleCard from "@components/vehicles/VehicleCard";
import { getVehicles } from "@lib/data";

interface VehiclesPageProps {
  searchParams: {
    q?: string;
    make?: string;
    fuel?: string;
    transmission?: string;
    sort?: string;
  };
}

export default async function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const vehicles = await getVehicles();

  const filtered = vehicles
    .filter((v) => {
      if (searchParams.q) {
        const q = searchParams.q.toLowerCase();
        const ok =
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.stockNumber.toLowerCase().includes(q);
        if (!ok) return false;
      }

      if (searchParams.make && v.make !== searchParams.make) return false;
      if (searchParams.fuel && v.fuelType !== searchParams.fuel) return false;
      if (searchParams.transmission && v.transmission !== searchParams.transmission) return false;

      return true;
    })
    .sort((a, b) => {
      if (searchParams.sort === "price-asc") return a.price - b.price;
      if (searchParams.sort === "price-desc") return b.price - a.price;
      return b.year - a.year;
    });

  const makes = [...new Set(vehicles.map((v) => v.make))];

  return (
    <main className='pt-[68px] min-h-screen'>
      <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-8'>
        <h1 className='font-display text-4xl font-bold text-text-brand-primary mb-2'>Browse Vehicles</h1>
        <p className='text-text-brand-muted mb-6'>
          Live inventory powered by Supabase.
        </p>

        <form className='dashboard-card mb-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3'>
          <input
            className='form-input'
            name='q'
            defaultValue={searchParams.q ?? ""}
            placeholder='Search make, model, stock #'
          />
          <select className='form-select' name='make' defaultValue={searchParams.make ?? ""}>
            <option value=''>All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
          <select className='form-select' name='fuel' defaultValue={searchParams.fuel ?? ""}>
            <option value=''>Any Fuel</option>
            <option value='Petrol'>Petrol</option>
            <option value='Diesel'>Diesel</option>
            <option value='Hybrid'>Hybrid</option>
            <option value='Electric'>Electric</option>
          </select>
          <select className='form-select' name='transmission' defaultValue={searchParams.transmission ?? ""}>
            <option value=''>Any Transmission</option>
            <option value='Automatic'>Automatic</option>
            <option value='Manual'>Manual</option>
          </select>
          <div className='flex gap-2'>
            <select className='form-select' name='sort' defaultValue={searchParams.sort ?? "newest"}>
              <option value='newest'>Newest</option>
              <option value='price-asc'>Price: Low to High</option>
              <option value='price-desc'>Price: High to Low</option>
            </select>
            <button type='submit' className='px-4 py-2 rounded-lg bg-brand-accent text-white font-medium'>
              Apply
            </button>
          </div>
        </form>

        <p className='text-sm text-text-brand-muted mb-4'>
          {filtered.length} vehicles found
        </p>

        {filtered.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        ) : (
          <div className='dashboard-card text-text-brand-muted'>No vehicles match your filters.</div>
        )}
      </div>
    </main>
  );
}
