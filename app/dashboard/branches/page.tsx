"use client";

import { MapPin, Phone, Edit, Plus, Users } from "lucide-react";
import { mockBranches } from "@lib/mockData";

export default function BranchesPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold text-text-brand-primary'>Branches</h1>
        <button className='flex items-center gap-2 bg-brand-accent text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors'>
          <Plus size={18} />
          Add Branch
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {mockBranches.map((branch) => (
          <div key={branch.id} className='dashboard-card'>
            <div className='flex items-start justify-between mb-4'>
              <div className='flex items-start gap-3'>
                <div className='w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center'>
                  <MapPin size={20} className='text-brand-accent' />
                </div>
                <div>
                  <h3 className='font-semibold text-lg text-text-brand-primary'>{branch.name}</h3>
                  <p className='text-sm text-text-brand-muted'>{branch.address}</p>
                </div>
              </div>
              <button className='p-2 rounded-lg hover:bg-surface-muted transition-colors' title='Edit'>
                <Edit size={16} className='text-text-brand-muted' />
              </button>
            </div>

            <div className='grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[var(--border-default)]'>
              <div className='flex items-center gap-2 text-sm'>
                <Phone size={14} className='text-text-brand-muted' />
                <span className='text-text-brand-secondary'>{branch.phone}</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <Users size={14} className='text-text-brand-muted' />
                <span className='text-text-brand-secondary'>{Math.floor(Math.random() * 10) + 5} Staff</span>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-3 mt-4'>
              <div className='bg-surface-muted rounded-lg p-3 text-center'>
                <p className='text-lg font-bold font-mono text-brand-accent'>
                  {Math.floor(Math.random() * 40) + 10}
                </p>
                <p className='text-xs text-text-brand-muted'>Available</p>
              </div>
              <div className='bg-surface-muted rounded-lg p-3 text-center'>
                <p className='text-lg font-bold font-mono text-status-warning'>
                  {Math.floor(Math.random() * 5) + 1}
                </p>
                <p className='text-xs text-text-brand-muted'>Reserved</p>
              </div>
              <div className='bg-surface-muted rounded-lg p-3 text-center'>
                <p className='text-lg font-bold font-mono text-status-success'>
                  {Math.floor(Math.random() * 20) + 5}
                </p>
                <p className='text-xs text-text-brand-muted'>Sold (MTD)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
