import Link from "next/link";

import { createVehicle } from "@app/actions";
import { requireAnyRole } from "@lib/auth";
import { getBranches } from "@lib/data";

interface AddVehiclePageProps {
  searchParams: {
    error?: string;
  };
}

export default async function AddVehiclePage({ searchParams }: AddVehiclePageProps) {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const branches = await getBranches();

  return (
    <div>
      <Link href='/dashboard/vehicles' className='text-sm text-text-brand-muted hover:text-brand-accent'>
        Back to Vehicles
      </Link>
      <h1 className='text-2xl font-bold text-text-brand-primary mt-3 mb-6'>Add New Vehicle</h1>

      {searchParams.error && (
        <p className='mb-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm'>{searchParams.error}</p>
      )}

      <form action={createVehicle} className='space-y-6'>
        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Basic Information</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            <input className='form-input' name='make' required placeholder='Make' />
            <input className='form-input' name='model' required placeholder='Model' />
            <input className='form-input' name='year' required type='number' placeholder='Year' />
            <input className='form-input' name='price' required type='number' placeholder='Price (TZS)' />
            <input className='form-input' name='mileage' required type='number' placeholder='Mileage (km)' />
            <input className='form-input' name='stockNumber' required placeholder='Stock Number' />
          </div>
        </div>

        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Technical Details</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            <select className='form-select' name='fuelType' required>
              <option value='Petrol'>Petrol</option>
              <option value='Diesel'>Diesel</option>
              <option value='Hybrid'>Hybrid</option>
              <option value='Electric'>Electric</option>
            </select>
            <select className='form-select' name='transmission' required>
              <option value='Automatic'>Automatic</option>
              <option value='Manual'>Manual</option>
            </select>
            <input className='form-input' name='bodyType' placeholder='Body Type' />
            <input className='form-input' name='engineSize' placeholder='Engine Size' />
            <input className='form-input' name='color' placeholder='Color' />
            <input className='form-input' name='importCountry' placeholder='Import Country' />
          </div>
        </div>

        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Location, Status & Media</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <select className='form-select' name='branchId' required>
              <option value=''>Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>
            <select className='form-select' name='status' required>
              <option value='AVAILABLE'>Available</option>
              <option value='RESERVED'>Reserved</option>
              <option value='SOLD'>Sold</option>
            </select>
            <input name='primaryPhoto' type='file' accept='image/*' className='form-input sm:col-span-2' />
            <label className='flex items-center gap-2 text-sm'>
              <input type='checkbox' name='isFeatured' />
              Mark as Featured
            </label>
          </div>
        </div>

        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Descriptions</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <textarea name='description' className='form-input min-h-[120px]' placeholder='Description (English)' />
            <textarea name='descriptionSw' className='form-input min-h-[120px]' placeholder='Description (Swahili)' />
          </div>
        </div>

        <div className='flex justify-end'>
          <button type='submit' className='px-8 py-3 rounded-xl bg-brand-accent text-white font-semibold'>
            Save Vehicle
          </button>
        </div>
      </form>
    </div>
  );
}
