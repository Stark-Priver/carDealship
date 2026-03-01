"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import { mockVehicles } from "@lib/mockData";
import { formatTZS, formatMileage, formatStock } from "@utils";
import VehicleStatusBadge from "@components/vehicles/VehicleStatusBadge";

export default function DashboardVehiclesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = mockVehicles.filter((v) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.stockNumber.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
        <h1 className='text-2xl font-bold text-text-brand-primary'>Vehicles Inventory</h1>
        <Link
          href='/dashboard/vehicles/add'
          className='flex items-center gap-2 bg-brand-accent text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors'
        >
          <Plus size={18} />
          Add Vehicle
        </Link>
      </div>

      {/* Filters Bar */}
      <div className='dashboard-card mb-6'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-text-brand-muted' />
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search vehicles...'
              className='form-input pl-9'
            />
          </div>
          <div className='flex items-center gap-2'>
            <Filter size={16} className='text-text-brand-muted' />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='form-select py-2 w-auto'
            >
              <option value='ALL'>All Status</option>
              <option value='AVAILABLE'>Available</option>
              <option value='RESERVED'>Reserved</option>
              <option value='SOLD'>Sold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Stock #</th>
              <th>Vehicle</th>
              <th>Year</th>
              <th>Price</th>
              <th>Mileage</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id}>
                <td className='font-mono text-xs'>{formatStock(v.stockNumber)}</td>
                <td className='font-medium'>{v.make} {v.model}</td>
                <td>{v.year}</td>
                <td className='font-mono text-sm'>{formatTZS(v.price)}</td>
                <td className='text-sm'>{formatMileage(v.mileage)}</td>
                <td className='text-sm text-text-brand-muted'>{v.branch}</td>
                <td><VehicleStatusBadge status={v.status} /></td>
                <td>
                  <div className='flex items-center gap-2'>
                    <Link href={`/vehicles/${v.id}`} className='p-1.5 rounded-lg hover:bg-surface-muted transition-colors' title='View'>
                      <Eye size={16} className='text-text-brand-muted' />
                    </Link>
                    <button className='p-1.5 rounded-lg hover:bg-surface-muted transition-colors' title='Edit'>
                      <Edit size={16} className='text-brand-accent' />
                    </button>
                    <button className='p-1.5 rounded-lg hover:bg-red-50 transition-colors' title='Delete'>
                      <Trash2 size={16} className='text-status-error' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className='text-center py-12 text-text-brand-muted'>
            No vehicles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
