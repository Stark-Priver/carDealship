"use client";

import { useState } from "react";
import { Search, Eye, Phone, Check, X } from "lucide-react";
import { mockSellRequests } from "@lib/mockData";
import { formatTZS } from "@utils";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  INSPECTION_ASSIGNED: "bg-blue-100 text-blue-700",
  INSPECTED: "bg-purple-100 text-purple-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function SellRequestsPage() {
  const [search, setSearch] = useState("");

  const filtered = mockSellRequests.filter((req) => {
    const q = search.toLowerCase();
    return (
      !search ||
      req.sellerName.toLowerCase().includes(q) ||
      `${req.make} ${req.model}`.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Sell Requests</h1>

      <div className='relative mb-6'>
        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-text-brand-muted' />
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search sell requests...'
          className='form-input pl-9 max-w-md'
        />
      </div>

      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Asking Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.id}>
                <td>
                  <div>
                    <p className='font-medium'>{req.sellerName}</p>
                    <p className='text-xs text-text-brand-muted'>{req.phone}</p>
                  </div>
                </td>
                <td className='text-text-brand-secondary'>{req.make} {req.model} ({req.year})</td>
                <td className='font-mono text-sm'>{formatTZS(req.askingPrice)}</td>
                <td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                    {req.status}
                  </span>
                </td>
                <td className='text-text-brand-muted text-xs'>{req.date}</td>
                <td>
                  <div className='flex items-center gap-1'>
                    <button className='p-1.5 rounded-lg hover:bg-surface-muted transition-colors' title='View'>
                      <Eye size={16} className='text-text-brand-muted' />
                    </button>
                    <button className='p-1.5 rounded-lg hover:bg-surface-muted transition-colors' title='Call'>
                      <Phone size={16} className='text-brand-accent' />
                    </button>
                    <button className='p-1.5 rounded-lg hover:bg-green-50 transition-colors' title='Accept'>
                      <Check size={16} className='text-status-success' />
                    </button>
                    <button className='p-1.5 rounded-lg hover:bg-red-50 transition-colors' title='Reject'>
                      <X size={16} className='text-status-error' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className='text-center py-12 text-text-brand-muted'>
            No sell requests found.
          </div>
        )}
      </div>
    </div>
  );
}
