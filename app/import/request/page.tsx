import Link from "next/link";

import { submitImportRequest } from "@app/actions";

interface ImportRequestPageProps {
  searchParams: {
    success?: string;
  };
}

export default function ImportRequestPage({ searchParams }: ImportRequestPageProps) {
  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      <div className='max-w-[1000px] mx-auto px-6 sm:px-16 py-12'>
        <Link href='/import' className='text-sm text-text-brand-muted hover:text-brand-accent'>
          Back to import details
        </Link>

        <h1 className='font-display text-4xl font-bold text-text-brand-primary mt-3'>Import Request</h1>
        <p className='text-text-brand-muted mt-2'>
          Submit your request and our staff will quote and process import logistics end to end.
        </p>

        {searchParams.success && (
          <div className='mt-5 rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm'>
            {searchParams.success}
          </div>
        )}

        <form action={submitImportRequest} className='mt-7 space-y-6'>
          <section className='dashboard-card'>
            <h2 className='font-semibold text-lg mb-4'>Your Details</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input name='fullName' required className='form-input' placeholder='Full name' />
              <input name='phone' required className='form-input' placeholder='Phone number' />
              <input name='email' type='email' className='form-input sm:col-span-2' placeholder='Email (optional)' />
            </div>
          </section>

          <section className='dashboard-card'>
            <h2 className='font-semibold text-lg mb-4'>Vehicle Preference</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <select name='country' required className='form-select'>
                <option value=''>Import from</option>
                <option value='Japan'>Japan</option>
                <option value='UAE (Dubai)'>UAE (Dubai)</option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='Thailand'>Thailand</option>
                <option value='South Africa'>South Africa</option>
                <option value='Singapore'>Singapore</option>
              </select>
              <input name='make' required className='form-input' placeholder='Make' />
              <input name='model' required className='form-input' placeholder='Model' />
              <input name='budget' type='number' className='form-input' placeholder='Budget (TZS)' />
              <input name='yearFrom' type='number' className='form-input' placeholder='Year from' />
              <input name='yearTo' type='number' className='form-input' placeholder='Year to' />
              <select name='fuelType' className='form-select'>
                <option value=''>Any fuel</option>
                <option value='Petrol'>Petrol</option>
                <option value='Diesel'>Diesel</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Electric'>Electric</option>
              </select>
              <select name='transmission' className='form-select'>
                <option value=''>Any transmission</option>
                <option value='Automatic'>Automatic</option>
                <option value='Manual'>Manual</option>
              </select>
            </div>
            <textarea
              name='additionalNotes'
              className='form-input min-h-[130px] mt-4'
              placeholder='Special requirements, color preference, trim, options...'
            />
          </section>

          <button type='submit' className='px-8 py-3 rounded-xl bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-colors'>
            Submit Import Request
          </button>
        </form>
      </div>
    </main>
  );
}
