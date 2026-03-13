import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { placeOrder, submitInquiry } from "@app/actions";
import VehicleStatusBadge from "@components/vehicles/VehicleStatusBadge";
import { getVehicleById, getVehicleImages } from "@lib/data";
import { getAppSession } from "@lib/auth";
import { formatMileage, formatTZS } from "@utils";

interface VehicleDetailPageProps {
  params: { id: string };
  searchParams: { success?: string; error?: string };
}

export default async function VehicleDetailPage({ params, searchParams }: VehicleDetailPageProps) {
  const vehicle = await getVehicleById(params.id);
  if (!vehicle) notFound();

  const session = await getAppSession();
  const images = await getVehicleImages(params.id);
  const cover = vehicle.primary_image || images[0] || "/hero.png";

  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-8'>
        <Link href='/vehicles' className='text-sm text-text-brand-muted hover:text-brand-accent'>
          Back to vehicles
        </Link>

        {searchParams.success && (
          <p className='mt-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm'>{searchParams.success}</p>
        )}
        {searchParams.error && (
          <p className='mt-4 rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm'>{searchParams.error}</p>
        )}

        <div className='mt-5 grid grid-cols-1 lg:grid-cols-[58%_42%] gap-8'>
          <section>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-muted'>
              <Image src={cover} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} fill className='object-cover' />
            </div>
            {images.length > 1 && (
              <div className='grid grid-cols-3 sm:grid-cols-5 gap-3 mt-3'>
                {images.map((src) => (
                  <div key={src} className='relative aspect-video rounded-lg overflow-hidden'>
                    <Image src={src} alt='Vehicle image' fill className='object-cover' />
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className='flex items-center gap-3'>
              <span className='text-xs font-mono px-2 py-1 rounded bg-surface-muted'>#{vehicle.stock_number}</span>
              <VehicleStatusBadge status={vehicle.status} />
            </div>

            <h1 className='font-display text-3xl font-bold mt-3'>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <p className='font-mono text-3xl text-brand-accent font-bold mt-2'>
              {formatTZS(vehicle.price)}
            </p>

            <div className='grid grid-cols-2 gap-3 mt-6 text-sm'>
              <div><span className='text-text-brand-muted'>Mileage:</span> {formatMileage(vehicle.mileage)}</div>
              <div><span className='text-text-brand-muted'>Fuel:</span> {vehicle.fuel_type}</div>
              <div><span className='text-text-brand-muted'>Transmission:</span> {vehicle.transmission}</div>
              <div><span className='text-text-brand-muted'>Body:</span> {vehicle.body_type || "-"}</div>
              <div><span className='text-text-brand-muted'>Branch:</span> {vehicle.branches?.name || "-"}</div>
              <div><span className='text-text-brand-muted'>City:</span> {vehicle.branches?.city || "-"}</div>
            </div>

            {(vehicle.description || vehicle.description_sw) && (
              <div className='mt-6 space-y-2'>
                {vehicle.description && <p className='text-text-brand-secondary'>{vehicle.description}</p>}
                {vehicle.description_sw && <p className='text-text-brand-muted'>{vehicle.description_sw}</p>}
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
              <form action={submitInquiry} className='dashboard-card space-y-3'>
                <h3 className='font-semibold text-text-brand-primary'>Ask About This Vehicle</h3>
                <input type='hidden' name='vehicleId' value={vehicle.id} />
                <input name='customerName' required className='form-input' placeholder='Your full name' />
                <input name='phone' required className='form-input' placeholder='Phone number' />
                <input name='email' type='email' className='form-input' placeholder='Email (optional)' />
                <textarea name='message' className='form-input min-h-[110px]' placeholder='Message (optional)' />
                <button type='submit' className='w-full bg-brand-accent text-white py-2.5 rounded-lg font-medium'>
                  Submit Inquiry
                </button>
              </form>

              <div className='dashboard-card space-y-3'>
                <h3 className='font-semibold text-text-brand-primary'>Place Order</h3>
                <p className='text-sm text-text-brand-muted'>
                  Buyers can place an order and track it from their dashboard.
                </p>
                {session ? (
                  <form action={placeOrder}>
                    <input type='hidden' name='vehicleId' value={vehicle.id} />
                    <input type='hidden' name='totalAmount' value={vehicle.price} />
                    <button type='submit' className='w-full bg-whatsapp-primary text-white py-2.5 rounded-lg font-medium'>
                      Place Order ({formatTZS(vehicle.price)})
                    </button>
                  </form>
                ) : (
                  <Link href='/auth/login?next=/dashboard/orders' className='inline-block w-full text-center border border-[var(--border-default)] py-2.5 rounded-lg font-medium'>
                    Login to Place Order
                  </Link>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
