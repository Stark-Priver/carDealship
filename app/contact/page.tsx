import { submitContactMessage } from "@app/actions";
import { getBranches } from "@lib/data";

interface ContactPageProps {
  searchParams: {
    success?: string;
  };
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const branches = await getBranches();

  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      <section className='bg-brand-navy text-white py-16'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-16'>
          <h1 className='font-display text-4xl font-bold'>Contact Us</h1>
          <p className='text-blue-100 mt-3'>Questions about buying, selling, or importing? Reach our team.</p>
        </div>
      </section>

      <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-14 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8'>
        <section className='dashboard-card'>
          {searchParams.success ? (
            <div className='rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm'>
              {searchParams.success}
            </div>
          ) : (
            <>
              <h2 className='text-xl font-semibold mb-5'>Send a Message</h2>
              <form action={submitContactMessage} className='space-y-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <input name='name' required className='form-input' placeholder='Full name' />
                  <input name='email' required type='email' className='form-input' placeholder='Email' />
                </div>
                <input name='phone' className='form-input' placeholder='Phone (optional)' />
                <select name='subject' required className='form-select'>
                  <option value=''>Select subject</option>
                  <option value='general'>General Inquiry</option>
                  <option value='purchase'>Vehicle Purchase</option>
                  <option value='sell'>Selling a Vehicle</option>
                  <option value='import'>Import Request</option>
                </select>
                <textarea name='message' required className='form-input min-h-[150px]' placeholder='How can we help?' />
                <button type='submit' className='w-full bg-brand-accent text-white py-3 rounded-xl font-semibold'>
                  Send Message
                </button>
              </form>
            </>
          )}
        </section>

        <aside className='space-y-5'>
          <div className='dashboard-card'>
            <h3 className='font-semibold mb-3'>Quick Contact</h3>
            <p className='text-sm text-text-brand-secondary'>Phone: +255 711 398 600</p>
            <p className='text-sm text-text-brand-secondary mt-1'>Email: info@bingwamagari.co.tz</p>
          </div>
          <div className='dashboard-card'>
            <h3 className='font-semibold mb-3'>Branches</h3>
            <div className='space-y-3'>
              {branches.map((branch) => (
                <div key={branch.id}>
                  <p className='font-medium text-sm'>{branch.name}</p>
                  <p className='text-xs text-text-brand-muted'>{branch.address}</p>
                  <p className='text-xs text-text-brand-muted'>{branch.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
