import Link from "next/link";

import { submitSellRequest } from "@app/actions";

interface SellYourCarPageProps {
  searchParams: {
    success?: string;
    error?: string;
  };
}

export default function SellYourCarPage({ searchParams }: SellYourCarPageProps) {
  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      <div className='max-w-[1000px] mx-auto px-6 sm:px-16 py-12'>
        <h1 className='font-display text-4xl font-bold text-text-brand-primary'>Sell Your Car</h1>
        <p className='text-text-brand-muted mt-2'>
          Submit your vehicle details. Staff can then inspect, approve, and manage listing workflow.
        </p>

        {searchParams.success && (
          <div className='mt-6 rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm'>
            {searchParams.success}
          </div>
        )}
        {searchParams.error && (
          <div className='mt-6 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm'>
            {searchParams.error}
          </div>
        )}

        <form action={submitSellRequest} className='mt-8 space-y-6'>
          <section className='dashboard-card'>
            <h2 className='text-lg font-semibold mb-4'>Your Details</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input name='fullName' required className='form-input' placeholder='Full name' />
              <input name='phone' required className='form-input' placeholder='Phone number' />
              <input name='email' type='email' className='form-input' placeholder='Email (optional)' />
              <input name='city' required className='form-input' placeholder='City' />
            </div>
          </section>

          <section className='dashboard-card'>
            <h2 className='text-lg font-semibold mb-4'>Vehicle Details</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input name='make' required className='form-input' placeholder='Make' />
              <input name='model' required className='form-input' placeholder='Model' />
              <input name='year' required type='number' className='form-input' placeholder='Year' />
              <input name='mileage' required type='number' className='form-input' placeholder='Mileage (km)' />
              <select name='transmission' required className='form-select'>
                <option value='Automatic'>Automatic</option>
                <option value='Manual'>Manual</option>
              </select>
              <select name='fuelType' required className='form-select'>
                <option value='Petrol'>Petrol</option>
                <option value='Diesel'>Diesel</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Electric'>Electric</option>
              </select>
              <input name='condition' required className='form-input' placeholder='Condition (e.g. Used - Good)' />
              <input name='askingPrice' required type='number' className='form-input' placeholder='Asking price (TZS)' />
            </div>
            <textarea name='notes' className='form-input min-h-[120px] mt-4' placeholder='Extra notes for the inspection team' />
          </section>

          <section className='dashboard-card'>
            <h2 className='text-lg font-semibold mb-3'>Photos</h2>
            <p className='text-sm text-text-brand-muted mb-3'>Upload up to 10 photos.</p>
            <input name='photos' type='file' multiple accept='image/*' className='form-input' />
          </section>

          <div className='flex flex-col sm:flex-row gap-3'>
            <button type='submit' className='px-8 py-3 rounded-xl bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-colors'>
              Submit Sell Request
            </button>
            <Link href='/auth/login?next=/dashboard/sell-requests' className='px-8 py-3 rounded-xl border border-[var(--border-default)] font-semibold text-center'>
              Login to Track Request
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
