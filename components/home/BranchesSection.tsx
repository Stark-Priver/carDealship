import { MapPin, Phone, ExternalLink } from "lucide-react";
import { mockBranches } from "@lib/mockData";

const BranchesSection = () => {
  return (
    <section className='py-16 px-6 sm:px-16 max-w-[1440px] mx-auto'>
      <div className='text-center mb-12'>
        <h2 className='section-heading'>Our Branches Across Tanzania</h2>
        <p className='section-subheading mt-3'>
          Visit any of our showrooms to explore our inventory in person.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {mockBranches.map((branch) => (
          <div
            key={branch.id}
            className='bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-default)] hover:shadow-md transition-shadow'
          >
            <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4'>
              <MapPin size={20} className='text-brand-accent' />
            </div>
            <h3 className='font-display text-lg font-semibold text-text-brand-primary mb-1'>
              {branch.name}
            </h3>
            <p className='text-text-brand-muted text-sm mb-3'>{branch.address}</p>
            <div className='flex items-center gap-2 text-text-brand-muted text-sm mb-4'>
              <Phone size={14} />
              <span>{branch.phone}</span>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-brand-accent text-sm font-medium hover:underline'
            >
              Get Directions <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BranchesSection;
