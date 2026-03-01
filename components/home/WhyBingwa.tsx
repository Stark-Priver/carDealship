"use client";

import { ShieldCheck, Building2, MessageCircle, Banknote } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Inspections",
    description:
      "Every vehicle undergoes a rigorous multi-point inspection to ensure quality and reliability.",
  },
  {
    icon: Building2,
    title: "Multi-Branch Network",
    description:
      "Visit our showrooms in Dar es Salaam, Mwanza, Arusha, and Dodoma for a hands-on experience.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description:
      "Get instant responses from our team via WhatsApp. We're always just a message away.",
  },
  {
    icon: Banknote,
    title: "Installment Options",
    description:
      "Flexible payment plans available. Use our calculator to find a plan that fits your budget.",
  },
];

const WhyBingwa = () => {
  return (
    <section className='py-16 px-6 sm:px-16 bg-surface-muted'>
      <div className='max-w-[1440px] mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='section-heading'>Why Bingwa Magari?</h2>
          <p className='section-subheading mt-3'>
            Tanzania&apos;s most trusted automotive marketplace — here&apos;s why thousands choose us.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow'
            >
              <div className='w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4'>
                <feature.icon size={24} className='text-brand-accent' />
              </div>
              <h3 className='font-semibold text-text-brand-primary text-base mb-2'>
                {feature.title}
              </h3>
              <p className='text-text-brand-muted text-sm leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBingwa;
