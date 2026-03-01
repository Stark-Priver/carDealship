import { Shield, MapPin, Users, Trophy, Clock, Heart } from "lucide-react";
import { mockBranches } from "@lib/mockData";

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Every vehicle undergoes a thorough 150-point inspection before listing.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "We build lasting relationships through exceptional service and honest dealings.",
  },
  {
    icon: Trophy,
    title: "Quality Standards",
    description: "Only the finest vehicles that meet our strict quality criteria make it to our showroom.",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "We contribute to Tanzania's economic growth by creating jobs and supporting local communities.",
  },
];

const milestones = [
  { year: "2014", event: "Founded in Dar es Salaam with a single showroom" },
  { year: "2016", event: "Expanded to Mwanza, our second branch" },
  { year: "2018", event: "Launched online presence and WhatsApp sales channel" },
  { year: "2019", event: "Opened Arusha branch to serve Northern Tanzania" },
  { year: "2022", event: "Reached 1,000+ vehicles sold milestone" },
  { year: "2024", event: "Dodoma branch opens, serving Central Tanzania" },
];

export default function AboutPage() {
  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      {/* Hero */}
      <section className='bg-brand-navy text-white py-20'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-16'>
          <h1 className='font-display text-4xl md:text-5xl font-bold mb-4'>About Bingwa Magari</h1>
          <p className='text-lg text-blue-100 max-w-2xl'>
            Tanzania&apos;s most trusted automotive marketplace. For over a decade, 
            we&apos;ve been connecting Tanzanians with quality, inspected vehicles.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className='py-16'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='section-heading text-3xl mb-4'>Our Story</h2>
              <p className='text-text-brand-secondary leading-relaxed mb-4'>
                Bingwa Magari was born from a simple vision: to make buying and selling 
                cars in Tanzania transparent, trustworthy, and hassle-free. Founded in 
                2014 in Dar es Salaam, we started with a small showroom and a big dream.
              </p>
              <p className='text-text-brand-secondary leading-relaxed mb-4'>
                Today, we operate four branches across Tanzania&apos;s major cities, 
                have sold over 1,200 vehicles, and serve more than 4,500 happy customers. 
                Our commitment to quality inspection, fair pricing, and exceptional 
                customer service has made us the name Tanzanians trust when it comes to 
                automotive transactions.
              </p>
              <p className='text-text-brand-secondary leading-relaxed'>
                &ldquo;Bingwa&rdquo; means champion in Swahili, and that&apos;s exactly 
                what we strive to be — champions for our customers in every vehicle 
                transaction.
              </p>
            </div>
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-muted'>
              <div className='absolute inset-0 bg-gradient-to-br from-brand-navy to-brand-accent flex items-center justify-center'>
                <div className='text-center text-white'>
                  <Clock size={48} className='mx-auto mb-4 opacity-50' />
                  <p className='text-5xl font-bold font-mono'>10+</p>
                  <p className='text-lg'>Years in Business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='py-16 bg-surface-muted'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-16'>
          <h2 className='section-heading text-3xl text-center mb-12'>Our Values</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {values.map((item) => (
              <div key={item.title} className='bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-default)]'>
                <div className='w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mb-4'>
                  <item.icon size={24} className='text-brand-accent' />
                </div>
                <h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
                <p className='text-sm text-text-brand-secondary leading-relaxed'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='py-16'>
        <div className='max-w-3xl mx-auto px-6 sm:px-16'>
          <h2 className='section-heading text-3xl text-center mb-12'>Our Journey</h2>
          <div className='space-y-0'>
            {milestones.map((milestone, i) => (
              <div key={milestone.year} className='flex gap-4'>
                <div className='flex flex-col items-center'>
                  <div className='w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center text-xs font-bold flex-shrink-0'>
                    {milestone.year.slice(-2)}
                  </div>
                  {i < milestones.length - 1 && <div className='w-0.5 h-12 bg-brand-accent/20' />}
                </div>
                <div className='pb-8'>
                  <p className='text-sm font-mono text-brand-accent font-semibold'>{milestone.year}</p>
                  <p className='text-text-brand-secondary'>{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches */}
      <section className='py-16 bg-surface-muted'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-16'>
          <h2 className='section-heading text-3xl text-center mb-12'>Our Branches</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {mockBranches.map((branch) => (
              <div key={branch.id} className='bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-default)]'>
                <MapPin size={24} className='text-brand-accent mb-3' />
                <h3 className='font-semibold text-lg mb-1'>{branch.name}</h3>
                <p className='text-sm text-text-brand-muted mb-2'>{branch.address}</p>
                <p className='text-sm text-text-brand-muted'>{branch.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
