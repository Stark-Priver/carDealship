"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navLinks } from "@constants";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "SW">("EN");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("bingwa-lang");
    if (saved === "SW" || saved === "EN") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === "EN" ? "SW" : "EN";
    setLang(next);
    localStorage.setItem("bingwa-lang", next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--border-default)]"
          : "bg-white"
      }`}
    >
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center h-full sm:px-16 px-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/logo.svg'
            alt='Bingwa Magari logo'
            width={30}
            height={30}
            className='object-contain'
          />
          <span className='font-display text-xl text-brand-primary font-bold'>
            Bingwa Magari
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative pb-1 ${
                pathname === link.href
                  ? "text-brand-accent border-b-2 border-brand-accent"
                  : "text-text-brand-secondary hover:text-brand-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className='hidden md:flex items-center gap-4'>
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className='flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-muted text-xs font-semibold text-text-brand-secondary hover:bg-gray-200 transition-colors'
            aria-label='Toggle language'
          >
            <span className={lang === "EN" ? "text-brand-accent" : ""}>EN</span>
            <span className='text-gray-300'>|</span>
            <span className={lang === "SW" ? "text-brand-accent" : ""}>SW</span>
          </button>

          {/* CTA */}
          <Link
            href='/sell-your-car'
            className='px-5 py-2.5 rounded-full bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accent-hover transition-colors'
          >
            List Your Car
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className='md:hidden p-2'
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label='Toggle menu'
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className='md:hidden absolute top-[68px] left-0 right-0 bg-white border-b border-[var(--border-default)] shadow-lg'>
          <div className='flex flex-col p-6 gap-4'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`text-base font-medium py-2 ${
                  pathname === link.href
                    ? "text-brand-accent"
                    : "text-text-brand-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className='border-[var(--border-default)]' />
            <div className='flex items-center justify-between'>
              <button
                onClick={toggleLang}
                className='px-3 py-1.5 rounded-full bg-surface-muted text-xs font-semibold'
                aria-label='Toggle language'
              >
                {lang === "EN" ? "SW" : "EN"}
              </button>
              <Link
                href='/sell-your-car'
                onClick={() => setIsMobileOpen(false)}
                className='px-5 py-2.5 rounded-full bg-brand-accent text-white text-sm font-semibold'
              >
                List Your Car
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
