import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

import { footerLinks } from "@constants";

const Footer = () => (
  <footer className='bg-surface-dark text-white'>
    <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {/* Col 1: Logo + Tagline */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Image
              src='/logo.svg'
              alt='Bingwa Magari logo'
              width={30}
              height={30}
              className='object-contain brightness-0 invert'
            />
            <span className='font-display text-xl font-bold text-white'>
              Bingwa Magari
            </span>
          </div>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Tanzania&apos;s most trusted car marketplace. Find verified vehicles, sell
            your car, or book an inspection — all in one place.
          </p>
          <div className='flex gap-3 mt-2'>
            {/* Facebook */}
            <Link
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] hover:scale-110 hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] transition-all duration-300'
              aria-label='Facebook'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor' className='text-gray-400 group-hover:text-white transition-colors'>
                <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
              </svg>
            </Link>

            {/* Instagram */}
            <Link
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:scale-110 hover:shadow-[0_0_20px_rgba(221,42,123,0.4)] transition-all duration-300'
              aria-label='Instagram'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor' className='text-gray-400 group-hover:text-white transition-colors'>
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/>
              </svg>
            </Link>

            {/* TikTok */}
            <Link
              href='https://tiktok.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-black hover:scale-110 hover:shadow-[0_0_20px_rgba(255,0,80,0.4)] transition-all duration-300'
              aria-label='TikTok'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor' className='text-gray-400 group-hover:text-[#FF004F] transition-colors'>
                <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48 6.3 6.3 0 001.88-4.48V8.74a8.26 8.26 0 004.84 1.56V6.85a4.84 4.84 0 01-1.14-.16z'/>
              </svg>
            </Link>

            {/* YouTube */}
            <Link
              href='https://youtube.com/@bingwamagari'
              target='_blank'
              rel='noopener noreferrer'
              className='group w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,0,0,0.4)] transition-all duration-300'
              aria-label='YouTube'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='currentColor' className='text-gray-400 group-hover:text-white transition-colors'>
                <path d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Remaining Cols from footerLinks */}
        {footerLinks.map((section) => (
          <div key={section.title} className='flex flex-col gap-4'>
            <h3 className='text-white font-semibold text-base'>{section.title}</h3>
            <div className='flex flex-col gap-3'>
              {section.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className='text-gray-400 text-sm hover:text-white transition-colors'
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Bar */}
    <div className='border-t border-gray-800'>
      <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
        <p className='text-gray-500 text-sm'>
          &copy; 2026 Bingwa Magari. All rights reserved.
        </p>
        <div className='flex gap-6'>
          <Link href='/' className='text-gray-500 text-sm hover:text-white transition-colors'>
            Privacy & Policy
          </Link>
          <Link href='/' className='text-gray-500 text-sm hover:text-white transition-colors'>
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
