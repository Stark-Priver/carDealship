import { MapPin, Phone, ExternalLink, Clock } from "lucide-react";
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
            className={`relative rounded-2xl p-6 shadow-sm border transition-shadow ${
              branch.upcoming
                ? 'bg-gray-50 border-dashed border-gray-300 opacity-80'
                : 'bg-white border-[var(--border-default)] hover:shadow-md'
            }`}
          >
            {/* Upcoming Badge */}
            {branch.upcoming && (
              <div className='absolute -top-3 right-4 flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md'>
                <Clock size={12} />
                Coming Soon
              </div>
            )}

            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
              branch.upcoming ? 'bg-amber-50' : 'bg-blue-50'
            }`}>
              <MapPin size={20} className={branch.upcoming ? 'text-amber-500' : 'text-brand-accent'} />
            </div>
            <h3 className='font-display text-lg font-semibold text-text-brand-primary mb-1'>
              {branch.name}
            </h3>
            <p className='text-text-brand-muted text-sm mb-3'>{branch.address}</p>
            <div className='flex items-center gap-2 text-text-brand-muted text-sm mb-4'>
              <Phone size={14} />
              <span>{branch.phone}</span>
            </div>
            {branch.upcoming ? (
              <span className='inline-flex items-center gap-1 text-amber-600 text-sm font-medium'>
                <Clock size={14} /> Opening Soon
              </span>
            ) : (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1 text-brand-accent text-sm font-medium hover:underline'
              >
                Get Directions <ExternalLink size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BranchesSection;
