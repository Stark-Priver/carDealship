"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";

const importCountries = [
  { name: "Japan", flag: "🇯🇵" },
  { name: "UAE (Dubai)", flag: "🇦🇪" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Singapore", flag: "🇸🇬" },
];

export default function ImportRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    make: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    budget: "",
    fuelType: "",
    transmission: "",
    additionalNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition placeholder:text-[var(--text-muted)]";

  return (
    <main className="pt-[68px]">
      {/* Header */}
      <section className="bg-brand-primary">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-16 py-12">
          <Link
            href="/import"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Import
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
            Submit an Import Request
          </h1>
          <p className="text-white/70 mt-3 max-w-xl">
            Fill in the details below and our import team will get back to you
            within 24 hours with available options and pricing.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-[var(--bg-base)]">
        <div className="max-w-3xl mx-auto px-6 sm:px-16">
          {submitted ? (
            <div className="text-center py-16 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-default)]">
              <CheckCircle2
                size={64}
                className="text-status-available mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                Request Submitted Successfully!
              </h3>
              <p className="text-[var(--text-muted)] mb-8 max-w-md mx-auto">
                Our import team will contact you within 24 hours with available
                options and pricing for your vehicle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/import"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-colors"
                >
                  Back to Import
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-brand-accent font-semibold hover:underline"
                >
                  Go to Home <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-[var(--bg-surface)] rounded-2xl p-6 md:p-8 space-y-5 border border-[var(--border-default)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                    <span className="text-brand-accent font-bold text-sm">
                      1
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">
                    Your Details
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+255 7XX XXX XXX"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Car Details */}
              <div className="bg-[var(--bg-surface)] rounded-2xl p-6 md:p-8 space-y-5 border border-[var(--border-default)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
                    <span className="text-brand-accent font-bold text-sm">
                      2
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">
                    Vehicle Details
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Import From <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select Country</option>
                      {importCountries.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Make (Brand) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="make"
                      required
                      value={formData.make}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. Toyota"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="model"
                      required
                      value={formData.model}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. Land Cruiser"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Budget (TZS)
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 50,000,000"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Year From
                    </label>
                    <input
                      type="number"
                      name="yearFrom"
                      value={formData.yearFrom}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 2018"
                      min="2000"
                      max="2026"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Year To
                    </label>
                    <input
                      type="number"
                      name="yearTo"
                      value={formData.yearTo}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 2026"
                      min="2000"
                      max="2026"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Fuel Type
                    </label>
                    <select
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Any</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Transmission
                    </label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Any</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Any specific features, color preferences, interior options, etc."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-brand-accent text-white font-bold text-lg hover:bg-brand-accent-hover transition-colors shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/30"
              >
                Submit Import Request
              </button>

              <p className="text-center text-xs text-[var(--text-muted)]">
                By submitting, you agree to be contacted by our import team. No
                payment is required at this stage.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
