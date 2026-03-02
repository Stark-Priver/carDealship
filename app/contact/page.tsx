"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { mockBranches } from "@lib/mockData";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      {/* Hero */}
      <section className='bg-brand-navy text-white py-16'>
        <div className='max-w-[1440px] mx-auto px-6 sm:px-16'>
          <h1 className='font-display text-4xl md:text-5xl font-bold mb-4'>Contact Us</h1>
          <p className='text-lg text-blue-100 max-w-xl'>
            Have a question? We&apos;re here to help. Reach out through any of
            our channels.
          </p>
        </div>
      </section>

      <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12'>
          {/* Contact Form */}
          <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border-default)]'>
            {submitted ? (
              <div className='text-center py-12'>
                <div className='w-16 h-16 rounded-full bg-status-success/10 flex items-center justify-center mx-auto mb-4'>
                  <Send size={28} className='text-status-success' />
                </div>
                <h3 className='text-xl font-semibold mb-2'>Message Sent!</h3>
                <p className='text-text-brand-muted'>
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h2 className='text-xl font-semibold mb-6'>Send us a Message</h2>
                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                    <div className='form-group'>
                      <label className='form-label'>Full Name</label>
                      <input
                        name='name'
                        value={formState.name}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='Your full name'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label className='form-label'>Email</label>
                      <input
                        name='email'
                        type='email'
                        value={formState.email}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='you@example.com'
                        required
                      />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                    <div className='form-group'>
                      <label className='form-label'>Phone</label>
                      <input
                        name='phone'
                        value={formState.phone}
                        onChange={handleChange}
                        className='form-input'
                        placeholder='+255 7XX XXX XXX'
                      />
                    </div>
                    <div className='form-group'>
                      <label className='form-label'>Subject</label>
                      <select
                        name='subject'
                        value={formState.subject}
                        onChange={handleChange}
                        className='form-select'
                        required
                      >
                        <option value=''>Select subject</option>
                        <option value='general'>General Inquiry</option>
                        <option value='purchase'>Vehicle Purchase</option>
                        <option value='sell'>Selling a Vehicle</option>
                        <option value='test-drive'>Test Drive Booking</option>
                        <option value='complaint'>Complaint</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='form-label'>Message</label>
                    <textarea
                      name='message'
                      value={formState.message}
                      onChange={handleChange}
                      className='form-input min-h-[140px] resize-y'
                      placeholder='Tell us how we can help...'
                      required
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full bg-brand-accent text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors'
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className='space-y-6'>
            {/* Quick Contact */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-default)]'>
              <h3 className='font-semibold mb-4'>Quick Contact</h3>
              <div className='space-y-4'>
                <a
                  href='tel:+255711398600'
                  className='flex items-center gap-3 text-sm text-text-brand-secondary hover:text-brand-accent transition-colors'
                >
                  <Phone size={18} className='text-brand-accent' />
                  +255 711 398 600
                </a>
                <a
                  href='mailto:info@bingwamagari.co.tz'
                  className='flex items-center gap-3 text-sm text-text-brand-secondary hover:text-brand-accent transition-colors'
                >
                  <Mail size={18} className='text-brand-accent' />
                  info@bingwamagari.co.tz
                </a>
                <a
                  href='https://wa.me/255711398600'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-sm text-text-brand-secondary hover:text-whatsapp-primary transition-colors'
                >
                  <MessageCircle size={18} className='text-whatsapp-primary' />
                  WhatsApp Us
                </a>
                <a
                  href='https://whatsapp.com/channel/0029VaGSRhdDeOMxgJBw9E3t'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-3 text-sm text-text-brand-secondary hover:text-whatsapp-primary transition-colors'
                >
                  <MessageCircle size={18} className='text-whatsapp-primary' />
                  Join WhatsApp Channel
                </a>
              </div>
            </div>

            {/* Branches */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-default)]'>
              <h3 className='font-semibold mb-4'>Our Branches</h3>
              <div className='space-y-4'>
                {mockBranches.map((branch) => (
                  <div key={branch.id} className='flex items-start gap-3'>
                    <MapPin size={16} className={`mt-0.5 flex-shrink-0 ${branch.upcoming ? 'text-amber-500' : 'text-brand-accent'}`} />
                    <div>
                      <p className='text-sm font-medium flex items-center gap-2'>
                        {branch.name}
                        {branch.upcoming && (
                          <span className='text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full'>
                            COMING SOON
                          </span>
                        )}
                      </p>
                      <p className='text-xs text-text-brand-muted'>{branch.address}</p>
                      <p className='text-xs text-text-brand-muted'>{branch.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className='bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-default)]'>
              <h3 className='font-semibold mb-4'>Business Hours</h3>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-text-brand-muted'>Monday - Friday</span>
                  <span className='font-medium'>8:00 AM - 6:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-text-brand-muted'>Saturday</span>
                  <span className='font-medium'>9:00 AM - 4:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-text-brand-muted'>Sunday</span>
                  <span className='font-medium text-status-error'>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
