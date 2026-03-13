import Link from "next/link";

import { signIn, signUp } from "@app/auth/actions";

interface LoginPageProps {
  searchParams: {
    error?: string;
    success?: string;
    next?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const nextPath = searchParams.next ?? "/dashboard";

  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      <div className='max-w-[900px] mx-auto px-6 sm:px-16 py-14'>
        <h1 className='font-display text-4xl font-bold text-text-brand-primary'>
          Account Access
        </h1>
        <p className='text-text-brand-muted mt-2'>
          Sign in to manage listings, orders, and dashboard operations.
        </p>

        {searchParams.error && (
          <div className='mt-6 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm'>
            {searchParams.error}
          </div>
        )}
        {searchParams.success && (
          <div className='mt-6 rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm'>
            {searchParams.success}
          </div>
        )}

        <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <section className='dashboard-card'>
            <h2 className='text-xl font-semibold text-text-brand-primary mb-4'>Sign In</h2>
            <form action={signIn} className='space-y-4'>
              <input type='hidden' name='next' value={nextPath} />
              <div className='form-group'>
                <label className='form-label'>Email</label>
                <input name='email' type='email' required className='form-input' />
              </div>
              <div className='form-group'>
                <label className='form-label'>Password</label>
                <input name='password' type='password' required minLength={6} className='form-input' />
              </div>
              <button type='submit' className='w-full bg-brand-accent text-white py-3 rounded-xl font-semibold hover:bg-brand-accent-hover transition-colors'>
                Sign In
              </button>
            </form>
          </section>

          <section className='dashboard-card'>
            <h2 className='text-xl font-semibold text-text-brand-primary mb-4'>Create Account</h2>
            <form action={signUp} className='space-y-4'>
              <div className='form-group'>
                <label className='form-label'>Full Name</label>
                <input name='fullName' type='text' className='form-input' />
              </div>
              <div className='form-group'>
                <label className='form-label'>Email</label>
                <input name='email' type='email' required className='form-input' />
              </div>
              <div className='form-group'>
                <label className='form-label'>Password</label>
                <input name='password' type='password' required minLength={6} className='form-input' />
              </div>
              <button type='submit' className='w-full border border-[var(--border-default)] py-3 rounded-xl font-semibold text-text-brand-primary hover:bg-surface-muted transition-colors'>
                Create Account
              </button>
            </form>
          </section>
        </div>

        <p className='text-sm text-text-brand-muted mt-6'>
          By continuing, you agree to our terms. Return to <Link href='/' className='text-brand-accent hover:underline'>home</Link>.
        </p>
      </div>
    </main>
  );
}
