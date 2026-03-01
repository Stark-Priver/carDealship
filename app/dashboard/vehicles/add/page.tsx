"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

const makes = ["Toyota", "Nissan", "Honda", "Suzuki", "Mercedes-Benz", "BMW"];
const branches = ["Dar es Salaam", "Mwanza", "Arusha", "Dodoma"];

export default function AddVehiclePage() {
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div>
      <Link
        href='/dashboard/vehicles'
        className='inline-flex items-center gap-2 text-sm text-text-brand-muted hover:text-brand-accent mb-4'
      >
        <ArrowLeft size={16} />
        Back to Vehicles
      </Link>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Add New Vehicle</h1>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Basic Info */}
        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Basic Information</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='form-group'>
              <label className='form-label'>Make *</label>
              <select className='form-select' required>
                <option value=''>Select Make</option>
                {makes.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Model *</label>
              <input className='form-input' placeholder='e.g. Land Cruiser Prado' required />
            </div>
            <div className='form-group'>
              <label className='form-label'>Year *</label>
              <select className='form-select' required>
                <option value=''>Select Year</option>
                {Array.from({ length: 20 }, (_, i) => 2026 - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Price (TZS) *</label>
              <input type='number' className='form-input' placeholder='e.g. 85000000' required />
            </div>
            <div className='form-group'>
              <label className='form-label'>Mileage (km) *</label>
              <input type='number' className='form-input' placeholder='e.g. 45000' required />
            </div>
            <div className='form-group'>
              <label className='form-label'>Stock Number *</label>
              <input className='form-input' placeholder='e.g. BM-2024-001' required />
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Technical Details</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='form-group'>
              <label className='form-label'>Fuel Type *</label>
              <select className='form-select' required>
                <option value='Petrol'>Petrol</option>
                <option value='Diesel'>Diesel</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Electric'>Electric</option>
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Transmission *</label>
              <select className='form-select' required>
                <option value='Automatic'>Automatic</option>
                <option value='Manual'>Manual</option>
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Body Type</label>
              <select className='form-select'>
                <option value=''>Select Body Type</option>
                {["Sedan", "SUV", "Pickup", "Van", "Hatchback"].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Engine Size</label>
              <input className='form-input' placeholder='e.g. 2.8L Turbo Diesel' />
            </div>
            <div className='form-group'>
              <label className='form-label'>Color</label>
              <input className='form-input' placeholder='e.g. Pearl White' />
            </div>
            <div className='form-group'>
              <label className='form-label'>Import Country</label>
              <input className='form-input' placeholder='e.g. Japan' />
            </div>
          </div>
        </div>

        {/* Branch & Status */}
        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Location & Status</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div className='form-group'>
              <label className='form-label'>Branch *</label>
              <select className='form-select' required>
                <option value=''>Select Branch</option>
                {branches.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className='form-group'>
              <label className='form-label'>Status *</label>
              <select className='form-select' required>
                <option value='AVAILABLE'>Available</option>
                <option value='RESERVED'>Reserved</option>
                <option value='SOLD'>Sold</option>
              </select>
            </div>
            <div className='form-group flex items-center gap-2'>
              <input type='checkbox' id='featured' className='rounded border-gray-300 text-brand-accent focus:ring-brand-accent' />
              <label htmlFor='featured' className='text-sm font-medium'>Mark as Featured</label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='dashboard-card'>
          <h3 className='font-semibold mb-4'>Description</h3>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <div className='form-group'>
              <label className='form-label'>Description (English)</label>
              <textarea className='form-input min-h-[120px] resize-y' placeholder='Vehicle description in English...' />
            </div>
            <div className='form-group'>
              <label className='form-label'>Description (Swahili)</label>
              <textarea className='form-input min-h-[120px] resize-y' placeholder='Maelezo ya gari kwa Kiswahili...' />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className='flex justify-end gap-4'>
          <Link
            href='/dashboard/vehicles'
            className='px-6 py-3 rounded-xl border border-[var(--border-default)] font-medium text-text-brand-secondary hover:bg-surface-muted transition-colors'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={saving}
            className='flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-accent text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50'
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}
