"use client";

import { Plus, Edit, Trash2, Shield, User } from "lucide-react";

const mockStaff = [
  { id: "s1", name: "John Mwangi", role: "Inspector", branch: "Dar es Salaam", email: "john@bingwamagari.co.tz", status: "Active" },
  { id: "s2", name: "Grace Nyambura", role: "Inspector", branch: "Mwanza", email: "grace@bingwamagari.co.tz", status: "Active" },
  { id: "s3", name: "Alex Kimani", role: "Sales Manager", branch: "Arusha", email: "alex@bingwamagari.co.tz", status: "Active" },
  { id: "s4", name: "Fatima Hassan", role: "Sales Agent", branch: "Dar es Salaam", email: "fatima@bingwamagari.co.tz", status: "Active" },
  { id: "s5", name: "Michael Odhiambo", role: "Branch Manager", branch: "Dodoma", email: "michael@bingwamagari.co.tz", status: "Active" },
  { id: "s6", name: "Sarah Kimathi", role: "Admin", branch: "Dar es Salaam", email: "sarah@bingwamagari.co.tz", status: "Inactive" },
];

const roleColors: Record<string, string> = {
  Inspector: "bg-purple-100 text-purple-700",
  "Sales Manager": "bg-blue-100 text-blue-700",
  "Sales Agent": "bg-green-100 text-green-700",
  "Branch Manager": "bg-yellow-100 text-yellow-700",
  Admin: "bg-red-100 text-red-700",
};

export default function StaffPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold text-text-brand-primary'>Staff Management</h1>
        <button className='flex items-center gap-2 bg-brand-accent text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors'>
          <Plus size={18} />
          Add Staff
        </button>
      </div>

      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockStaff.map((person) => (
              <tr key={person.id}>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center'>
                      <User size={14} className='text-brand-accent' />
                    </div>
                    <span className='font-medium'>{person.name}</span>
                  </div>
                </td>
                <td className='text-text-brand-muted text-sm'>{person.email}</td>
                <td>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[person.role] || "bg-gray-100 text-gray-700"}`}>
                    <Shield size={10} />
                    {person.role}
                  </span>
                </td>
                <td className='text-text-brand-muted text-sm'>{person.branch}</td>
                <td>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    person.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {person.status}
                  </span>
                </td>
                <td>
                  <div className='flex items-center gap-1'>
                    <button className='p-1.5 rounded-lg hover:bg-surface-muted transition-colors' title='Edit'>
                      <Edit size={16} className='text-brand-accent' />
                    </button>
                    <button className='p-1.5 rounded-lg hover:bg-red-50 transition-colors' title='Remove'>
                      <Trash2 size={16} className='text-status-error' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
