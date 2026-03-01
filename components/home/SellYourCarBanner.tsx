import Link from "next/link";
import Image from "next/image";

const SellYourCarBanner = () => {
  return (
    <section className='bg-brand-primary py-16 px-6 sm:px-16'>
      <div className='max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Text */}
        <div>
          <h2 className='font-display text-3xl md:text-4xl text-white font-bold mb-4'>
            Want to sell your car? We&apos;ll buy it.
          </h2>
          <p className='text-white/70 text-lg mb-8 max-w-lg'>
            Get a professional valuation from our experts. We offer competitive
            prices and a hassle-free selling experience across all our branches.
          </p>
          <Link
            href='/sell-your-car'
            className='inline-block px-8 py-4 rounded-full bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-colors'
          >
            Get a Free Valuation
          </Link>
        </div>

        {/* Image placeholder */}
        <div className='relative h-64 lg:h-80 rounded-2xl overflow-hidden'>
          <Image
            src='/hero.png'
            alt='Sell your car'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </section>
  );
};

export default SellYourCarBanner;
